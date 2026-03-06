import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Sparkles, BarChart3, Layers, Rocket, Share2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { listResumes } from "../services/firestore";

const cards = [
  { title: "Create Resume", desc: "Start a new resume with AI guidance.", icon: Rocket, href: "/builder" },
  { title: "My Resumes", desc: "View and manage your resume versions.", icon: FileText, href: "/builder" },
  { title: "Templates", desc: "Browse 10+ templates.", icon: Layers, href: "/templates" },
  { title: "AI Assistant", desc: "Get AI suggestions on demand.", icon: Sparkles, href: "/builder" },
  { title: "Analytics", desc: "Track views and recruiter clicks.", icon: BarChart3, href: "/analytics" },
  { title: "Share Links", desc: "Create shareable links with QR codes.", icon: Share2, href: "/builder" },
];

const DashboardPage = () => {
  const { user, logout, firebaseReady } = useAuth();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (!firebaseReady || !user) return;
      const data = await listResumes(user.uid);
      setResumes(data);
    };
    run();
  }, [firebaseReady, user]);

  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="text-3xl md:text-4xl font-bold">
              {user?.email || "Resume Studio"}
            </h1>
            <p className="text-muted-foreground mt-2">
              Build, optimize, and ship a standout resume in minutes.
            </p>
          </div>
          <button
            onClick={logout}
            className="btn-outline"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link key={card.title} to={card.href} className="form-card hover:shadow-xl transition-shadow">
              <card.icon className="text-indigo-500" size={24} />
              <h3 className="text-lg font-semibold mt-4">{card.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{card.desc}</p>
              <span className="text-sm font-semibold text-blue-500 mt-4 inline-block">
                Open →
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="form-card space-y-4">
            <h3 className="font-semibold text-lg">Resume Versions</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {resumes.length > 0 ? (
                resumes.map((resume) => (
                  <div key={resume.id} className="flex justify-between">
                    <span>{resume.personalInfo?.title || "Untitled Resume"}</span>
                    <span>{resume.updatedAt ? "Synced" : "Draft"}</span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground">No resumes saved yet.</div>
              )}
            </div>
            <Link to="/builder" className="text-sm font-semibold text-blue-500">
              Manage versions →
            </Link>
          </div>
          <div className="form-card space-y-4">
            <h3 className="font-semibold text-lg">AI Interview Questions</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Walk me through a project that had the biggest impact.</li>
              <li>How do you prioritize tasks when deadlines are tight?</li>
              <li>What tradeoffs did you make in your most recent role?</li>
            </ul>
            <Link to="/builder" className="text-sm font-semibold text-blue-500">
              Generate more questions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
