import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Sparkles, Wand2, Lightbulb, Wrench, AlertCircle } from "lucide-react";
import { aiService } from "../../services/ai";

const Skills = () => {
  const { resumeData, updateResumeData, improveWithAI, loading } =
    useContext(ResumeContext);
  const { skills } = resumeData;
  const [jobTitle, setJobTitle] = useState("");

  const handleChange = (e) => {
    updateResumeData("skills", e.target.value);
  };

  const handleImprove = async () => {
    const improvedSkills = await improveWithAI(skills, 'skills');
    updateResumeData("skills", improvedSkills);
  };

  const handleSuggestSkills = async () => {
    const suggestedSkills = await aiService.suggestSkills(jobTitle);
    const newSkills = skills
      ? `${skills}, ${suggestedSkills.join(", ")}`
      : suggestedSkills.join(", ");
    updateResumeData("skills", newSkills);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="skills-textarea"
          className="form-label flex items-center gap-2 text-sm sm:text-base"
        >
          <Wrench size={16} />
          Skills
        </label>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter your skills, separated by commas.
        </p>
        <div className="relative">
          <textarea
            id="skills-textarea"
            name="skills"
            value={skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Python, Figma..."
            className="form-input h-32 sm:h-48 resize-none pr-24 sm:pr-28 text-sm sm:text-base"
            aria-describedby="skills-help"
          />
          <button
            onClick={handleImprove}
            disabled={loading || !skills}
            className="absolute top-2 right-2 flex items-center gap-1 text-xs sm:text-sm bg-blue-600/20 text-blue-400 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            aria-label="Improve skills with AI"
          >
            <Sparkles size={12} className="sm:block hidden" />
            <span className="sm:hidden">AI</span>
            <span className="hidden sm:block">Improve</span>
          </button>
        </div>
        <p id="skills-help" className="text-xs text-muted-foreground">
          Separate multiple skills with commas
        </p>
      </div>

      <div className="p-4 sm:p-6 rounded-xl border border-border/50 bg-background/20 space-y-4 form-card">
        <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
          <Lightbulb size={16} className="text-yellow-400" /> AI Skill
          Recommender
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter a job title to get AI-powered skill suggestions.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Backend Developer"
            className="form-input flex-grow text-sm sm:text-base"
            aria-label="Enter job title for skill suggestions"
          />
          <button
            onClick={handleSuggestSkills}
            disabled={loading || !jobTitle}
            className="flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-3 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Get AI skill suggestions"
          >
            <Wand2 size={16} />
            <span>Suggest</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
