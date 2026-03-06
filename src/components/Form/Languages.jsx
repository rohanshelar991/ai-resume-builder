import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Plus, Trash2, Languages as LanguagesIcon } from "lucide-react";

const Languages = () => {
  const { resumeData, updateResumeData, addEntry, removeEntry } =
    useContext(ResumeContext);
  const { languages } = resumeData;

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...languages];
    updated[index][name] = value;
    updateResumeData("languages", updated);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {languages.map((lang, index) => (
        <div
          key={index}
          className="p-4 sm:p-6 rounded-xl border border-border/50 bg-background/20 relative space-y-4 form-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="form-label flex items-center gap-2">
                <LanguagesIcon size={16} /> Language
              </label>
              <input
                type="text"
                name="name"
                value={lang.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g., English"
                className="form-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label">Proficiency</label>
              <input
                type="text"
                name="level"
                value={lang.level}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g., Professional"
                className="form-input"
              />
            </div>
          </div>
          {languages.length > 1 && (
            <button
              onClick={() => removeEntry("languages", index)}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg"
              aria-label={`Remove language ${index + 1}`}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addEntry("languages")}
        className="flex items-center gap-2 text-base font-medium text-blue-500 hover:text-blue-600 transition-colors pt-2 btn-outline text-sm sm:text-base"
      >
        <Plus size={18} />
        Add Language
      </button>
    </div>
  );
};

export default Languages;
