import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Template10 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages } = resumeData;

  return (
    <div className="bg-white text-gray-800 font-sans text-sm">
      <div className="h-3" style={{ backgroundColor: themeColor }} />
      <div className="p-8">
        <header className="flex flex-col md:flex-row justify-between gap-6 border-b pb-4 mb-6" style={{ borderColor: `${themeColor}40` }}>
          <div>
            <h1 className="text-3xl font-bold">{personalInfo.name || "Your Name"}</h1>
            <p className="text-sm text-gray-600">{personalInfo.title || "Your Title"}</p>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {personalInfo.phone}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={12} /> {personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="flex items-center gap-2"><Github size={12} /> {personalInfo.github}</div>}
          </div>
        </header>

        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Summary</h2>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {workExperience && workExperience[0]?.company && (
              <section>
                <h2 className="text-lg font-bold mb-2">Experience</h2>
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

          <aside className="space-y-6">
            {skills && (
              <section>
                <h2 className="text-lg font-bold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.split(",").map(
                    (skill, i) =>
                      skill.trim() && (
                        <span key={i} className="text-xs font-medium rounded-full px-3 py-1" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
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
    </div>
  );
};

export default Template10;
