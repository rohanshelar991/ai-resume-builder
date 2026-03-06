const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const dotenv = require("dotenv");

dotenv.config();
setGlobalOptions({ region: "us-central1" });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const callOpenAI = async (messages, temperature = 0.5) => {
  if (!OPENAI_API_KEY) {
    throw new HttpsError("failed-precondition", "OPENAI_API_KEY is not set.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    logger.error("OpenAI error:", errText);
    throw new HttpsError("internal", "OpenAI request failed.");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
};

const parseJSON = (content, fallback) => {
  try {
    return JSON.parse(content);
  } catch {
    return fallback;
  }
};

exports.generateSummary = onCall(async (request) => {
  const { jobTitle, years, skills } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "You are a professional resume writer. Return a 2-3 sentence summary optimized for ATS.",
      },
      {
        role: "user",
        content: `Job Title: ${jobTitle}\nYears: ${years}\nSkills: ${skills}`,
      },
    ],
    0.6,
  );
  return { summary: content };
});

exports.improveExperience = onCall(async (request) => {
  const { text } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "Rewrite the experience bullet to be action-oriented, quantified, and ATS-friendly.",
      },
      { role: "user", content: text || "" },
    ],
    0.6,
  );
  return { improved: content };
});

exports.suggestSkills = onCall(async (request) => {
  const { role } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "Suggest 8-12 relevant skills for the role. Return JSON: {\"skills\": [..]}",
      },
      { role: "user", content: role || "" },
    ],
    0.4,
  );
  return parseJSON(content, { skills: [] });
});

exports.atsScore = onCall(async (request) => {
  const { resumeText } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "Score ATS compatibility 0-100 and give 3 concise suggestions. Return JSON: {\"score\": number, \"suggestions\": [..]}",
      },
      { role: "user", content: resumeText || "" },
    ],
    0.2,
  );
  return parseJSON(content, { score: 70, suggestions: [] });
});

exports.jobMatch = onCall(async (request) => {
  const { resumeText, jobDescription } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "Compare resume vs job description. Return JSON: {\"score\": number, \"missing\": [..]}",
      },
      { role: "user", content: `RESUME:\n${resumeText}\n\nJOB:\n${jobDescription}` },
    ],
    0.2,
  );
  return parseJSON(content, { score: 70, missing: [] });
});

exports.interviewQuestions = onCall(async (request) => {
  const { resumeText } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "Generate 5 interview questions tailored to the resume. Return JSON: {\"questions\": [..]}",
      },
      { role: "user", content: resumeText || "" },
    ],
    0.5,
  );
  return parseJSON(content, { questions: [] });
});

exports.chatAssist = onCall(async (request) => {
  const { prompt, resumeText } = request.data || {};
  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "You are a resume assistant. Provide concise, actionable suggestions.",
      },
      { role: "user", content: `RESUME:\n${resumeText}\n\nREQUEST:\n${prompt}` },
    ],
    0.6,
  );
  return { response: content };
});
