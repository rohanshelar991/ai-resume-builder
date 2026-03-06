import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Check, AlertTriangle, FileText } from "lucide-react";

const GrammarChecker = () => {
  const { resumeData } = useContext(ResumeContext);
  const [issues, setIssues] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // Simple grammar and keyword checker
  const checkGrammarAndKeywords = () => {
    const allIssues = [];
    
    // Check work experience descriptions
    resumeData.workExperience.forEach((exp, index) => {
      if (exp.description) {
        const lines = exp.description.split('\n');
        lines.forEach((line, lineIndex) => {
          const cleanLine = line.replace(/^[\s-]*\s*/, '');
          if (cleanLine) {
            // Check for passive voice (simplified)
            if (/\b(am|is|are|was|were|being|been|be)\b.*\bby\b/i.test(cleanLine)) {
              allIssues.push({
                section: `Work Experience ${index + 1}`,
                text: cleanLine,
                issue: "Passive voice detected",
                suggestion: "Use active voice for stronger impact"
              });
            }
            
            // Check for weak action verbs
            if (/^(helped|assisted|worked on|was responsible for)/i.test(cleanLine)) {
              allIssues.push({
                section: `Work Experience ${index + 1}`,
                text: cleanLine,
                issue: "Weak action verb",
                suggestion: "Use stronger action verbs like 'led', 'developed', 'implemented'"
              });
            }
            
            // Check for missing metrics
            if (!/\d+%|\d+ users|\$\d+|\d+ projects/i.test(cleanLine) && 
                !/increased|decreased|improved|reduced|grew|achieved/i.test(cleanLine)) {
              allIssues.push({
                section: `Work Experience ${index + 1}`,
                text: cleanLine,
                issue: "Missing quantifiable results",
                suggestion: "Include metrics to show impact (e.g., 'Increased efficiency by 30%')"
              });
            }
          }
        });
      }
    });
    
    // Check project descriptions
    resumeData.projects.forEach((project, index) => {
      if (project.description) {
        const lines = project.description.split('\n');
        lines.forEach((line, lineIndex) => {
          const cleanLine = line.replace(/^[\s-]*\s*/, '');
          if (cleanLine) {
            // Check for missing impact statements
            if (!/built|developed|created|implemented|designed/i.test(cleanLine)) {
              allIssues.push({
                section: `Project ${index + 1}`,
                text: cleanLine,
                issue: "Missing action verbs",
                suggestion: "Start with strong action verbs to describe your contributions"
              });
            }
          }
        });
      }
    });
    
    // Check for ATS keywords based on job title
    const jobTitle = resumeData.personalInfo.title.toLowerCase();
    const atsKeywords = {
      "developer": ["javascript", "html", "css", "react", "node", "api", "git", "sql"],
      "designer": ["ui", "ux", "figma", "adobe", "prototype", "wireframe", "user research"],
      "manager": ["leadership", "team", "budget", "strategy", "planning", "kpi"],
      "analyst": ["data", "analysis", "report", "excel", "visualization", "insights"]
    };
    
    let relevantKeywords = [];
    for (const [title, keywords] of Object.entries(atsKeywords)) {
      if (jobTitle.includes(title)) {
        relevantKeywords = keywords;
        break;
      }
    }
    
    if (relevantKeywords.length > 0) {
      const resumeText = JSON.stringify(resumeData).toLowerCase();
      const missingKeywords = relevantKeywords.filter(keyword => 
        !resumeText.includes(keyword)
      );
      
      if (missingKeywords.length > 0) {
        allIssues.push({
          section: "ATS Optimization",
          text: `Missing keywords: ${missingKeywords.join(', ')}`,
          issue: "Limited ATS keywords",
          suggestion: `Include these relevant keywords: ${missingKeywords.join(', ')}`
        });
      }
    }
    
    setIssues(allIssues);
    setIsChecked(true);
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-background/20 space-y-4 form-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          <FileText size={24} className="text-blue-500" /> Grammar & ATS Checker
        </h3>
        <button
          onClick={checkGrammarAndKeywords}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          Check Resume
        </button>
      </div>
      
      {isChecked && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Check className={`w-5 h-5 ${issues.length === 0 ? 'text-green-500' : 'text-yellow-500'}`} />
            <span className="font-medium">
              {issues.length === 0 
                ? "No issues found! Your resume looks great." 
                : `Found ${issues.length} potential improvements`}
            </span>
          </div>
          
          {issues.length > 0 && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {issues.map((issue, index) => (
                <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{issue.section}</p>
                      <p className="text-sm text-muted-foreground mt-1">"{issue.text}"</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-yellow-600">{issue.issue}</p>
                        <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          This tool checks for grammar issues, weak action verbs, missing metrics, 
          and ATS-friendly keywords. Make these improvements to increase your 
          chances of passing automated resume screening systems.
        </p>
      </div>
    </div>
  );
};

export default GrammarChecker;