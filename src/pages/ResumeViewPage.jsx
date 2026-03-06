import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Template1 from "../components/Preview/Template1";
import Template2 from "../components/Preview/Template2";
import Template3 from "../components/Preview/Template3";
import Template4 from "../components/Preview/Template4";
import Template5 from "../components/Preview/Template5";
import Template6 from "../components/Preview/Template6";
import ResumeComments from "../components/ResumeComments";
import { Download, Share2, Heart, MessageCircle, UserPlus, Copy, Check, Users } from "lucide-react";

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
  template5: Template5,
  template6: Template6,
};

// Mock data for demonstration
const mockResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    title: "Senior Frontend Developer",
  },
  education: [
    {
      school: "University of Technology",
      degree: "B.S. in Computer Science",
      year: "2018-2022",
      gpa: "3.8/4.0",
    },
  ],
  workExperience: [
    {
      company: "Tech Innovations Ltd.",
      role: "Senior Frontend Developer",
      duration: "2022 - Present",
      description: `- Led a team of 5 developers to build a customer-facing dashboard\n- Implemented responsive design principles improving user engagement by 40%\n- Reduced page load time by 60% through code optimization`,
    },
    {
      company: "Digital Solutions Inc.",
      role: "Frontend Developer",
      duration: "2020-2022",
      description: `- Developed and maintained 10+ web applications using React\n- Collaborated with UX designers to implement pixel-perfect interfaces\n- Mentored 3 junior developers on best practices`,
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "A full-featured online shopping experience with cart, checkout, and payment integration",
      stack: "React, Node.js, MongoDB, Stripe",
      link: "github.com/alexjohnson/ecommerce",
    },
    {
      name: "Task Management App",
      description:
        "A productivity tool for teams to manage projects and deadlines",
      stack: "React, Firebase, Material-UI",
      link: "github.com/alexjohnson/taskmanager",
    },
  ],
  skills:
    "JavaScript, React, Vue.js, HTML, CSS, Node.js, Git, REST APIs, Agile",
};

const ResumeViewPage = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [template, setTemplate] = useState("template1");
  const [themeColor, setThemeColor] = useState("#38bdf8");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(24);
  const [showComments, setShowComments] = useState(false);
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "Sarah Johnson", avatar: "SJ", role: "Reviewer" },
    { id: 2, name: "Michael Chen", avatar: "MC", role: "Mentor" },
  ]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // In a real application, this would fetch the resume data from an API
    // For now, we'll use mock data
    setResumeData(mockResumeData);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Set a random template for variety
      const templates = Object.keys(templates);
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setTemplate(randomTemplate);
      
      // Set a random theme color
      const colors = ["#38bdf8", "#fb7185", "#4ade80", "#facc15", "#c084fc", "#818cf8"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setThemeColor(randomColor);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [resumeId]);

  const SelectedTemplate = templates[template];

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleAddCollaborator = () => {
    if (newCollaborator.trim()) {
      const newCollab = {
        id: collaborators.length + 1,
        name: newCollaborator,
        avatar: newCollaborator.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2),
        role: "Collaborator"
      };
      setCollaborators([...collaborators, newCollab]);
      setNewCollaborator("");
    }
  };

  const handleCopyLink = () => {
    // In a real app, this would copy the actual resume URL
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF export functionality would be implemented here");
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}'s Resume</h1>
            <p className="text-muted-foreground">{resumeData.personalInfo.title}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download size={16} />
              Download
            </button>
            <button 
              onClick={handleCopyLink}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? "Copied!" : "Share"}
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <MessageCircle size={16} />
              Comments
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {SelectedTemplate ? (
                <SelectedTemplate resumeData={resumeData} themeColor={themeColor} />
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  Template not found
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background/50 glassmorphism rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                    liked 
                      ? "bg-red-500 text-white" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Heart size={16} fill={liked ? "white" : "none"} />
                  {liked ? "Liked" : "Like"} ({likes})
                </button>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <MessageCircle size={16} />
                  Comments ({3}) {/* Mock comment count */}
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download size={16} />
                  Download PDF
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                  <UserPlus size={16} />
                  Collaborate
                </button>
              </div>
            </div>

            <div className="bg-background/50 glassmorphism rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users size={20} /> Collaborators
              </h2>
              <div className="space-y-3">
                <div className="space-y-2">
                  {collaborators.map((collab) => (
                    <div key={collab.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {collab.avatar}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{collab.name}</p>
                        <p className="text-xs text-muted-foreground">{collab.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <input
                    type="email"
                    value={newCollaborator}
                    onChange={(e) => setNewCollaborator(e.target.value)}
                    placeholder="Add collaborator email"
                    className="flex-grow form-input text-sm"
                  />
                  <button
                    onClick={handleAddCollaborator}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    <UserPlus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-background/50 glassmorphism rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Details</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-muted-foreground">Template</h3>
                  <p className="capitalize">{template.replace('template', '')} Template</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Last Updated</h3>
                  <p>2 days ago</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Views</h3>
                  <p>128</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6">
            <ResumeComments />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeViewPage;