import React, { useState } from "react";
import { X } from "lucide-react";

const TopBanner = ({ text }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 py-2 px-4 text-center text-sm font-medium text-white">
      <p>{text}</p>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TopBanner;
