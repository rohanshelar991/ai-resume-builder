import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Plus, Trash2, Building, User, Calendar, FileText, AlertCircle } from "lucide-react";

const WorkExperience = () => {
  const {
    resumeData,
    updateResumeData,
    addEntry,
    removeEntry,
    // AI enhancements handled centrally now
    errors,
  } = useContext(ResumeContext);
  const { workExperience } = resumeData;

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWork = [...workExperience];
    updatedWork[index][name] = value;
    updateResumeData("workExperience", updatedWork);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {workExperience.map((work, index) => (
        <div
          key={index}
          className="p-4 sm:p-6 rounded-xl border border-border/50 bg-background/20 relative space-y-4 form-card"
          role="group"
          aria-labelledby={`work-heading-${index}`}
        >
          <h3 id={`work-heading-${index}`} className="sr-only">
            Work Experience Entry {index + 1}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <InputField
              label="Company"
              name="company"
              value={work.company}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Google"
              icon={Building}
              error={errors[`workExperience-${index}-company`]}
              fieldType="company"
              index={index}
              fieldIndex={0}
            />
            <InputField
              label="Role"
              name="role"
              value={work.role}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Software Engineer"
              icon={User}
              error={errors[`workExperience-${index}-role`]}
              fieldType="role"
              index={index}
              fieldIndex={1}
            />
          </div>
          <InputField
            label="Duration"
            name="duration"
            value={work.duration}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g., Jan 2022 - Present"
            icon={Calendar}
            index={index}
            fieldIndex={2}
          />

          <div className="flex flex-col gap-2">
            <label 
              htmlFor={`work-description-${index}`}
              className="form-label flex items-center gap-2 text-sm sm:text-base"
            >
              <FileText size={16} />
              Description
            </label>
            <div className="relative">
              <textarea
                id={`work-description-${index}`}
                name="description"
              value={work.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="- Bullet point 1...\n- Bullet point 2..."
              className="form-input h-24 sm:h-36 resize-none pr-24 sm:pr-28 text-sm sm:text-base"
              aria-describedby={errors[`workExperience-${index}-description`] ? `error-work-description-${index}` : undefined}
              aria-invalid={errors[`workExperience-${index}-description`] ? 'true' : 'false'}
            />
            </div>
            {errors[`workExperience-${index}-description`] && (
              <p 
                id={`error-work-description-${index}`} 
                className="text-red-500 text-xs sm:text-sm"
                role="alert"
              >
                {errors[`workExperience-${index}-description`]}
              </p>
            )}
          </div>

          {workExperience.length > 1 && (
            <button
              onClick={() => removeEntry("workExperience", index)}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500/80 text-white p-1 sm:p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              aria-label={`Remove work experience entry ${index + 1}`}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addEntry("workExperience")}
        className="flex items-center gap-2 text-base font-medium text-blue-500 hover:text-blue-600 transition-colors pt-2 btn-outline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Add another work experience entry"
      >
        <Plus size={18} />
        Add Another Experience
      </button>
    </div>
  );
};

// Reusable InputField component for this form
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  index,
  fieldIndex,
}) => {
  const inputId = `work-${index}-${name}`;

  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={inputId}
        className="form-label flex items-center gap-2 text-sm sm:text-base"
      >
        {Icon && <Icon size={16} />}
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input pr-24 sm:pr-28 text-sm sm:text-base ${error ? 'border-red-500' : ''}`}
          aria-describedby={error ? `error-${inputId}` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
        {error && (
          <div className="absolute inset-y-0 right-24 sm:right-28 flex items-center pr-3">
            <AlertCircle size={16} className="text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p 
          id={`error-${inputId}`} 
          className="text-red-500 text-xs sm:text-sm"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default WorkExperience;
