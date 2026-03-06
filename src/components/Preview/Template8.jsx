import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Template8 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
      <header className="rounded-2xl p-6 text-white mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}, #ec4899)` }}>
        <h1 className="text-3xl font-bold">{personalInfo.name || "Your Name"}</h1>
        <p className="text-sm opacity-90">{personalInfo.title || "Your Title"}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-xs">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} /> {personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="flex items-center gap-1"><Github size={12} /> {personalInfo.github}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {workExperience && workExperience[0]?.company && (
            <section>
              <h2 className="text-lg font-bold mb-2">Work Experience</h2>
              {workExperience.map((work, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{work.role}</h3>
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
              <h2 className="text-lg font-bold mb-2">Projects</h2>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-gray-500">{proj.link}</span>}
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
        </div>

        <aside className="space-y-5">
          {skills && (
            <section>
              <h2 className="text-lg font-bold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.split(",").map(
                  (skill, i) =>
                    skill.trim() && (
                      <span key={i} className="text-xs font-medium px-2 py-1 rounded-lg" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
                        {skill.trim()}
                      </span>
                    ),
                )}
              </div>
            </section>
          )}

          {education && education[0]?.school && (
            <section>
              <h2 className="text-lg font-bold mb-2">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-xs text-gray-600">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </section>
          )}

          {certifications && certifications[0]?.name && (
            <section>
              <h2 className="text-lg font-bold mb-2">Certifications</h2>
              {certifications.map((cert, i) => (
                <div key={i} className="mb-2 text-xs text-gray-700">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-500">{cert.issuer} {cert.year && `• ${cert.year}`}</p>
                </div>
              ))}
            </section>
          )}

          {languages && languages[0]?.name && (
            <section>
              <h2 className="text-lg font-bold mb-2">Languages</h2>
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-700">
                  <span>{lang.name}</span>
                  <span className="text-gray-500">{lang.level}</span>
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Template8;
