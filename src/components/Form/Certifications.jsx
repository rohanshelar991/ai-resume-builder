import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Plus, Trash2, Award } from "lucide-react";

const Certifications = () => {
  const { resumeData, updateResumeData, addEntry, removeEntry } =
    useContext(ResumeContext);
  const { certifications } = resumeData;

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...certifications];
    updated[index][name] = value;
    updateResumeData("certifications", updated);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="p-4 sm:p-6 rounded-xl border border-border/50 bg-background/20 relative space-y-4 form-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="form-label flex items-center gap-2">
                <Award size={16} /> Certification
              </label>
              <input
                type="text"
                name="name"
                value={cert.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g., AWS Certified Solutions Architect"
                className="form-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label">Issuer</label>
              <input
                type="text"
                name="issuer"
                value={cert.issuer}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g., Amazon"
                className="form-input"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="form-label">Year</label>
            <input
              type="text"
              name="year"
              value={cert.year}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., 2024"
              className="form-input"
            />
          </div>
          {certifications.length > 1 && (
            <button
              onClick={() => removeEntry("certifications", index)}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg"
              aria-label={`Remove certification ${index + 1}`}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addEntry("certifications")}
        className="flex items-center gap-2 text-base font-medium text-blue-500 hover:text-blue-600 transition-colors pt-2 btn-outline text-sm sm:text-base"
      >
        <Plus size={18} />
        Add Certification
      </button>
    </div>
  );
};

export default Certifications;
