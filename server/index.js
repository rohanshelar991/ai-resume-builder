import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 8081;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL || "https://api.groq.com/openai/v1/chat/completions";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "llama-3.3-70b-versatile";

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

const callOpenAI = async (messages, temperature = 0.5) => {
  if (!OPENAI_API_KEY) {
    return { error: "OPENAI_API_KEY is not set on the server." };
  }

  const response = await fetch(OPENAI_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature,
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { error: `OpenAI error: ${errorText}` };
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  return { content };
};

const parseJSON = (content, fallback) => {
  try {
    return JSON.parse(content);
  } catch {
    return fallback;
  }
};

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/ai/summary", async (req, res) => {
  const { jobTitle, years, skills } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json({ summary: result.content });
});

app.post("/api/ai/improve", async (req, res) => {
  const { text } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json({ improved: result.content });
});

app.post("/api/ai/skills", async (req, res) => {
  const { role } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json(parseJSON(result.content, { skills: [] }));
});

app.post("/api/ai/ats", async (req, res) => {
  const { resumeText } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json(parseJSON(result.content, { score: 70, suggestions: [] }));
});

app.post("/api/ai/job-match", async (req, res) => {
  const { resumeText, jobDescription } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json(parseJSON(result.content, { score: 70, missing: [] }));
});

app.post("/api/ai/chat", async (req, res) => {
  const { prompt, resumeText } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json({ response: result.content });
});

app.post("/api/ai/resume", async (req, res) => {
  const { jobTitle = "Software Engineer" } = req.body || {};
  const result = await callOpenAI(
    [
      {
        role: "system",
        content:
          "You are a resume builder. Return strict JSON only, no prose. Shape:\n{\n  \"personalInfo\": {\"name\":\"\",\"email\":\"\",\"phone\":\"\",\"linkedin\":\"\",\"github\":\"\",\"title\":\"\",\"summary\":\"\"},\n  \"education\": [{\"school\":\"\",\"degree\":\"\",\"year\":\"\",\"gpa\":\"\"}],\n  \"workExperience\": [{\"company\":\"\",\"role\":\"\",\"duration\":\"\",\"description\":\"\"}],\n  \"projects\": [{\"name\":\"\",\"description\":\"\",\"stack\":\"\",\"link\":\"\"}],\n  \"skills\": \"comma separated skills\",\n  \"certifications\": [{\"name\":\"\",\"issuer\":\"\",\"year\":\"\"}],\n  \"languages\": [{\"name\":\"\",\"level\":\"\"}]\n}\nFill values concisely and realistically for the role.",
      },
      {
        role: "user",
        content: `Role: ${jobTitle}`,
      },
    ],
    0.4,
  );
  if (result.error) return res.status(500).json({ error: result.error });
  try {
    const cleaned =
      result.content?.replace(/^```(?:json)?\s*/i, "").replace(/```$/, "") || "";
    const json = JSON.parse(cleaned);
    return res.json(json);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to parse AI response", raw: result.content });
  }
});

app.post("/api/ai/interview", async (req, res) => {
  const { resumeText } = req.body || {};
  const result = await callOpenAI(
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
  if (result.error) return res.status(500).json({ error: result.error });
  res.json(parseJSON(result.content, { questions: [] }));
});

app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`);
});
