import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Template3 = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages, profilePhoto } = resumeData;

  const renderBulletPoints = (text) => {
    return text.split('\n').map((line, i) => (
      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: themeColor }}></span>
        <span>{line.replace(/^\s*-\s*/, '')}</span>
      </li>
    ));
  };

  return (
    <div className="p-10 bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b-4" style={{ borderColor: themeColor }}>
          <div className="flex items-center gap-6">
            {profilePhoto && (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-28 h-28 rounded-2xl object-cover border-4 shadow-lg"
                style={{ borderColor: themeColor }}
              />
            )}
            <div>
              <h1 className="text-5xl font-bold tracking-tight" style={{ color: themeColor }}>
                {personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-2xl font-semibold mt-2 text-gray-700">
                {personalInfo.title || 'Your Title'}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-base">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline">
                <Mail size={18} style={{ color: themeColor }} /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2">
                <Phone size={18} style={{ color: themeColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <Linkedin size={18} style={{ color: themeColor }} /> LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <Github size={18} style={{ color: themeColor }} /> GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
              Professional Summary
            </h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Education */}
            {education && education[0]?.school && (
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                  Education
                </h2>
                {education.map((edu, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <h3 className="text-lg font-semibold">{edu.school || 'School'}</h3>
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
              <section className="bg-white p-6 rounded-2xl shadow-sm">
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

            {certifications && certifications[0]?.name && (
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                  Certifications
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  {certifications.map((cert, i) => (
                    <div key={i}>
                      <p className="font-semibold">{cert.name}</p>
                      <p className="text-gray-500">{cert.issuer} {cert.year && `• ${cert.year}`}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages && languages[0]?.name && (
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                  Languages
                </h2>
                <div className="space-y-2 text-sm text-gray-700">
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

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Work Experience */}
            {workExperience && workExperience[0]?.company && (
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold pb-3 mb-4 border-b-2" style={{ borderColor: themeColor }}>
                  Work Experience
                </h2>
                {workExperience.map((work, i) => (
                  <div key={i} className="mb-6 last:mb-0">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className="text-xl font-bold">{work.role || 'Role'}</h3>
                      <p className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{work.duration || 'Duration'}</p>
                    </div>
                    <p className="text-lg font-semibold italic mt-1" style={{ color: themeColor }}>
                      {work.company || 'Company'}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {work.description && renderBulletPoints(work.description)}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects && projects[0]?.name && (
              <section className="bg-white p-6 rounded-2xl shadow-sm">
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
                    <ul className="mt-3 space-y-2">
                      {proj.description && renderBulletPoints(proj.description)}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;
