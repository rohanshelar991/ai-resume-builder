# Ultimate Industry-Level AI Resume Builder Prompt

Build a modern AI-powered Resume Builder Web Application that helps users generate professional, ATS-optimized resumes using AI.

The application should look like a premium SaaS product similar to Canva, Rezi, or Resume.io.

The project must include beautiful UI, AI assistance, resume templates, live preview, and PDF export.

The final result should be production-level, scalable, and visually stunning.

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Framer Motion

### Backend

- Firebase (Auth + Firestore + Functions)

### AI Integration

- OpenAI API for resume writing suggestions (through Firebase Functions)

### PDF Generation

- react-pdf

### Deployment

- Vercel / Netlify

## UI Design Requirements

The UI must look extremely modern and clean.

Design inspiration:

- Apple
- Notion
- Linear
- Canva

Use:

- glassmorphism cards
- soft gradients
- rounded components
- smooth animations
- dark / light mode

Color palette example:

- Primary: `#6366F1`, `#8B5CF6`
- Gradient: `#6366F1 → #EC4899`
- Background: `#0f172a`, `#020617`

## Application Pages

### 1) Landing Page

Sections:

- Hero section
- Product demo preview
- Resume templates showcase
- AI features explanation
- Pricing (optional)
- Testimonials
- CTA buttons

### 2) Authentication System

Users should be able to:

- Sign Up
- Login
- Logout

Using Firebase Auth.

### 3) Dashboard

After login users should see a dashboard.

Features:

- Create new resume
- Edit existing resumes
- Resume analytics
- Profile settings

Dashboard cards:

- Create Resume
- My Resumes
- Templates
- AI Assistant

### 4) Resume Builder Editor

This is the main core feature.

Create a drag-and-drop resume editor similar to Canva or Figma.

Sections user can edit:

- Personal information
- Professional summary
- Work experience
- Education
- Skills
- Certifications
- Projects
- Languages

Each section should be editable live.

## AI Resume Writing Assistant

Integrate AI that can help users write content.

### AI Summary Generator

User enters:

- Job title
- Years of experience
- Skills

AI generates:

- Professional summary

### AI Experience Improver

User pastes:

- Worked as developer

AI converts it to:

- Developed scalable applications using modern frameworks improving system efficiency by 30%.

### AI Skill Suggestion

Based on job role, suggest relevant skills.

Example:

- Role: Data Scientist
- AI suggests: Python, TensorFlow, Pandas, Machine Learning

## Resume Templates

Create 10+ professional resume templates.

Examples:

- Minimal
- Corporate
- Modern
- Creative
- Tech style

User can switch templates instantly.

## Live Resume Preview

Right side panel should show live preview.

When user edits content → preview updates instantly.

## Export Resume

Allow export in:

- PDF
- DOCX

Also allow:

- Download
- Share link

## ATS Optimization Engine

Check resume for ATS compatibility.

Display score:

- ATS Score: 82%

Suggestions:

- Add more keywords
- Improve experience section
- Add measurable achievements

## Advanced Features

### Resume Score Analyzer

Analyze:

- keyword density
- readability
- section completeness

### Job Description Matching

User pastes job description.

AI compares resume and shows:

- Match Score: 76%
- Missing Skills: React, Docker, AWS

### Portfolio Generator

Auto-generate personal portfolio website from resume.

Example:

- `username.dev`

### Resume Version Manager

Allow users to:

- create multiple resume versions
- track edits

## Extra Premium Features

Add:

- Resume Website (shareable web page)
- QR Code Resume (generate QR code for resume link)
- AI Interview Questions (based on resume)

## Analytics

Track:

- resume views
- downloads
- recruiter clicks

## Project Structure

```
/client
  /components
  /pages
  /hooks
  /utils

/server
  /controllers
  /routes
  /models
  /services
```

## Security

Implement:

- authentication
- secure API endpoints
- rate limiting

## Performance

Optimize:

- lazy loading
- API caching
- optimized rendering

## Testing

Include:

- unit tests
- integration tests

## Final Goal

Create a professional AI Resume Builder platform that feels like a real startup SaaS product.

It should demonstrate:

- AI integration
- modern UI design
- scalable architecture
- real-world usability
