import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup, error, firebaseReady } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glassmorphism rounded-3xl p-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
            Premium SaaS Experience
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Welcome back to your AI Resume Studio
          </h1>
          <p className="text-muted-foreground">
            Sign in to manage resumes, templates, analytics, and AI-powered improvements.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="text-purple-500" size={20} />
              <div>
                <p className="font-semibold">AI Writing Copilot</p>
                <p className="text-sm text-muted-foreground">
                  Generate summaries, improve experience, and optimize ATS keywords.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="text-pink-500" size={20} />
              <div>
                <p className="font-semibold">Realtime Collaboration</p>
                <p className="text-sm text-muted-foreground">
                  Share previews, manage resume versions, and export instantly.
                </p>
              </div>
            </div>
          </div>
          {!firebaseReady && (
            <div className="text-xs text-yellow-500">
              Firebase is not configured yet. Authentication is running in demo mode.
            </div>
          )}
        </div>

        <div className="glassmorphism rounded-3xl p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="form-input pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-input pl-10"
              />
            </div>
            {(localError || error) && (
              <div className="text-sm text-red-500">
                {localError || error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
