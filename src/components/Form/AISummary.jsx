import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Sparkles, Lightbulb, FileText } from "lucide-react";

const AISummary = () => {
  const { resumeData, updateResumeData, improveWithAI, loading } = useContext(ResumeContext);
  const { personalInfo } = resumeData;
  const [summary, setSummary] = useState(personalInfo.summary || "");
  const [jobTitle, setJobTitle] = useState("");
  const [years, setYears] = useState("");
  const [skills, setSkills] = useState("");

  const handleGenerateSummary = async () => {
    if (jobTitle || summary || skills) {
      const input = {
        jobTitle: jobTitle || personalInfo.title || "Professional",
        years,
        skills,
      };
      const generatedSummary = await improveWithAI(input, "summary");
      setSummary(generatedSummary);
      updateResumeData("personalInfo", { ...personalInfo, summary: generatedSummary });
    }
  };

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    updateResumeData("personalInfo", { ...personalInfo, summary: newSummary });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="form-label flex items-center gap-2">
          <FileText size={16} />
          Professional Summary
        </label>
        <p className="text-sm text-muted-foreground">
          A brief professional summary that highlights your key qualifications and career goals.
        </p>
        <div className="relative">
          <textarea
            value={summary}
            onChange={handleSummaryChange}
            placeholder="e.g., Experienced software developer with 5+ years in frontend technologies..."
            className="form-input h-32 resize-none pr-28"
          />
          <button
            onClick={handleGenerateSummary}
            disabled={loading || (!jobTitle && !summary)}
            className="absolute top-2 right-2 flex items-center gap-1.5 text-sm bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles size={14} />
            AI Generate
          </button>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-border/50 bg-background/20 space-y-3">
        <h3 className="font-semibold text-base flex items-center gap-2">
          <Lightbulb size={18} className="text-yellow-400" /> AI Summary Generator
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter a job title to generate a tailored professional summary.
        </p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title (e.g., Frontend Developer)"
              className="bg-background/50 border border-input rounded-lg px-4 py-3 text-base w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Years of experience (e.g., 5)"
                className="bg-background/50 border border-input rounded-lg px-4 py-3 text-base w-full"
              />
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Top skills (e.g., React, Node, AWS)"
                className="bg-background/50 border border-input rounded-lg px-4 py-3 text-base w-full"
              />
            </div>
          </div>
          <button
            onClick={handleGenerateSummary}
            disabled={loading || (!jobTitle && !summary)}
            className="flex items-center shrink-0 gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} />
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISummary;
