import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Template6 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills } = resumeData;

  const renderBulletPoints = (text) => {
    return text.split('\n').map((line, i) => (
      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
        <span style={{ color: themeColor }}>▸</span>
        <span>{line.replace(/^\s*-\s*/, '')}</span>
      </li>
    ));
  };

  return (
    <div className="p-8 bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-10 pb-6 border-b-3" style={{ borderColor: themeColor }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight uppercase" style={{ color: themeColor }}>
              {personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-xl font-semibold mt-2 text-gray-600">
              {personalInfo.title || 'Your Title'}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline">
                <Mail size={16} style={{ color: themeColor }} /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2">
                <Phone size={16} style={{ color: themeColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <Linkedin size={16} style={{ color: themeColor }} /> {personalInfo.linkedin}
              </a>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <Github size={16} style={{ color: themeColor }} /> {personalInfo.github}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-10">
        {/* Work Experience */}
        {workExperience && workExperience[0]?.company && (
          <section>
            <h2 className="text-2xl font-bold pb-3 mb-6 uppercase tracking-wider" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
              Work Experience
            </h2>
            {workExperience.map((work, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
                  <h3 className="text-xl font-bold">{work.role || 'Role'}</h3>
                  <p className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">{work.duration || 'Duration'}</p>
                </div>
                <p className="text-lg font-semibold italic mb-3" style={{ color: themeColor }}>
                  {work.company || 'Company'}
                </p>
                <ul className="space-y-2">
                  {work.description && renderBulletPoints(work.description)}
                </ul>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education */}
          {education && education[0]?.school && (
            <section>
              <h2 className="text-2xl font-bold pb-3 mb-6 uppercase tracking-wider" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-bold">{edu.school || 'School'}</h3>
                  <p className="font-medium text-gray-700">{edu.degree || 'Degree'}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {edu.year || 'Year'} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && (
            <section>
              <h2 className="text-2xl font-bold pb-3 mb-6 uppercase tracking-wider" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.split(',').map((skill, i) => (
                  skill.trim() && (
                    <span
                      key={i}
                      className="text-sm font-medium px-3 py-1 rounded"
                      style={{
                        backgroundColor: `${themeColor}20`,
                        color: themeColor,
                      }}
                    >
                      {skill.trim()}
                    </span>
                  )
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects && projects[0]?.name && (
          <section>
            <h2 className="text-2xl font-bold pb-3 mb-6 uppercase tracking-wider" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, i) => (
                <div key={i} className="border rounded-lg p-5 hover:shadow-md transition-shadow" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <h3 className="text-lg font-bold">{proj.name || 'Project Name'}</h3>
                    {proj.link && (
                      <a 
                        href={`https://${proj.link}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-medium hover:underline" 
                        style={{ color: themeColor }}
                      >
                        View
                      </a>
                    )}
                  </div>
                  <p className="font-semibold italic mb-3 text-gray-700">
                    {proj.stack || 'Tech Stack'}
                  </p>
                  <ul className="space-y-1">
                    {proj.description && renderBulletPoints(proj.description)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template6;