import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { Copy, Share2, Link, Check, Mail, Cloud, QrCode } from "lucide-react";

const CloudSaveShare = () => {
  const { resumeData, template, themeColor } = useContext(ResumeContext);
  const [copied, setCopied] = useState(false);
  const [shareOption, setShareOption] = useState("link");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [shared, setShared] = useState(false);
  const [showQR, setShowQR] = useState(false);

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

  // Generate QR code (simulated)
  const generateQRCode = () => {
    setShowQR(true);
  };

  // Generate QR code for resume link
  const generateResumeQRCode = () => {
    // In a real application, this would generate an actual QR code
    // For now, we'll show a placeholder
    return (
      <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg">
        <div className="w-32 h-32 bg-black flex items-center justify-center">
          <div className="text-white text-xs">
            <div className="grid grid-cols-8 gap-0.5">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} w-2 h-2`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Scan to view resume</p>
      </div>
    );
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-background/20 space-y-6 form-card">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Cloud size={24} className="text-blue-500" /> Cloud Save & Share
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShareOption("link")}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
            shareOption === "link" ? "bg-primary/20" : "hover:bg-accent"
          }`}
        >
          <Link size={24} />
          <span className="text-sm">Link</span>
        </button>
        <button
          onClick={() => setShareOption("email")}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
            shareOption === "email" ? "bg-primary/20" : "hover:bg-accent"
          }`}
        >
          <Mail size={24} />
          <span className="text-sm">Email</span>
        </button>
      </div>

      {shareOption === "link" && (
        <div className="space-y-4">
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
          <button
            onClick={generateQRCode}
            className="flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <QrCode size={16} />
            Generate QR Code
          </button>
          {showQR && generateResumeQRCode()}
        </div>
      )}

      {shareOption === "email" && (
        <div className="space-y-4">
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

      <div className="pt-4 border-t border-border/50">
        <h4 className="font-medium flex items-center gap-2 mb-3">
          <Share2 size={18} /> Quick Share
        </h4>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
            LinkedIn
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm">
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloudSaveShare;