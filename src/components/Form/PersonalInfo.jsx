import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Sparkles, User, Mail, Phone, Linkedin, Github, AlertCircle } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";

const InputField = ({ label, name, value, onChange, placeholder, icon: Icon, error, fieldType = 'default' }) => {
  const { improveWithAI, loading } = useContext(ResumeContext);
  const inputId = `input-${name}`;

  const handleImprove = async () => {
    const improvedText = await improveWithAI(value, fieldType);
    onChange({ target: { name, value: improvedText } });
  };

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
          aria-describedby={error ? `error-${name}` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
        {error && (
          <div className="absolute inset-y-0 right-24 sm:right-28 flex items-center pr-3">
            <AlertCircle size={16} className="text-red-500" />
          </div>
        )}
        <button
          onClick={handleImprove}
          disabled={loading || !value}
          className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1 text-xs sm:text-sm bg-blue-600/20 text-blue-400 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          aria-label={`Improve ${label} with AI`}
        >
          <Sparkles size={12} className="sm:block hidden" />
          <span className="sm:hidden">AI</span>
          <span className="hidden sm:block">Improve</span>
        </button>
      </div>
      {error && (
        <p 
          id={`error-${name}`} 
          className="text-red-500 text-xs sm:text-sm"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

const PersonalInfo = () => {
  const { resumeData, updateResumeData, errors } = useContext(ResumeContext);
  const { personalInfo } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateResumeData("personalInfo", { ...personalInfo, [name]: value });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <ProfilePhoto />
      <InputField
        label="Full Name"
        name="name"
        value={personalInfo.name}
        onChange={handleChange}
        placeholder="e.g., John Doe"
        icon={User}
        error={errors.name}
        fieldType="name"
      />
      <InputField
        label="Job Title"
        name="title"
        value={personalInfo.title}
        onChange={handleChange}
        placeholder="e.g., Senior Frontend Developer"
        icon={User}
        fieldType="jobTitle"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <InputField
          label="Email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="e.g., john.doe@email.com"
          icon={Mail}
          error={errors.email}
        />
        <InputField
          label="Phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="e.g., +1 234 567 890"
          icon={Phone}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <InputField
          label="LinkedIn Profile"
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          placeholder="e.g., linkedin.com/in/johndoe"
          icon={Linkedin}
          error={errors.linkedin}
        />
        <InputField
          label="GitHub Profile"
          name="github"
          value={personalInfo.github}
          onChange={handleChange}
          placeholder="e.g., github.com/johndoe"
          icon={Github}
          error={errors.github}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;