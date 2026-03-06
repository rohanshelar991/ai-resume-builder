import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Template7 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages, profilePhoto } = resumeData;

  return (
    <div className="min-h-full bg-white text-gray-800 font-sans text-sm grid grid-cols-12">
      <aside className="col-span-4 p-6" style={{ backgroundColor: `${themeColor}10` }}>
        <div className="flex flex-col items-start gap-4">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover border-2"
              style={{ borderColor: themeColor }}
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{personalInfo.name || "Your Name"}</h1>
            <p className="text-sm font-medium" style={{ color: themeColor }}>
              {personalInfo.title || "Your Title"}
            </p>
          </div>
          <div className="space-y-2 text-xs">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={12} /> {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={12} /> {personalInfo.phone}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={12} /> {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github size={12} /> {personalInfo.github}
              </div>
            )}
          </div>
        </div>

        {skills && (
          <div className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.split(",").map(
                (skill, i) =>
                  skill.trim() && (
                    <span
                      key={i}
                      className="text-xs font-medium rounded-full px-3 py-1"
                      style={{ backgroundColor: `${themeColor}30`, color: themeColor }}
                    >
                      {skill.trim()}
                    </span>
                  ),
              )}
            </div>
          </div>
        )}

        {certifications && certifications[0]?.name && (
          <div className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Certifications</h2>
            <div className="space-y-2 text-xs">
              {certifications.map((cert, i) => (
                <div key={i}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer} {cert.year && `• ${cert.year}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages && languages[0]?.name && (
          <div className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Languages</h2>
            <div className="space-y-1 text-xs">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="col-span-8 p-8 space-y-6">
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: themeColor }}>
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {workExperience && workExperience[0]?.company && (
          <section>
            <h2 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: themeColor }}>
              Work Experience
            </h2>
            {workExperience.map((work, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{work.role || "Role"}</h3>
                  <span className="text-xs text-gray-500">{work.duration}</span>
                </div>
                <p className="text-xs text-gray-600">{work.company}</p>
                <ul className="mt-2 space-y-1 text-xs text-gray-700 list-disc list-inside">
                  {work.description?.split("\n").map((line, idx) => (
                    <li key={idx}>{line.replace(/^\s*-\s*/, "")}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {projects && projects[0]?.name && (
          <section>
            <h2 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: themeColor }}>
              Projects
            </h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-xs" style={{ color: themeColor }}>
                      {proj.link}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">{proj.stack}</p>
                <ul className="mt-2 space-y-1 text-xs text-gray-700 list-disc list-inside">
                  {proj.description?.split("\n").map((line, idx) => (
                    <li key={idx}>{line.replace(/^\s*-\s*/, "")}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education && education[0]?.school && (
          <section>
            <h2 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: themeColor }}>
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold">{edu.school}</h3>
                <p className="text-xs text-gray-600">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Template7;
