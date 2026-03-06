import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { Copy, Share2, Link, Check, Mail, MessageSquare, Users } from "lucide-react";

const ShareResume = () => {
  const { resumeData, template, themeColor } = useContext(ResumeContext);
  const [copied, setCopied] = useState(false);
  const [shareOption, setShareOption] = useState("link");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [shared, setShared] = useState(false);

  // In a real application, this would generate a unique URL
  // For now, we'll simulate it
  const shareableLink = `https://airesume.example.com/view/${Math.random().toString(36).substr(2, 9)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // In a real application, this would send the resume to the specified email
    // For now, we'll just simulate it
    console.log("Sharing resume via", shareOption);
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div className="fixed bottom-24 right-8 w-[90vw] max-w-md bg-background/70 dark:bg-background/80 glassmorphism rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
      <div className="p-4 flex justify-between items-center border-b border-border/50 shrink-0">
        <h3 className="font-bold flex items-center gap-2">
          <Share2 size={20} /> Share Resume
        </h3>
      </div>

      <div className="p-4 flex-grow overflow-y-auto space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setShareOption("link")}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
              shareOption === "link" ? "bg-primary/20" : "hover:bg-accent"
            }`}
          >
            <Link size={20} />
            <span className="text-xs">Link</span>
          </button>
          <button
            onClick={() => setShareOption("email")}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
              shareOption === "email" ? "bg-primary/20" : "hover:bg-accent"
            }`}
          >
            <Mail size={20} />
            <span className="text-xs">Email</span>
          </button>
          <button
            onClick={() => setShareOption("message")}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
              shareOption === "message" ? "bg-primary/20" : "hover:bg-accent"
            }`}
          >
            <MessageSquare size={20} />
            <span className="text-xs">Message</span>
          </button>
        </div>

        {shareOption === "link" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share this link with recruiters or friends
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="flex-grow form-input text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {shareOption === "email" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Send your resume directly to an email address
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recipient@email.com"
              className="w-full form-input text-sm"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message (optional)"
              className="w-full form-input h-24 text-sm resize-none"
            />
            <button
              onClick={handleShare}
              disabled={!email || shared}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {shared ? <Check size={16} /> : <Mail size={16} />}
              {shared ? "Sent!" : "Send Resume"}
            </button>
          </div>
        )}

        {shareOption === "message" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share your resume via messaging apps
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="flex-grow form-input text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                <MessageSquare size={16} />
                WhatsApp
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                <MessageSquare size={16} />
                Telegram
              </button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border/50">
          <h4 className="font-medium flex items-center gap-2 mb-3">
            <Users size={18} /> Collaborate
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Invite others to review and edit your resume
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="colleague@email.com"
              className="flex-grow form-input text-sm"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareResume;