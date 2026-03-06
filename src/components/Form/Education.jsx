import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Plus, Trash2, Sparkles, School, GraduationCap, Calendar, Trophy, AlertCircle } from "lucide-react";

const EducationField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  onImprove,
  icon: Icon,
  error,
  fieldType = 'default',
  index,
  fieldIndex,
}) => {
  const { loading } = useContext(ResumeContext);
  const inputId = `education-${index}-${name}`;

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
        {onImprove && (
          <button
            onClick={() => onImprove(fieldType)}
            disabled={loading || !value}
            className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1 text-xs sm:text-sm bg-blue-600/20 text-blue-400 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            aria-label={`Improve ${label} with AI`}
          >
            <Sparkles size={12} className="sm:block hidden" />
            <span className="sm:hidden">AI</span>
            <span className="hidden sm:block">Improve</span>
          </button>
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

const Education = () => {
  const { resumeData, updateResumeData, addEntry, removeEntry, improveWithAI, errors } =
    useContext(ResumeContext);
  const { education } = resumeData;

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    updateResumeData("education", updatedEducation);
  };

  const handleImprove = async (index, field, fieldType) => {
    const improvedText = await improveWithAI(education[index][field], fieldType);
    const updatedEducation = [...education];
    updatedEducation[index][field] = improvedText;
    updateResumeData("education", updatedEducation);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {education.map((edu, index) => (
        <div
          key={index}
          className="p-4 sm:p-6 rounded-xl border border-border/50 bg-background/20 relative space-y-4 form-card"
          role="group"
          aria-labelledby={`education-heading-${index}`}
        >
          <h3 id={`education-heading-${index}`} className="sr-only">
            Education Entry {index + 1}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <EducationField
              label="School"
              name="school"
              value={edu.school}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Harvard University"
              icon={School}
              onImprove={(type) => handleImprove(index, 'school', 'school')}
              fieldType="school"
              index={index}
              fieldIndex={0}
            />
            <EducationField
              label="Degree"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., B.S. in Computer Science"
              icon={GraduationCap}
              onImprove={(type) => handleImprove(index, 'degree', 'degree')}
              fieldType="degree"
              index={index}
              fieldIndex={1}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <EducationField
              label="Year of Graduation"
              name="year"
              value={edu.year}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., 2024"
              icon={Calendar}
              index={index}
              fieldIndex={2}
            />
            <EducationField
              label="GPA"
              name="gpa"
              value={edu.gpa}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., 3.9/4.0"
              icon={Trophy}
              error={errors[`education-${index}-gpa`]}
              index={index}
              fieldIndex={3}
            />
          </div>
          {education.length > 1 && (
            <button
              onClick={() => removeEntry("education", index)}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500/80 text-white p-1 sm:p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              aria-label={`Remove education entry ${index + 1}`}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addEntry("education")}
        className="flex items-center gap-2 text-base font-medium text-blue-500 hover:text-blue-600 transition-colors pt-2 btn-outline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Add another education entry"
      >
        <Plus size={18} />
        Add Another Education
      </button>
    </div>
  );
};

export default Education;