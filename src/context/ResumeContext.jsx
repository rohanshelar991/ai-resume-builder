import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { aiService } from "../services/ai";
import { saveResume, loadResume } from "../services/firestore";
import { useAuth } from "./AuthContext";

export const ResumeContext = createContext();

const initialResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    title: "",
    summary: "",
  },
  education: [{ school: "", degree: "", year: "", gpa: "" }],
  workExperience: [{ company: "", role: "", duration: "", description: "" }],
  projects: [{ name: "", description: "", stack: "", link: "" }],
  skills: "",
  certifications: [{ name: "", issuer: "", year: "" }],
  languages: [{ name: "", level: "" }],
  profilePhoto: "", // Added profile photo field
};

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateURL = (url) => {
  if (!url) return true; // URL is optional
  try {
    new URL(`https://${url}`);
    return true;
  } catch {
    return false;
  }
};

const validateGPA = (gpa) => {
  if (!gpa) return true; // GPA is optional
  const gpaRegex = /^(\d+(\.\d+)?)\/(\d+(\.\d+)?)$/;
  return gpaRegex.test(gpa);
};

// AI enhancement functions
const enhanceWithAI = async (text, type) => {
  // In a real implementation, this would call an actual AI API
  // For now, we'll simulate more realistic enhancements
  
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500 + Math.random() * 1000));
  
  switch (type) {
    case 'jobTitle':
      return text;
    case 'name':
      return text;
    case 'company':
      return text;
    case 'role':
      return text;
    case 'school':
      return text;
    case 'degree':
      return text;
    case 'workDescription':
      return aiService.improveExperience(text);
    case 'projectDescription':
      // Enhance project descriptions with technical details
      const projectEnhancements = [
        "Implemented using modern frameworks and best practices",
        "Designed with scalability and performance in mind",
        "Integrated with third-party APIs for enhanced functionality",
        "Built with a focus on security and data protection",
        "Utilized cloud services for reliable deployment and scaling",
        "Followed agile methodologies for iterative development",
        "Incorporated automated testing for quality assurance",
        "Designed with responsive UI for cross-platform compatibility"
      ];
      const randomProjectEnhancement = projectEnhancements[Math.floor(Math.random() * projectEnhancements.length)];
      return `- ${randomProjectEnhancement}\n- ${text.split('\n')[0]?.replace('-', '').trim() || 'Delivered core functionality as part of the development team'}`;
    case 'skills':
      // Enhance skills with related technologies
      const skillEnhancements = [
        "JavaScript, TypeScript, React, Vue.js, Angular",
        "Python, Django, Flask, FastAPI, SQLAlchemy",
        "Java, Spring Boot, Hibernate, Maven, Gradle",
        "Node.js, Express, MongoDB, PostgreSQL, Redis",
        "AWS, Docker, Kubernetes, Terraform, Jenkins",
        "HTML, CSS, Sass, Tailwind CSS, Bootstrap",
        "SQL, PostgreSQL, MySQL, MongoDB, Redis",
        "Git, GitHub, GitLab, CI/CD, Agile, Scrum"
      ];
      const randomSkillEnhancement = skillEnhancements[Math.floor(Math.random() * skillEnhancements.length)];
      return text ? `${text}, ${randomSkillEnhancement}` : randomSkillEnhancement;
    case 'summary':
      if (typeof text === "object" && text !== null) {
        return aiService.generateSummary(text);
      }
      return aiService.generateSummary({ jobTitle: text, years: "", skills: "" });
    case 'experience':
      return aiService.improveExperience(text);
    default:
      return `${text} - enhanced by AI to be more professional and impactful.`;
  }
};

// AI resume generation
const generateAIResume = async (jobTitle) => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));
  
  // Generate more realistic resume data based on job title
  const jobKeywords = jobTitle.toLowerCase();
  let skills = "";
  
  if (jobKeywords.includes('frontend') || jobKeywords.includes('web')) {
    skills = "React, JavaScript, HTML, CSS, TypeScript, Redux, Webpack, Jest, Git";
  } else if (jobKeywords.includes('backend') || jobKeywords.includes('server')) {
    skills = "Node.js, Python, Java, SQL, PostgreSQL, MongoDB, Docker, AWS, REST APIs";
  } else if (jobKeywords.includes('data') || jobKeywords.includes('analyst')) {
    skills = "Python, SQL, Pandas, NumPy, Tableau, Excel, Machine Learning, Statistics";
  } else if (jobKeywords.includes('mobile')) {
    skills = "React Native, Flutter, iOS, Android, Swift, Kotlin, Firebase, REST APIs";
  } else {
    skills = "JavaScript, Python, SQL, Git, REST APIs, Docker, AWS, Agile";
  }
  
  return {
    personalInfo: {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
      title: jobTitle,
      summary: `Results-driven ${jobTitle} with a track record of delivering business impact and scalable solutions.`,
    },
    education: [
      {
        school: "University of Technology",
        degree: jobKeywords.includes('data') ? "M.S. in Data Science" : 
                jobKeywords.includes('computer') ? "B.S. in Computer Science" : 
                "B.S. in Software Engineering",
        year: "2022",
        gpa: "3.8/4.0",
      },
    ],
    workExperience: [
      {
        company: jobKeywords.includes('frontend') ? "WebTech Solutions" : 
                 jobKeywords.includes('backend') ? "ServerStack Inc." : 
                 jobKeywords.includes('data') ? "DataDriven Corp." : 
                 "Tech Innovations Ltd.",
        role: jobTitle,
        duration: "2022 - Present",
        description: `- Developed and maintained high-quality software solutions\n- Collaborated with cross-functional teams to deliver projects on time\n- Implemented best practices for code quality and performance`,
      },
    ],
    projects: [
      {
        name: `${jobTitle.split(' ')[0]} Optimization Tool`,
        description: `- A tool to improve productivity and workflow\n- Implemented using modern technologies and frameworks\n- Received positive feedback from users and stakeholders`,
        stack: jobKeywords.includes('frontend') ? "React, Node.js, MongoDB" : 
               jobKeywords.includes('backend') ? "Python, Django, PostgreSQL" : 
               jobKeywords.includes('data') ? "Python, Pandas, Scikit-learn" : 
               "JavaScript, React, Node.js",
        link: "github.com/alexjohnson/project",
      },
    ],
    skills: skills,
    certifications: [
      {
        name: jobKeywords.includes('data') ? "Google Data Analytics" : "AWS Certified Cloud Practitioner",
        issuer: jobKeywords.includes('data') ? "Google" : "Amazon",
        year: "2023",
      },
    ],
    languages: [
      { name: "English", level: "Professional" },
    ],
    profilePhoto: "", // Initialize with empty profile photo
  };
};

