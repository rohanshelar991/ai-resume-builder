import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Template2 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages, profilePhoto } = resumeData;

  const renderBulletPoints = (text) => {
    return text.split('\n').map((line, i) => (
      <li key={i} className="text-sm text-gray-600 list-disc list-inside">{line.replace(/^\s*-\s*/, '')}</li>
    ));
  };

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
      {/* Header */}
      <header className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4"
              style={{ borderColor: themeColor }}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name || 'Your Name'}</h1>
            <p className="text-lg font-medium mt-1" style={{ color: themeColor }}>{personalInfo.title || 'Your Title'}</p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-gray-600">
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-black"><Mail size={12} /> {personalInfo.email}</a>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-black"><Linkedin size={12} /> LinkedIn</a>}
          {personalInfo.github && <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-black"><Github size={12} /> GitHub</a>}
        </div>
      </header>

      <div className="space-y-8">
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}
        {/* Work Experience */}
        {workExperience && workExperience[0]?.company && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>Work Experience</h2>
            {workExperience.map((work, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold">{work.role || 'Role'}</h3>
                  <p className="text-xs font-medium text-gray-500">{work.duration || 'Duration'}</p>
                </div>
                <p className="text-sm font-medium italic text-gray-700 mb-1">{work.company || 'Company'}</p>
                <ul className="pl-2">
                  {work.description && renderBulletPoints(work.description)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects && projects[0]?.name && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold">{proj.name || 'Project Name'}</h3>
                  {proj.link && <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:underline" style={{ color: themeColor }}>View Project</a>}
                </div>
                <p className="text-sm font-medium italic text-gray-700 mb-1">{proj.stack || 'Tech Stack'}</p>
                <ul className="pl-2">
                  {proj.description && renderBulletPoints(proj.description)}
                </ul>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education && education[0]?.school && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <h3 className="text-md font-semibold">{edu.school || 'School'}</h3>
                  <p className="text-sm italic text-gray-700">{edu.degree || 'Degree'}</p>
                  <p className="text-xs text-gray-500">{edu.year || 'Year'} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.split(',').map((skill, i) => (
                  skill.trim() && <span key={i} className="text-xs font-medium bg-gray-200 text-gray-800 rounded-full px-3 py-1">{skill.trim()}</span>
                ))}
              </div>
            </section>
          )}
          {certifications && certifications[0]?.name && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="text-xs text-gray-700">
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-gray-500">{cert.issuer} {cert.year && `• ${cert.year}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {languages && languages[0]?.name && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-3 border-b-2" style={{ borderColor: themeColor }}>Languages</h2>
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

export default Template2;
