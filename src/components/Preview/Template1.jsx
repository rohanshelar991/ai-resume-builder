import React, { memo } from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const BulletPoints = memo(({ text }) => {
  if (!text) return null;
  
  return text.split("\n").map((line, i) => (
    <li key={i} className="text-sm text-gray-700 list-disc list-inside">
      {line.replace(/^\s*-\s*/, "")}
    </li>
  ));
});

const Template1 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages, profilePhoto } =
    resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
      {/* Header */}
      <header
        className="text-center mb-8 border-b-2 pb-4"
        style={{ borderColor: themeColor }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: themeColor }}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-wider">
              {personalInfo.name || "Your Name"}
            </h1>
            <p className="text-lg font-medium mt-1" style={{ color: themeColor }}>
              {personalInfo.title || "Your Title"}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-3 text-xs">
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1.5 hover:underline"
            >
              <Mail size={12} /> {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.linkedin && (
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <Linkedin size={12} /> {personalInfo.linkedin}
            </a>
          )}
          {personalInfo.github && (
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <Github size={12} /> {personalInfo.github}
            </a>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-x-10">
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700">{personalInfo.summary}</p>
            </section>
          )}
          {/* Work Experience */}
          {workExperience && workExperience[0]?.company && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Work Experience
              </h2>
              {workExperience.map((work, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-md font-semibold">
                      {work.role || "Role"}
                    </h3>
                    <p className="text-xs font-medium text-gray-600">
                      {work.duration || "Duration"}
                    </p>
                  </div>
                  <p className="text-sm font-medium italic mb-1">
                    {work.company || "Company"}
                  </p>
                  <ul className="pl-2">
                    {work.description && <BulletPoints text={work.description} />}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects[0]?.name && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Projects
              </h2>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-md font-semibold">
                      {proj.name || "Project Name"}
                    </h3>
                    {proj.link && (
                      <a
                        href={`https://${proj.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-sm font-medium italic mb-1">
                    {proj.stack || "Tech Stack"}
                  </p>
                  <ul className="pl-2">
                    {proj.description && <BulletPoints text={proj.description} />}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-6">
          {/* Education */}
          {education && education[0]?.school && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <h3 className="text-md font-semibold">
                    {edu.school || "School"}
                  </h3>
                  <p className="text-sm italic">{edu.degree || "Degree"}</p>
                  <p className="text-xs text-gray-600">
                    {edu.year || "Year"} {edu.gpa && `| GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.split(",").map(
                  (skill, i) =>
                    skill.trim() && (
                      <span
                        key={i}
                        className="text-xs font-medium rounded-full px-3 py-1"
                        style={{
                          backgroundColor: `${themeColor}20`,
                          color: themeColor,
                        }}
                      >
                        {skill.trim()}
                      </span>
                    ),
                )}
              </div>
            </section>
          )}

          {certifications && certifications[0]?.name && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="text-xs text-gray-700">
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-gray-600">
                      {cert.issuer} {cert.year && `• ${cert.year}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages && languages[0]?.name && (
            <section>
              <h2
                className="text-xl font-bold border-b-2 pb-1 mb-3"
                style={{ borderColor: themeColor }}
              >
                Languages
              </h2>
              <div className="space-y-1 text-xs text-gray-700">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Template1);
