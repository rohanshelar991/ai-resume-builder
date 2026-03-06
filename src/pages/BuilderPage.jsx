import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeContext } from "../context/ResumeContext";
import { Player } from "@lottiefiles/react-lottie-player";

// Form Components
import PersonalInfo from "../components/Form/PersonalInfo";
import Education from "../components/Form/Education";
import WorkExperience from "../components/Form/WorkExperience";
import Projects from "../components/Form/Projects";
import Skills from "../components/Form/Skills";
import ProfilePhoto from "../components/Form/ProfilePhoto";
import AISummary from "../components/Form/AISummary";
import SkillRecommender from "../components/Form/SkillRecommender";
import ResumeScore from "../components/Form/ResumeScore";
import GrammarChecker from "../components/Form/GrammarChecker";
import ATSScore from "../components/Form/ATSScore";
import JobMatcher from "../components/Form/JobMatcher";
import Certifications from "../components/Form/Certifications";
import Languages from "../components/Form/Languages";
import CloudSaveShare from "../components/CloudSaveShare";
import AutoFill from "../components/AutoFill";

// Layout & UI Components
import Preview from "../components/Preview";
import ProgressBar from "../components/ProgressBar";
import TemplateSwitcher from "../components/TemplateSwitcher";
import AIAssistant from "../components/AIAssistant";
import DownloadButton from "../components/DownloadButton";
import ShareResume from "../components/ShareResume";

// Icons
import { Wand2, ChevronLeft, ChevronRight, Sparkles, CheckCircle, FileText, Award, Briefcase, Code, Wrench, Share2, X, Camera, FileText as SummaryIcon, Lightbulb, Trophy, Check, Cloud, User, Languages as LanguagesIcon, BadgeCheck } from "lucide-react";

const FinalizeComponent = () => (
  <div className="text-center p-4 md:p-8 flex flex-col items-center justify-center h-full fade-in">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <CheckCircle className="text-green-500 mx-auto" size={80} />
    </motion.div>
    <h2 className="text-2xl md:text-3xl font-bold mt-6">Your Resume is Ready!</h2>
    <p className="text-muted-foreground mt-2 max-w-md mx-auto text-base md:text-lg">
      You've successfully created a professional resume. Customize it further with different templates and colors.
    </p>
    <div className="mt-6 md:mt-8 w-full max-w-md">
      <div className="form-card">
        <h3 className="text-lg md:text-xl font-bold mb-4">Final Steps</h3>
        <ul className="text-left space-y-3 text-muted-foreground text-sm md:text-base">
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Review all sections for accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Choose your preferred template and color scheme</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Download your PDF resume</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const steps = [
  { name: "Personal Info", icon: FileText, component: PersonalInfo },
  { name: "Summary", icon: SummaryIcon, component: AISummary },
  { name: "Education", icon: Award, component: Education },
  { name: "Work Experience", icon: Briefcase, component: WorkExperience },
  { name: "Projects", icon: Code, component: Projects },
  { name: "Skills", icon: Wrench, component: Skills },
  { name: "Certifications", icon: BadgeCheck, component: Certifications },
  { name: "Languages", icon: LanguagesIcon, component: Languages },
  { name: "Finalize", icon: CheckCircle, component: FinalizeComponent },
];

const BuilderPage = () => {
  const { step, setStep, generateAIResume, loading } =
    useContext(ResumeContext);
  const [jobTitle, setJobTitle] = useState("");
  const [direction, setDirection] = useState(1);
  const [shareOpen, setShareOpen] = useState(false);

  const handleStepClick = (newStep) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleGenerate = async () => {
    if (jobTitle) {
      await generateAIResume(jobTitle);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' && step < steps.length - 1) {
      handleNext();
    } else if (e.key === 'ArrowLeft' && step > 0) {
      handlePrev();
    }
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  const CurrentComponent = steps[step].component;
  const StepIcon = steps[step].icon;

  return (
    <div 
      className="w-full min-h-[calc(100vh-150px)] p-2 sm:p-4 lg:p-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="main"
      aria-label="Resume Builder"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* Left Panel: Form */}
        <div className="lg:col-span-2 flex flex-col gap-y-4 sm:gap-y-6">
          {step !== steps.length - 1 && (
            <div className="form-card">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <Sparkles className="text-purple-500" size={20} />
                  <span className="hidden xs:inline">AI Resume Generator</span>
                  <span className="xs:hidden">AI Generator</span>
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job title (e.g., Frontend Developer)"
                    className="form-input w-full sm:w-auto text-sm"
                    aria-label="Enter job title for AI resume generation"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !jobTitle}
                    className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-3 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Generate AI resume"
                  >
                    {loading ? (
                      <Sparkles className="animate-spin" size={16} />
                    ) : (
                      <Wand2 size={16} />
                    )}
                    <span className="hidden xs:inline">Generate</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Enter a job title to generate a tailored resume draft
              </p>
            </div>
          )}

          <div className="form-card">
            <ProgressBar
              currentStep={step}
              totalSteps={steps.length}
              stepNames={steps.map((s) => s.name)}
              onStepClick={handleStepClick}
            />
            <div className="mt-4 sm:mt-6 min-h-[300px] sm:min-h-[450px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3,
                  }}
                  className="fade-in"
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <StepIcon className="text-primary" size={20} />
                    <h2 className="text-xl sm:text-2xl font-bold">{steps[step].name}</h2>
                  </div>
                  <CurrentComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="flex items-center gap-1 sm:gap-2 btn-secondary text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Previous step"
            >
              <ChevronLeft size={16} />
              <span className="hidden xs:inline">Previous</span>
            </button>
            {step === steps.length - 1 ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-1 sm:gap-2 bg-secondary text-secondary-foreground font-bold py-2 px-3 sm:py-3 sm:px-6 rounded-lg hover:bg-secondary/80 transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Share resume"
                >
                  <Share2 size={16} />
                  <span className="hidden xs:inline">Share</span>
                </button>
                <DownloadButton />
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-3 sm:py-3 sm:px-6 rounded-lg hover:shadow-lg transition-all text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Next step"
              >
                <span className="hidden xs:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Panel: Preview and Tools */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24 space-y-6">
            {step !== steps.length - 1 && (
              <div className="form-card">
                <TemplateSwitcher />
              </div>
            )}
            
            {/* Additional Tools */}
            <div className="space-y-6">
              <AutoFill />
              <ResumeScore />
              <ATSScore />
              <JobMatcher />
              <GrammarChecker />
              <CloudSaveShare />
            </div>
            
            <div className="w-full aspect-[210/297] rounded-xl shadow-xl overflow-hidden border border-border">
              <Preview />
            </div>
            <div className="text-center text-xs sm:text-sm text-muted-foreground">
              <p>Real-time preview updates as you type</p>
            </div>
          </div>
        </div>
      </div>
      <AIAssistant />
      
      {/* Share Resume Component */}
      {shareOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-resume-title"
        >
          <div className="relative">
            <ShareResume />
            <button
              onClick={() => setShareOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close share dialog"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderPage;
