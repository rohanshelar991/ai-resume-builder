import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { aiService } from "../../services/ai";
import { Target, Sparkles } from "lucide-react";

const ATSScore = () => {
  const { resumeData } = useContext(ResumeContext);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runScore = async () => {
    setLoading(true);
    const score = await aiService.atsScore(resumeData);
    setResult(score);
    setLoading(false);
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-background/20 space-y-4 form-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          <Target size={22} className="text-indigo-500" /> ATS Score
        </h3>
        <button
          onClick={runScore}
          className="text-sm bg-indigo-500 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600"
        >
          {loading ? "Scoring..." : "Run"}
        </button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="text-3xl font-bold text-indigo-500">{result.score}%</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {result.suggestions.length > 0 ? (
              result.suggestions.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Sparkles size={14} className="text-indigo-400 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <div className="text-green-500">Strong ATS alignment.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScore;
