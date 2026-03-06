import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Wand2,
  Sparkles,
  ScanSearch,
  MessageSquare,
  Palette,
  FileText,
  Bot,
  ChevronRight,
  Star,
  Users,
  Zap,
  Upload,
  User,
} from "lucide-react";
import TemplatePreviewModal from "../components/Preview/TemplatePreviewModal";

const AnimatedStat = ({ value, label, suffix = "" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-4 sm:p-6 rounded-xl glassmorphism-light hover:shadow-lg transition-all duration-300"
    >
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        {value}{suffix}
      </p>
      <p className="text-base sm:text-lg text-muted-foreground mt-2">{label}</p>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="p-6 sm:p-8 rounded-2xl glassmorphism text-left space-y-4 h-full group hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <div className="inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
    <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, company, content, avatar }) => (
  <div className="p-4 sm:p-6 rounded-2xl glassmorphism">
    <div className="flex items-center gap-3 sm:gap-4 mb-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
        {avatar}
      </div>
      <div>
        <h4 className="font-bold text-sm sm:text-base">{name}</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">{role}, {company}</p>
      </div>
    </div>
    <p className="text-muted-foreground italic text-sm sm:text-base">"{content}"</p>
    <div className="flex mt-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-current" />
      ))}
    </div>
  </div>
);

