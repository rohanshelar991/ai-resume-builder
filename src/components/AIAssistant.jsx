import React, { useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { X, Send, UploadCloud, Bot, Sparkles } from "lucide-react";
import { ResumeContext } from "../context/ResumeContext";
import { aiService } from "../services/ai";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi there! How can I help you optimize your resume? You can ask me to shorten text, or use the Job Matcher below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [jd, setJd] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [jdLoading, setJdLoading] = useState(false);
  const { resumeData } = useContext(ResumeContext);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    (async () => {
      const aiResponse = await aiService.chatAssist(resumeData, input);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);
    })();
  };

  const handleJdMatch = () => {
    if (!jd.trim()) return;
    setJdLoading(true);
    // Mock AI analysis based on JD and resume
    setTimeout(() => {
      const resumeSkills = new Set(
        (resumeData.skills || "")
          .toLowerCase()
          .split(/,\s*/)
          .filter(Boolean),
      );
      const requiredSkills = [
        "javascript",
        "react",
        "node.js",
        "typescript",
        "aws",
        "docker",
        "sql",
        "python",
      ];
      const missingKeywords = requiredSkills.filter(
        (skill) => !resumeSkills.has(skill) && jd.toLowerCase().includes(skill),
      );
      const score = Math.max(
        25,
        Math.round(
          ((requiredSkills.length - missingKeywords.length) /
            requiredSkills.length) *
            100,
        ),
      );

      setMatchResult({
        score,
        missingKeywords,
        suggestions: `Your resume is a ${score}% match. To improve, focus on adding these skills found in the job description: ${missingKeywords.join(", ")}. Try adding projects or descriptions that include them.`,
      });
      setJdLoading(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 shadow-2xl flex items-center justify-center text-white transition-transform hover:scale-110 z-40 animate-pulse"
        aria-label="Open AI Assistant"
      >
        <Sparkles size={40} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-32 right-8 w-[90vw] max-w-md h-[70vh] max-h-lg bg-background/70 dark:bg-background/80 glassmorphism rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="p-4 flex justify-between items-center border-b border-border/50 shrink-0">
              <h3 className="font-bold flex items-center gap-2">
                <Bot size={20} /> AI Assistant
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-accent"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 flex-grow overflow-y-auto space-y-4">
              <div className="p-3 rounded-lg border border-border/50 bg-background/30 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <UploadCloud size={16} /> AI Job Description Matcher
                </h4>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste a job description here..."
                  className="w-full text-xs bg-background/50 border border-border rounded-lg p-2 h-24 resize-none"
                />
                <button
                  onClick={handleJdMatch}
                  disabled={jdLoading}
                  className="w-full text-sm bg-blue-600 text-white rounded-lg py-1.5 hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {jdLoading ? (
                    <Sparkles className="animate-spin" size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                  Match & Analyze
                </button>
                {matchResult && (
                  <div className="text-xs space-y-1 pt-2">
                    <p
                      className="font-bold text-base"
                      style={{
                        color:
                          matchResult.score > 75
                            ? "#4ade80"
                            : matchResult.score > 50
                              ? "#facc15"
                              : "#fb7185",
                      }}
                    >
                      Analysis: {matchResult.score}% Match
                    </p>
                    {matchResult.missingKeywords.length > 0 && (
                      <p>
                        <span className="font-semibold">Missing Keywords:</span>{" "}
                        {matchResult.missingKeywords.join(", ")}
                      </p>
                    )}
                    <p>
                      <span className="font-semibold">Suggestion:</span>{" "}
                      {matchResult.suggestions}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex-grow space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm px-3 py-2 rounded-2xl ${msg.from === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-secondary text-secondary-foreground rounded-bl-none"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border/50 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="e.g., Shorten my resume..."
                  className="w-full bg-background/50 border border-border rounded-full px-4 py-2 pr-12 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
