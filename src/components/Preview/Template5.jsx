import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Template5 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, profilePhoto } = resumeData;

  const renderBulletPoints = (text) => {
    return text.split('\n').map((line, i) => (
      <li key={i} className="text-sm text-gray-700 list-disc list-inside">{line.replace(/^\s*-\s*/, '')}</li>
    ));
  };

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-8 pb-6 border-b-4" style={{ borderColor: themeColor }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {profilePhoto && (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4"
                style={{ borderColor: themeColor }}
              />
            )}
            <div>
              <h1 className="text-5xl font-bold tracking-tight" style={{ color: themeColor }}>
                {personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-2xl font-semibold mt-2 text-gray-600">
                {personalInfo.title || 'Your Title'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline">
                <Mail size={16} /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone size={16} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Github size={16} /> GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Education */}
          {education && education[0]?.school && (
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h3 className="text-lg font-semibold">{edu.school || 'School'}</h3>
                  <p className="font-medium text-gray-700">{edu.degree || 'Degree'}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {edu.year || 'Year'} {edu.gpa && `| GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && (
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.split(',').map((skill, i) => (
                  skill.trim() && (
                    <span
                      key={i}
                      className="text-sm font-medium px-3 py-1 rounded-full"
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
        <div className="lg:col-span-2 space-y-8">
          {/* Work Experience */}
          {workExperience && workExperience[0]?.company && (
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                Work Experience
              </h2>
              {workExperience.map((work, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <h3 className="text-xl font-bold">{work.role || 'Role'}</h3>
                    <p className="text-sm font-medium text-gray-600">{work.duration || 'Duration'}</p>
                  </div>
                  <p className="text-lg font-semibold italic mt-1" style={{ color: themeColor }}>
                    {work.company || 'Company'}
                  </p>
                  <ul className="mt-3 space-y-1 pl-5">
                    {work.description && renderBulletPoints(work.description)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects[0]?.name && (
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                Projects
              </h2>
              {projects.map((proj, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <h3 className="text-xl font-bold">{proj.name || 'Project Name'}</h3>
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
                  <p className="text-lg font-semibold italic mt-1 text-gray-700">
                    {proj.stack || 'Tech Stack'}
                  </p>
                  <ul className="mt-3 space-y-1 pl-5">
                    {proj.description && renderBulletPoints(proj.description)}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template5;