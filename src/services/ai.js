import { httpsCallable } from "firebase/functions";
import { firebaseFunctions, firebaseReady } from "./firebase";

const randomPick = (items) => items[Math.floor(Math.random() * items.length)];

const normalizeSkills = (skills = "") =>
  skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

export const aiService = {
  async generateSummary({ jobTitle, years, skills }) {
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
    if (firebaseReady && firebaseFunctions) {
      const fn = httpsCallable(firebaseFunctions, "improveExperience");
      const res = await fn({ text });
      if (res?.data?.improved) return res.data.improved;
    }
    const starters = [
      "Developed scalable applications",
      "Delivered mission-critical features",
      "Optimized system performance",
      "Led cross-functional initiatives",
      "Implemented robust automation",
    ];
    const metrics = ["30%", "40%", "50%", "25%", "2x"];
    return `${randomPick(starters)} using modern frameworks, improving system efficiency by ${randomPick(metrics)}.`;
  },

  async suggestSkills(role = "") {
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
