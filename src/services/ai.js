import { httpsCallable } from "firebase/functions";
import { firebaseFunctions, firebaseReady } from "./firebase";

const normalizeSkills = (skills = "") =>
  skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

export const aiService = {
  async generateResume(jobTitle = "") {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.personalInfo) return data;
      }
    }
    // Fallback minimal skeleton
    return {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        title: jobTitle,
        summary: "",
      },
      education: [{ school: "", degree: "", year: "", gpa: "" }],
      workExperience: [{ company: "", role: "", duration: "", description: "" }],
      projects: [{ name: "", description: "", stack: "", link: "" }],
      skills: "",
      certifications: [{ name: "", issuer: "", year: "" }],
      languages: [{ name: "", level: "" }],
      profilePhoto: "",
    };
  },

  async generateSummary({ jobTitle, years, skills }) {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, years, skills }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.summary) return data.summary;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "generateSummary");
      const res = await fn({ jobTitle, years, skills });
      if (res?.data?.summary) return res.data.summary;
    }
    const skillList = normalizeSkills(skills);
    const focus = skillList.length > 0 ? skillList.slice(0, 4).join(", ") : "modern tools";
    const tenure = years ? `${years}+ years` : "proven experience";
    return `Results-driven ${jobTitle || "professional"} with ${tenure} delivering high-impact outcomes. Skilled in ${focus} with a focus on measurable impact, collaboration, and continuous improvement.`;
  },

  async improveExperience(text = "") {
    if (!text.trim()) return "";
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.improved) return data.improved;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "improveExperience");
      const res = await fn({ text });
      if (res?.data?.improved) return res.data.improved;
    }
    // Fallback: keep the user's text instead of adding random content to avoid surprise changes.
    return text.trim();
  },

  async suggestSkills(role = "") {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.skills?.length) return data.skills;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "suggestSkills");
      const res = await fn({ role });
      if (res?.data?.skills?.length) return res.data.skills;
    }
    const key = role.toLowerCase();
    if (key.includes("data")) {
      return ["Python", "TensorFlow", "Pandas", "SQL", "Machine Learning", "Statistics"];
    }
    if (key.includes("frontend") || key.includes("ui")) {
      return ["React", "TypeScript", "Tailwind CSS", "Next.js", "Accessibility", "Cypress"];
    }
    if (key.includes("backend") || key.includes("api")) {
      return ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "AWS"];
    }
    return ["Communication", "Problem Solving", "Leadership", "Agile", "Git", "Project Ownership"];
  },

  async atsScore(resumeData) {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/ats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: JSON.stringify(resumeData) }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.score) return data;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "atsScore");
      const res = await fn({ resumeText: JSON.stringify(resumeData) });
      if (res?.data?.score) return res.data;
    }
    const text = JSON.stringify(resumeData).toLowerCase();
    const keywords = ["impact", "led", "built", "optimized", "improved", "achieved"];
    const hits = keywords.filter((k) => text.includes(k)).length;
    const completeness = text.length > 800 ? 35 : text.length > 400 ? 25 : 15;
    const score = Math.min(95, 50 + hits * 5 + completeness);
    const suggestions = [];
    if (hits < 3) suggestions.push("Add action verbs and measurable impact.");
    if (!text.includes("metrics")) suggestions.push("Include metrics like %, $, or time saved.");
    if (!text.includes("project")) suggestions.push("Add at least one project with outcomes.");
    return { score, suggestions };
  },

  async jobMatch(resumeData, jobDescription) {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/job-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: JSON.stringify(resumeData),
          jobDescription,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.score) return data;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "jobMatch");
      const res = await fn({
        resumeText: JSON.stringify(resumeData),
        jobDescription,
      });
      if (res?.data?.score) return res.data;
    }
    const jd = jobDescription.toLowerCase();
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const keySkills = [
      "react",
      "node",
      "typescript",
      "aws",
      "docker",
      "sql",
      "python",
      "figma",
    ];
    const missing = keySkills.filter((skill) => jd.includes(skill) && !resumeText.includes(skill));
    const base = 70;
    const score = Math.max(30, base - missing.length * 6);
    return { score, missing };
  },

  async interviewQuestions(resumeData) {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: JSON.stringify(resumeData) }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.questions?.length) return data.questions;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "interviewQuestions");
      const res = await fn({ resumeText: JSON.stringify(resumeData) });
      if (res?.data?.questions?.length) return res.data.questions;
    }
    const role = resumeData.personalInfo?.title || "your role";
    return [
      `Walk me through a project where you improved results in ${role}.`,
      "Describe a time you resolved a production issue under pressure.",
      "How do you prioritize tasks when timelines are tight?",
      "What tradeoffs did you make in your most recent project?",
    ];
  },
  async chatAssist(resumeData, prompt) {
    if (import.meta.env.VITE_API_BASE_URL) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: JSON.stringify(resumeData),
          prompt,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.response) return data.response;
      }
    }
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "chatAssist");
      const res = await fn({
        resumeText: JSON.stringify(resumeData),
        prompt,
      });
      if (res?.data?.response) return res.data.response;
    }
    return "AI assistant is available once Firebase Functions is configured.";
  },
};

export const isOpenAIConfigured = () =>
  Boolean(import.meta.env.VITE_OPENAI_API_KEY);
