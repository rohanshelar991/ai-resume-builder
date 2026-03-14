import React, { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Sparkles, Clipboard, FileText, Wand2 } from "lucide-react";

const enhancerOptions = [
  { value: "summary", label: "Summary / About" },
  { value: "experience", label: "Experience bullet" },
  { value: "projectDescription", label: "Project blurb" },
  { value: "skills", label: "Skills line" },
];

const AISummary = () => {
  const { resumeData, updateResumeData, improveWithAI, loading } = useContext(ResumeContext);
  const { personalInfo } = resumeData;
  const [summary, setSummary] = useState(personalInfo.summary || "");
  const [draft, setDraft] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [mode, setMode] = useState(enhancerOptions[0].value);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSummary(personalInfo.summary || "");
  }, [personalInfo.summary]);

  const handleSummaryChange = (e) => {
    const value = e.target.value;
    setSummary(value);
    updateResumeData("personalInfo", { ...personalInfo, summary: value });
  };

  const handleEnhance = async () => {
    if (!draft.trim()) return;
    const result = await improveWithAI(draft, mode);
    setEnhanced(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!enhanced) return;
    await navigator.clipboard.writeText(enhanced);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText size={16} />
          <h3 className="text-lg font-semibold">Professional Summary</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Keep one clear paragraph that captures your role, top strengths, and impact.
        </p>
        <textarea
          value={summary}
          onChange={handleSummaryChange}
          placeholder="e.g., Full-stack engineer with 6+ years building scalable web apps..."
          className="form-input h-28 resize-none text-sm"
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <FileText size={16} />
        <h3 className="text-lg font-semibold">AI Text Enhancer</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Paste any resume text below, pick what it is, and let AI tighten it up. Use the result wherever you need.
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="form-input sm:w-56 text-sm"
          >
            {enhancerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleEnhance}
            disabled={loading || !draft.trim()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 size={16} />
            Enhance with AI
          </button>
        </div>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste or type any bullet, summary, or skills list..."
          className="form-input h-32 resize-none text-sm"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Enhanced text</span>
            <button
              onClick={handleCopy}
              disabled={!enhanced}
              className="flex items-center gap-1 text-xs sm:text-sm text-blue-500 hover:text-blue-600 disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              <Clipboard size={14} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="relative">
            <textarea
              value={enhanced}
              readOnly
              placeholder="AI output will appear here"
              className="form-input h-32 resize-none bg-background/60 text-sm pr-24"
            />
            {loading && (
              <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="animate-pulse" size={14} />
                Thinking...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummary;
