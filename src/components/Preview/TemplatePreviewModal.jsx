import React from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";

Modal.setAppElement("#root");

const templates = {
  Classic: Template1,
  Modern: Template2,
  Creative: Template3,
  Minimalist: Template4,
  Professional: Template5,
  Contemporary: Template6,
};

const perfectResumeData = {
  personalInfo: {
    name: "Dr. Evelyn Reed",
    email: "evelyn.reed@email.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/evelynreed",
    github: "github.com/evelynreed",
    title: "Lead Data Scientist & AI Researcher",
  },
  education: [
    {
      school: "Stanford University",
      degree: "Ph.D. in Computer Science",
      year: "2018",
      gpa: "4.0",
    },
    { school: "MIT", degree: "M.S. in Data Science", year: "2014", gpa: "3.9" },
  ],
  workExperience: [
    {
      company: "Innovatech Solutions Inc.",
      role: "Lead Data Scientist",
      duration: "2018 - Present",
      description: `- Led a team of 15 data scientists and engineers on projects driving a 25% increase in product efficiency.\n- Architected and deployed a real-time fraud detection system, reducing false positives by 40%.\n- Published 5 papers in top-tier AI conferences (NeurIPS, ICML).`,
    },
    {
      company: "DataDriven Corp.",
      role: "Senior Data Scientist",
      duration: "2014 - 2018",
      description: `- Developed predictive models for customer churn, resulting in a 15% reduction in customer attrition.\n- Optimized machine learning pipelines, cutting down data processing time by 60%.`,
    },
  ],
  projects: [
    {
      name: "Project Quasar",
      description:
        "An open-source deep learning library for time-series analysis, now with over 10k stars on GitHub.",
      stack: "Python, TensorFlow, Keras",
      link: "github.com/evelynreed/quasar",
    },
    {
      name: "Sentiment Analysis API",
      description:
        "A highly scalable API for real-time sentiment analysis of social media data streams.",
      stack: "Python, Flask, Docker, AWS",
      link: "github.com/evelynreed/sentiment-api",
    },
  ],
  skills:
    "Python, R, SQL, TensorFlow, PyTorch, Scikit-learn, Docker, AWS, GCP, Spark, Hadoop, Machine Learning, Deep Learning, NLP",
};

const TemplatePreviewModal = ({ isOpen, onRequestClose, templateName }) => {
  const SelectedTemplate = templates[templateName];
  const themeColor =
    templateName === "Modern"
      ? "#c084fc"
      : templateName === "Creative"
        ? "#fb7185"
        : templateName === "Minimalist"
          ? "#818cf8"
          : templateName === "Professional"
            ? "#10b981"
            : templateName === "Contemporary"
              ? "#f59e0b"
              : "#38bdf8";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Template Preview"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm z-[100]"
      overlayClassName="fixed inset-0 bg-transparent z-[100]"
    >
      <div className="relative bg-background rounded-xl shadow-2xl w-full max-w-4xl h-[95vh] p-4 md:p-6 border border-border">
        <button
          onClick={onRequestClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-accent z-10"
        >
          <X size={20} />
        </button>
        <div className="w-full h-full overflow-y-auto bg-white rounded-lg">
          {SelectedTemplate ? (
            <SelectedTemplate
              resumeData={perfectResumeData}
              themeColor={themeColor}
            />
          ) : (
            <p>Template not found.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TemplatePreviewModal;