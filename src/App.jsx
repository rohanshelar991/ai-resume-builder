import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import { DarkModeProvider } from "./hooks/useDarkMode";
import LandingPage from "./pages/LandingPage";
import BuilderPage from "./pages/BuilderPage";
import ResumeViewPage from "./pages/ResumeViewPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import TemplatesPage from "./pages/TemplatesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Header from "./components/layout/Header";
import TopBanner from "./components/layout/TopBanner";
import ParticlesBackground from "./components/layout/ParticlesBackground";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <ResumeProvider>
            <div className="min-h-screen bg-background text-foreground relative">
              <ParticlesBackground />
              <div className="relative z-10">
                <TopBanner text="🎉 New: AI Job Description Matcher! Upload a JD to see how you match." />
                <Header />
                <main id="main-content">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/builder"
                      element={
                        <ProtectedRoute>
                          <BuilderPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/view/:resumeId" element={<ResumeViewPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ResumeProvider>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
