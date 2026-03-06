import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Template4 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, profilePhoto } = resumeData;

  const renderBulletPoints = (text) => {
    return text.split('\n').map((line, i) => (
      <li key={i} className="text-sm text-gray-600 flex items-start">
        <span className="inline-block mr-2" style={{ color: themeColor }}>•</span>
        <span>{line.replace(/^\s*-\s*/, '')}</span>
      </li>
    ));
  };

  return (
    <div className="p-12 bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-12 pb-8 border-b-2" style={{ borderColor: themeColor }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4"
              style={{ borderColor: themeColor }}
            />
          )}
          <div className="flex-grow">
            <h1 className="text-5xl font-bold tracking-tight" style={{ color: themeColor }}>
              {personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-2xl font-light mt-2 text-gray-600">
              {personalInfo.title || 'Your Title'}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-base text-right">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-end gap-2 hover:underline">
                <Mail size={16} /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center justify-end gap-2">
                <Phone size={16} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:underline">
                <Linkedin size={16} /> {personalInfo.linkedin}
              </a>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:underline">
                <Github size={16} /> {personalInfo.github}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-10">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>
                Summary
              </h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Education */}
          {education && education[0]?.school && (
            <section>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>
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
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>
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

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Work Experience */}
          {workExperience && workExperience[0]?.company && (
            <section>
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider" style={{ color: themeColor }}>
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
                  <ul className="space-y-1">
                    {work.description && renderBulletPoints(work.description)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects[0]?.name && (
            <section>
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider" style={{ color: themeColor }}>
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((proj, i) => (
                  <div key={i} className="border-l-4 pl-4 py-1" style={{ borderColor: themeColor }}>
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="text-lg font-bold">{proj.name || 'Project Name'}</h3>
                      {proj.link && (
                        <a 
                          href={`https://${proj.link}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm font-medium hover:underline" 
                          style={{ color: themeColor }}
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="font-semibold italic text-gray-700 mb-2">
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
    </div>
  );
};

export default Template4;