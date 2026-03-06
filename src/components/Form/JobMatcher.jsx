import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { aiService } from "../../services/ai";
import { Bot, Sparkles } from "lucide-react";

const JobMatcher = () => {
  const { resumeData } = useContext(ResumeContext);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    const match = await aiService.jobMatch(resumeData, jd);
    setResult(match);
    setLoading(false);
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-background/20 space-y-4 form-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          <Bot size={20} className="text-blue-500" /> JD Matcher
        </h3>
        <button
          onClick={handleMatch}
          className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste a job description to see match score..."
        className="w-full text-xs bg-background/50 border border-border rounded-lg p-3 h-28 resize-none"
      />
      {result && (
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="text-lg font-bold text-blue-500">Match Score: {result.score}%</div>
          {result.missing.length > 0 ? (
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-blue-400 mt-0.5" />
              <span>Missing Skills: {result.missing.join(", ")}</span>
            </div>
          ) : (
            <div className="text-green-500">Great match. No key gaps found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;
