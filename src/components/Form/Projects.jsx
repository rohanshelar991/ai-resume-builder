import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Plus, Trash2, Code, Layers, Link, FileText, AlertCircle } from "lucide-react";

const Projects = () => {
  const {
    resumeData,
    updateResumeData,
    addEntry,
    removeEntry,
    // AI enhancements handled centrally now
    errors,
  } = useContext(ResumeContext);
  const { projects } = resumeData;

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    updateResumeData("projects", updatedProjects);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="p-4 sm:p-6 rounded-xl border border-border/50 bg-background/20 relative space-y-4 form-card"
          role="group"
          aria-labelledby={`project-heading-${index}`}
        >
          <h3 id={`project-heading-${index}`} className="sr-only">
            Project Entry {index + 1}
          </h3>
          <InputField
            label="Project Name"
            name="name"
            value={project.name}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g., AI Resume Builder"
            icon={Code}
            index={index}
            fieldIndex={0}
          />
          <InputField
            label="Tech Stack"
            name="stack"
            value={project.stack}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g., React, Tailwind CSS, Gemini"
            icon={Layers}
            index={index}
            fieldIndex={1}
          />
          <InputField
            label="Link"
            name="link"
            value={project.link}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g., github.com/user/repo"
            icon={Link}
            error={errors[`projects-${index}-link`]}
            index={index}
            fieldIndex={2}
          />

          <div className="flex flex-col gap-2">
            <label 
              htmlFor={`project-description-${index}`}
              className="form-label flex items-center gap-2 text-sm sm:text-base"
            >
              <FileText size={16} />
              Description
            </label>
            <div className="relative">
              <textarea
                id={`project-description-${index}`}
                name="description"
              value={project.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="- A short description of your project...\n- What problems did it solve?"
              className="form-input h-24 sm:h-32 resize-none pr-24 sm:pr-28 text-sm sm:text-base"
              aria-describedby={errors[`projects-${index}-description`] ? `error-project-description-${index}` : undefined}
              aria-invalid={errors[`projects-${index}-description`] ? 'true' : 'false'}
            />
            </div>
            {errors[`projects-${index}-description`] && (
              <p 
                id={`error-project-description-${index}`} 
                className="text-red-500 text-xs sm:text-sm"
                role="alert"
              >
                {errors[`projects-${index}-description`]}
              </p>
            )}
          </div>

          {projects.length > 1 && (
            <button
              onClick={() => removeEntry("projects", index)}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500/80 text-white p-1 sm:p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              aria-label={`Remove project entry ${index + 1}`}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addEntry("projects")}
        className="flex items-center gap-2 text-base font-medium text-blue-500 hover:text-blue-600 transition-colors pt-2 btn-outline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Add another project entry"
      >
        <Plus size={18} />
        Add Another Project
      </button>
    </div>
  );
};

// Reusable InputField component
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
  const inputId = `project-${index}-${name}`;

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

export default Projects;
