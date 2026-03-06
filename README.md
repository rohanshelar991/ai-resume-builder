# AI Resume Builder

Premium AI-powered resume builder inspired by Canva, Rezi, and Resume.io. Designed to feel like a real SaaS product with AI assistance, ATS optimization, templates, and real-time preview.

## Highlights

- **AI Writing Studio**: Summary generator, experience improver, skill suggestions
- **ATS Optimization**: ATS score, keyword suggestions, and grammar checks
- **Job Description Matching**: Match score with missing skills
- **Templates**: 10+ polished templates with instant switching
- **Live Preview**: Real-time preview while editing
- **Exports**: PDF export + shareable links
- **Dashboard**: Resume analytics, versioning, and project hub
- **Dark/Light Mode**: Premium SaaS look with glassmorphism styling

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend**: Firebase (Auth + Firestore + Functions)
- **AI Integration**: OpenAI via Firebase Functions (mocked locally by default)
- **PDF**: react-pdf
- **Icons**: Lucide React

## Specs

See the product requirements doc: `docs/PRD.md`.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

## Environment Variables

Create a `.env.local` in the project root:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_OPENAI_API_KEY=your_openai_key
```

## Firebase Functions (OpenAI)

1. Create `functions/.env` with:
   ```
   OPENAI_API_KEY=your_openai_key
   ```
2. Install function deps:
   ```
   cd functions
   npm install
   ```
3. Deploy functions:
   ```
   firebase deploy --only functions
   ```

## Firestore

Resumes are stored under:
```
users/{uid}/resumes/{resumeId}
```
The builder auto-saves every ~1.2s when logged in.

Deploy Firestore rules:
```
firebase deploy --only firestore
```

### Building for Production

To create a production build:
```bash
npm run build
```

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/           # React context for state/auth
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # Firebase + AI services
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Templates

The application includes 10+ professional resume templates:
1. Classic
2. Modern
3. Creative
4. Minimalist
5. Professional
6. Contemporary
7. Tech
8. Corporate
9. Editorial
10. Accent

## AI Features

- **Resume Generation**: Enter a job title to generate a tailored resume draft
- **Section Enhancement**: Improve work descriptions, project descriptions, and skills
- **Job Matching**: Analyze job descriptions and suggest improvements to your resume
- **Chat Assistant**: Get real-time help with resume building
- **ATS Optimization**: Score and keyword suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.
