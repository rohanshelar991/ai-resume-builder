import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Template9 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages } = resumeData;

  return (
    <div className="p-10 bg-white text-gray-900 font-serif text-sm">
      <header className="mb-6">
        <div className="flex justify-between items-start border-b pb-4" style={{ borderColor: themeColor }}>
          <div>
            <h1 className="text-4xl font-bold">{personalInfo.name || "Your Name"}</h1>
            <p className="text-sm text-gray-600">{personalInfo.title || "Your Title"}</p>
          </div>
          <div className="text-xs text-gray-600 space-y-1 text-right">
            {personalInfo.email && <div className="flex items-center gap-1 justify-end"><Mail size={12} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1 justify-end"><Phone size={12} /> {personalInfo.phone}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-1 justify-end"><Linkedin size={12} /> {personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="flex items-center gap-1 justify-end"><Github size={12} /> {personalInfo.github}</div>}
          </div>
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-lg font-bold mb-2">Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          {workExperience && workExperience[0]?.company && (
            <section>
              <h2 className="text-lg font-bold mb-2">Experience</h2>
              {workExperience.map((work, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
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
                  <div className="flex justify-between">
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
              <div className="space-y-1 text-xs text-gray-700">
                {skills.split(",").map(
                  (skill, i) =>
                    skill.trim() && (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                        {skill.trim()}
                      </div>
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

export default Template9;
