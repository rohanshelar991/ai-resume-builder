import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 700 },
  ]
});

// Memoize bullet point rendering
const BulletPoints = React.memo(({ text }) => {
  if (!text) return null;
  
  const points = text.split('\n').map((line, i) => (
    <View key={i} style={styles.bulletPoint}>
      <Text style={styles.bullet}>•</Text>
      <Text>{line.replace(/^\s*-\s*/, '')}</Text>
    </View>
  ));
  
  return <View>{points}</View>;
});

const PDFDocument = ({ resumeData, themeColor }) => {
  const { personalInfo, education, workExperience, projects, skills, certifications, languages } = resumeData;

  // Memoize styles to prevent recreation on every render
  const styles = useMemo(() => StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Inter',
      fontSize: 10,
      color: '#333'
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
      borderBottom: 2,
      paddingBottom: 10,
      borderColor: themeColor,
    },
    name: { fontSize: 28, fontWeight: 700 },
    title: { fontSize: 12, fontWeight: 500, color: themeColor, marginTop: 4 },
    contactInfo: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 8, fontSize: 9 },
    contactLink: { textDecoration: 'none', color: '#333' },

    sectionTitle: { fontSize: 14, fontWeight: 700, borderBottom: 2, paddingBottom: 2, marginBottom: 8, borderColor: themeColor },

    grid: { flexDirection: 'row', gap: 20 },
    mainContent: { flex: 2, flexDirection: 'column', gap: 15 },
    sidebar: { flex: 1, flexDirection: 'column', gap: 15 },

    entry: { marginBottom: 10 },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
    entryTitle: { fontSize: 11, fontWeight: 600 },
    entrySubtitle: { fontSize: 10, fontStyle: 'italic', marginBottom: 2 },
    entryDate: { fontSize: 9, color: '#555' },
    bulletPoint: { flexDirection: 'row', marginBottom: 2 },
    bullet: { marginRight: 5 },

    skillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
    skill: { backgroundColor: `${themeColor}20`, color: themeColor, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, fontSize: 9, fontWeight: 500 },
  }), [themeColor]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name || 'Your Name'}</Text>
          <Text style={styles.title}>{personalInfo.title || 'Your Title'}</Text>
          <View style={styles.contactInfo}>
            {personalInfo.email && <Link src={`mailto:${personalInfo.email}`} style={styles.contactLink}>{personalInfo.email}</Link>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.linkedin && <Link src={`https://${personalInfo.linkedin}`} style={styles.contactLink}>LinkedIn</Link>}
            {personalInfo.github && <Link src={`https://${personalInfo.github}`} style={styles.contactLink}>GitHub</Link>}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.mainContent}>
            {personalInfo.summary && (
              <View>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text>{personalInfo.summary}</Text>
              </View>
            )}
            {workExperience && workExperience[0]?.company && (
              <View>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {workExperience.map((work, i) => (
                  <View key={i} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{work.role || 'Role'}</Text>
                      <Text style={styles.entryDate}>{work.duration || 'Duration'}</Text>
                    </View>
                    <Text style={styles.entrySubtitle}>{work.company || 'Company'}</Text>
                    {work.description && <BulletPoints text={work.description} />}
                  </View>
                ))}
              </View>
            )}
            {projects && projects[0]?.name && (
              <View>
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map((proj, i) => (
                  <View key={i} style={styles.entry}>
                     <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{proj.name || 'Project Name'}</Text>
                      {proj.link && <Link src={`https://${proj.link}`} style={{...styles.entryDate, color: 'blue'}}>View Project</Link>}
                    </View>
                    <Text style={styles.entrySubtitle}>{proj.stack || 'Tech Stack'}</Text>
                    {proj.description && <BulletPoints text={proj.description} />}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.sidebar}>
            {education && education[0]?.school && (
              <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={styles.entry}>
                    <Text style={styles.entryTitle}>{edu.school || 'School'}</Text>
                    <Text style={styles.entrySubtitle}>{edu.degree || 'Degree'}</Text>
                    <Text style={styles.entryDate}>{edu.year || 'Year'} {edu.gpa && `| GPA: ${edu.gpa}`}</Text>
                  </View>
                ))}
              </View>
            )}
            {skills && (
              <View>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillContainer}>
                  {skills.split(',').map((skill, i) => (
                    skill.trim() && <Text key={i} style={styles.skill}>{skill.trim()}</Text>
                  ))}
                </View>
              </View>
            )}
            {certifications && certifications[0]?.name && (
              <View>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {certifications.map((cert, i) => (
                  <View key={i} style={styles.entry}>
                    <Text style={styles.entryTitle}>{cert.name}</Text>
                    <Text style={styles.entrySubtitle}>{cert.issuer}</Text>
                    <Text style={styles.entryDate}>{cert.year}</Text>
                  </View>
                ))}
              </View>
            )}
            {languages && languages[0]?.name && (
              <View>
                <Text style={styles.sectionTitle}>Languages</Text>
                {languages.map((lang, i) => (
                  <View key={i} style={styles.entry}>
                    <Text style={styles.entryTitle}>{lang.name}</Text>
                    <Text style={styles.entryDate}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
