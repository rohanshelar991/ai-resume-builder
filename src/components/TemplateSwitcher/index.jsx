import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import ColorSwitcher from "./ColorSwitcher";

const templates = [
  { id: "template1", name: "Classic" },
  { id: "template2", name: "Modern" },
  { id: "template3", name: "Creative" },
  { id: "template4", name: "Minimalist" },
  { id: "template5", name: "Professional" },
  { id: "template6", name: "Contemporary" },
  { id: "template7", name: "Tech" },
  { id: "template8", name: "Corporate" },
  { id: "template9", name: "Editorial" },
  { id: "template10", name: "Accent" },
];

const TemplateSwitcher = () => {
  const { template, setTemplate } = useContext(ResumeContext);

  return (
    <div className="glassmorphism rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-muted-foreground">Template:</p>
        <div className="flex items-center gap-2 rounded-lg bg-background/50 p-1 flex-wrap">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${template === t.id ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent"}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <ColorSwitcher />
    </div>
  );
};

export default TemplateSwitcher;