const TemplatePreview = ({
  name,
  isModern = false,
  isCreative = false,
  isMinimalist = false,
  isProfessional = false,
  isContemporary = false,
  onClick,
}) => (
  <motion.div
    onClick={onClick}
    className="w-full h-64 sm:h-80 rounded-xl bg-background shadow-lg border border-border overflow-hidden p-4 sm:p-6 relative cursor-pointer group"
    whileHover={{ y: -10, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)" }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
    aria-label={`Preview ${name} template`}
  >
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${isMinimalist ? "bg-gray-200" : isCreative ? "bg-rose-200" : isModern ? "bg-purple-200" : isProfessional ? "bg-green-200" : isContemporary ? "bg-amber-200" : "bg-blue-200"}`}
      ></div>
      <div className="flex-grow space-y-1 sm:space-y-2">
        <div className="w-3/4 h-3 sm:h-4 rounded bg-gray-300"></div>
        <div className="w-1/2 h-2 sm:h-3 rounded bg-gray-200"></div>
      </div>
    </div>
    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
      <div className="w-full h-2 sm:h-3 rounded bg-gray-200"></div>
      <div className="w-full h-2 sm:h-3 rounded bg-gray-200"></div>
      <div className="w-3/4 h-2 sm:h-3 rounded bg-gray-200"></div>
    </div>
    <div
      className={`absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-base sm:text-lg font-bold ${isMinimalist ? "text-gray-500" : isCreative ? "text-rose-500" : isModern ? "text-purple-500" : isProfessional ? "text-green-500" : isContemporary ? "text-amber-500" : "text-blue-500"}`}
    >
      {name}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 sm:pb-6">
      <span className="bg-white text-black px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center gap-1 text-xs sm:text-sm">
        Preview <ChevronRight size={14} />
      </span>
    </div>
  </motion.div>
);

const LandingPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const openModal = (templateName) => {
    setSelectedTemplate(templateName);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const features = [
    {
      icon: <Bot className="text-purple-500" size={24} />,
      title: "AI Resume Generator",
      description: "Instantly generate a full resume draft by just providing a job title. Get a professional head start in seconds."
    },
    {
      icon: <Sparkles className="text-blue-500" size={24} />,
      title: "AI Section Enhancer",
      description: "Improve any text field with a single click. Make your descriptions more professional, add metrics, or simplify language."
    },
    {
      icon: <ScanSearch className="text-green-500" size={24} />,
      title: "AI Job Description Matcher",
      description: "Upload a job description and our AI will highlight missing keywords and suggest edits to tailor your resume."
    },
    {
      icon: <MessageSquare className="text-pink-500" size={24} />,
      title: "AI Chat Assistant",
      description: "Our floating AI assistant is always there to help. Ask it to shorten sections, check for ATS-friendliness, and more."
    },
    {
      icon: <Palette className="text-orange-500" size={24} />,
      title: "Multiple Templates",
      description: "Choose from a variety of professional templates. Switch between them instantly to find the perfect look."
    },
    {
      icon: <FileText className="text-red-500" size={24} />,
      title: "PDF Export",
      description: "Download a pixel-perfect PDF of your resume, ready to be sent to recruiters."
    },
    {
      icon: <Upload className="text-indigo-500" size={24} />,
      title: "Auto-Fill from JSON/LinkedIn",
      description: "Import your existing resume data from JSON files or LinkedIn profile to save time."
    },
    {
      icon: <User className="text-teal-500" size={24} />,
      title: "Collaboration Tools",
      description: "Share your resume with mentors, friends, or recruiters for feedback and collaboration."
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      company: "TechCorp",
      content: "This tool helped me land my dream job in just two weeks. The AI suggestions made my resume stand out!",
      avatar: "AJ"
    },
    {
      name: "Sarah Williams",
      role: "Product Manager",
      company: "InnovateX",
      content: "The template variety and customization options are fantastic. I've recommended this to all my colleagues.",
      avatar: "SW"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      company: "DataFlow",
      content: "The AI job matcher is incredibly accurate. It identified gaps in my resume I hadn't noticed before.",
      avatar: "MC"
    }
  ];

  const templates = [
    { name: "Classic", onClick: () => openModal("Classic") },
    { name: "Modern", isModern: true, onClick: () => openModal("Modern") },
    { name: "Creative", isCreative: true, onClick: () => openModal("Creative") },
    { name: "Minimalist", isMinimalist: true, onClick: () => openModal("Minimalist") },
    { name: "Professional", isProfessional: true, onClick: () => openModal("Professional") },
    { name: "Contemporary", isContemporary: true, onClick: () => openModal("Contemporary") }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-32 text-center relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
          >
            Build Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              AI-Powered
            </span>{" "}
            Resume in Minutes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-3xl mx-auto text-base sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-10"
          >
            Generate, edit, and optimize your resume with AI. ATS-friendly,
            professional, and customizable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link
              to="/builder"
              className="gradient-btn inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Start building your resume"
            >
              Start Building Now
            </Link>
            <Link
              to="/builder"
              className="glowing-wand-btn inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-secondary-foreground shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Try AI resume generator"
            >
              Try AI Resume Generator
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Trusted by Thousands of Job Seekers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <AnimatedStat value="10" label="Resumes Built" suffix="K+" />
            <AnimatedStat value="95" label="ATS Success Rate" suffix="%" />
            <AnimatedStat value="1" label="AI Enhancements" suffix="M+" />
            <AnimatedStat value="5" label="Average Time to Draft" suffix=" min" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="text-yellow-500" size={20} />
            <span className="text-yellow-500 font-medium text-sm sm:text-base">FEATURES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            A Smarter Way to Build Your Resume
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12">
            Leverage the power of AI to create a resume that stands out.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="text-blue-500" size={20} />
            <span className="text-blue-500 font-medium text-sm sm:text-base">TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
            What Our Users Say
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
            Join thousands of job seekers who have transformed their careers.
          </p>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-12 sm:py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="text-purple-500" size={20} />
            <span className="text-purple-500 font-medium text-sm sm:text-base">TEMPLATES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Professional, Modern Templates
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12">
            Choose from a variety of templates and colors to match your style.
            Click any template to see a larger preview.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {templates.map((template, index) => (
              <TemplatePreview
                key={index}
                name={template.name}
                isModern={template.isModern}
                isCreative={template.isCreative}
                isMinimalist={template.isMinimalist}
                isProfessional={template.isProfessional}
                isContemporary={template.isContemporary}
                onClick={template.onClick}
              />
            ))}
          </div>
        </div>
      </section>

      <TemplatePreviewModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        templateName={selectedTemplate}
      />
    </div>
  );
};

export default LandingPage;