export const ResumeProvider = ({ children }) => {
  const { user, firebaseReady } = useAuth();
  const normalizeResumeData = useCallback((data) => {
    return {
      ...initialResumeData,
      ...data,
      personalInfo: {
        ...initialResumeData.personalInfo,
        ...(data?.personalInfo || {}),
      },
      education: data?.education?.length ? data.education : initialResumeData.education,
      workExperience: data?.workExperience?.length ? data.workExperience : initialResumeData.workExperience,
      projects: data?.projects?.length ? data.projects : initialResumeData.projects,
      certifications: data?.certifications?.length ? data.certifications : initialResumeData.certifications,
      languages: data?.languages?.length ? data.languages : initialResumeData.languages,
    };
  }, []);

  const [resumeData, setResumeData] = useState(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem('resumeData');
    return savedData ? normalizeResumeData(JSON.parse(savedData)) : initialResumeData;
  });

  const [resumeId] = useState(() => {
    return localStorage.getItem("resumeId") || "default";
  });
  
  const [template, setTemplate] = useState(() => {
    return localStorage.getItem('resumeTemplate') || "template1";
  });
  
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || "#38bdf8";
  });
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Load resume from Firestore when available
  useEffect(() => {
    const run = async () => {
      if (!firebaseReady || !user) return;
      const cloud = await loadResume(user.uid, resumeId);
      if (cloud) {
        setResumeData(normalizeResumeData(cloud));
      }
    };
    run();
  }, [firebaseReady, user, resumeId, normalizeResumeData]);

  // Auto-save to Firestore
  useEffect(() => {
    if (!firebaseReady || !user) return;
    const handle = setTimeout(() => {
      saveResume(user.uid, resumeId, resumeData);
    }, 1200);
    return () => clearTimeout(handle);
  }, [firebaseReady, user, resumeId, resumeData]);

  // Save template to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeTemplate', template);
  }, [template]);

  // Save theme color to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  // Validate resume data
  const validateResumeData = useCallback((data) => {
    const newErrors = {};
    
    // Validate personal info
    if (!data.personalInfo.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (data.personalInfo.email && !validateEmail(data.personalInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (data.personalInfo.linkedin && !validateURL(data.personalInfo.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }
    
    if (data.personalInfo.github && !validateURL(data.personalInfo.github)) {
      newErrors.github = "Please enter a valid GitHub URL";
    }
    
    // Validate education
    data.education.forEach((edu, index) => {
      if (edu.gpa && !validateGPA(edu.gpa)) {
        newErrors[`education-${index}-gpa`] = "Please enter GPA in format X/Y (e.g., 3.8/4.0)";
      }
    });
    
    // Validate work experience
    data.workExperience.forEach((work, index) => {
      if (work.company && !work.role) {
        newErrors[`workExperience-${index}-role`] = "Role is required when company is filled";
      }
      if (work.role && !work.company) {
        newErrors[`workExperience-${index}-company`] = "Company is required when role is filled";
      }
    });
    
    // Validate projects
    data.projects.forEach((project, index) => {
      if (project.name && !project.description) {
        newErrors[`projects-${index}-description`] = "Description is required when project name is filled";
      }
      if (project.link && !validateURL(project.link)) {
        newErrors[`projects-${index}-link`] = "Please enter a valid URL";
      }
    });
    
    return newErrors;
  }, []);

  // Memoize the updateResumeData function
  const updateResumeData = useCallback((section, data) => {
    setResumeData((prev) => ({ ...prev, [section]: data }));
    
    // Clear errors for this section when it's updated
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(section)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  }, []);

  // Memoize the addEntry function
  const addEntry = useCallback((section) => {
    const newEntry =
      section === "education"
        ? { school: "", degree: "", year: "", gpa: "" }
        : section === "workExperience"
          ? { company: "", role: "", duration: "", description: "" }
          : section === "projects"
            ? { name: "", description: "", stack: "", link: "" }
            : section === "certifications"
              ? { name: "", issuer: "", year: "" }
              : section === "languages"
                ? { name: "", level: "" }
            : null;

    if (newEntry) {
      setResumeData((prev) => ({
        ...prev,
        [section]: [...prev[section], newEntry],
      }));
    }
  }, []);

  // Memoize the removeEntry function
  const removeEntry = useCallback((section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
    
    // Clear errors for this entry when it's removed
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`${section}-${index}`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  }, []);

  // Memoize the generateAIResume function
  const generateAIResumeFunc = useCallback(async (jobTitle) => {
    setLoading(true);
    try {
      const mockData = await generateAIResume(jobTitle);
      setResumeData(mockData);
    } catch (error) {
      console.error("Error generating AI resume:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize the improveWithAI function
  const improveWithAI = useCallback(async (text, type = 'default') => {
    setLoading(true);
    try {
      const improvedText = await enhanceWithAI(text, type);
      return improvedText;
    } catch (error) {
      console.error("Error enhancing with AI:", error);
      return text; // Return original text if enhancement fails
    } finally {
      setLoading(false);
    }
  }, []);

  // Validate and update resume data
  const validateAndUpdateResumeData = useCallback((section, data) => {
    const newErrors = validateResumeData({ ...resumeData, [section]: data });
    setErrors(prev => ({ ...prev, ...newErrors }));
    
    // Only update if there are no errors for this section
    const sectionErrors = Object.keys(newErrors).filter(key => key.startsWith(section));
    if (sectionErrors.length === 0) {
      setResumeData((prev) => ({ ...prev, [section]: data }));
      return true;
    }
    return false;
  }, [resumeData, validateResumeData]);

  // Import resume data from JSON
  const importFromJSON = useCallback((jsonData) => {
    try {
      const parsedData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      setResumeData(normalizeResumeData(parsedData));
      return { success: true };
    } catch (error) {
      console.error("Error importing JSON:", error);
      return { success: false, error: "Invalid JSON format" };
    }
  }, [normalizeResumeData]);

  // Export resume data to JSON
  const exportToJSON = useCallback(() => {
    return JSON.stringify(resumeData, null, 2);
  }, [resumeData]);

  // Import from LinkedIn (simulated)
  const importFromLinkedIn = useCallback(async (profileData) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Map LinkedIn data to resume format
      const mappedData = {
        personalInfo: {
          name: profileData.name || resumeData.personalInfo.name,
          email: profileData.email || resumeData.personalInfo.email,
          phone: profileData.phone || resumeData.personalInfo.phone,
          linkedin: profileData.linkedin || resumeData.personalInfo.linkedin,
          github: profileData.github || resumeData.personalInfo.github,
          title: profileData.headline || resumeData.personalInfo.title,
        },
        education: profileData.education ? profileData.education.map(edu => ({
          school: edu.schoolName || "",
          degree: edu.degreeName || "",
          year: edu.endDate ? `${edu.startDate || ''} - ${edu.endDate}` : "",
          gpa: ""
        })) : resumeData.education,
        workExperience: profileData.experiences ? profileData.experiences.map(exp => ({
          company: exp.companyName || "",
          role: exp.title || "",
          duration: exp.endDate ? `${exp.startDate || ''} - ${exp.endDate}` : (exp.startDate ? `${exp.startDate} - Present` : ""),
          description: exp.description || ""
        })) : resumeData.workExperience,
        projects: resumeData.projects, // Keep existing projects
        skills: profileData.skills ? profileData.skills.join(", ") : resumeData.skills,
        profilePhoto: profileData.profilePhoto || resumeData.profilePhoto
      };
      
      setResumeData(mappedData);
      return { success: true };
    } catch (error) {
      console.error("Error importing from LinkedIn:", error);
      return { success: false, error: "Failed to import LinkedIn data" };
    } finally {
      setLoading(false);
    }
  }, [resumeData]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    resumeData,
    updateResumeData,
    addEntry,
    removeEntry,
    template,
    setTemplate,
    themeColor,
    setThemeColor,
    step,
    setStep,
    loading,
    generateAIResume: generateAIResumeFunc,
    improveWithAI,
    errors,
    validateAndUpdateResumeData,
    validateResumeData,
    importFromJSON,
    exportToJSON,
    importFromLinkedIn
  }), [
    resumeData,
    updateResumeData,
    addEntry,
    removeEntry,
    template,
    themeColor,
    step,
    loading,
    generateAIResumeFunc,
    improveWithAI,
    errors,
    validateAndUpdateResumeData,
    validateResumeData,
    importFromJSON,
    exportToJSON,
    importFromLinkedIn
  ]);

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
