import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Trophy, CheckCircle, AlertCircle, Info } from "lucide-react";

const ResumeScore = () => {
  const { resumeData } = useContext(ResumeContext);
  const [showFeedback, setShowFeedback] = useState(false);

  // Calculate resume score based on completeness
  const calculateScore = () => {
    let score = 0;
    const feedback = [];
    
    // Personal Info (20 points)
    if (resumeData.personalInfo.name) score += 5;
    else feedback.push("Add your full name");
    
    if (resumeData.personalInfo.email) score += 5;
    else feedback.push("Add your email address");
    
    if (resumeData.personalInfo.phone) score += 5;
    else feedback.push("Add your phone number");
    
    if (resumeData.personalInfo.title) score += 5;
    else feedback.push("Add your job title");
    
    // Education (20 points)
    if (resumeData.education && resumeData.education.length > 0 && resumeData.education[0].school) {
      score += 10;
      if (resumeData.education[0].degree) score += 5;
      else feedback.push("Add your degree information");
      
      if (resumeData.education[0].year) score += 5;
      else feedback.push("Add your graduation year");
    } else {
      feedback.push("Add your education information");
    }
    
    // Work Experience (30 points)
    if (resumeData.workExperience && resumeData.workExperience.length > 0 && resumeData.workExperience[0].company) {
      score += 15;
      if (resumeData.workExperience[0].role) score += 5;
      else feedback.push("Add your job role");
      
      if (resumeData.workExperience[0].duration) score += 5;
      else feedback.push("Add employment duration");
      
      if (resumeData.workExperience[0].description) score += 5;
      else feedback.push("Add job responsibilities");
    } else {
      feedback.push("Add your work experience");
    }
    
    // Projects (15 points)
    if (resumeData.projects && resumeData.projects.length > 0 && resumeData.projects[0].name) {
      score += 10;
      if (resumeData.projects[0].description) score += 5;
      else feedback.push("Add project descriptions");
    } else {
      feedback.push("Add your projects");
    }
    
    // Skills (15 points)
    if (resumeData.skills && resumeData.skills.length > 10) {
      score += 15;
    } else if (resumeData.skills) {
      score += 10;
      feedback.push("Add more skills to improve your resume");
    } else {
      feedback.push("Add your skills");
    }
    
    return { score: Math.min(100, score), feedback };
  };

  const { score, feedback } = calculateScore();

  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Determine score label
  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-background/20 space-y-4 form-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          <Trophy size={24} className="text-yellow-500" /> Resume Score
        </h3>
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          {showFeedback ? "Hide Feedback" : "Show Feedback"}
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className={`${getScoreColor(score)} stroke-current`}
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * score) / 100}
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-sm text-gray-500">/100</span>
          </div>
        </div>
        <p className={`text-lg font-semibold mt-2 ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </p>
      </div>
      
      {showFeedback && (
        <div className="mt-4">
          <h4 className="font-medium text-base mb-2 flex items-center gap-2">
            <Info size={16} /> Improvement Suggestions
          </h4>
          <ul className="space-y-2">
            {feedback.length > 0 ? (
              feedback.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>Your resume looks great! No major improvements needed.</span>
              </li>
            )}
          </ul>
        </div>
      )}
      
      <div className="pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          This score is based on the completeness of your resume information. 
          Add more details to improve your score and make your resume more attractive to employers.
        </p>
      </div>
    </div>
  );
};

export default ResumeScore;