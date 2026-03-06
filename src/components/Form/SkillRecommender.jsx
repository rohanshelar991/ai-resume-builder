import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Lightbulb, Wrench, Plus } from "lucide-react";

const SkillRecommender = () => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const { skills } = resumeData;
  const [jobTitle, setJobTitle] = useState("");
  const [recommendedSkills, setRecommendedSkills] = useState([]);

  // Skill recommendations based on job titles
  const skillDatabase = {
    "frontend developer": [
      "HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", 
      "TypeScript", "Sass", "Tailwind CSS", "Webpack", "Git"
    ],
    "backend developer": [
      "Node.js", "Python", "Java", "SQL", "PostgreSQL", "MongoDB",
      "Docker", "AWS", "REST APIs", "Express", "Spring Boot"
    ],
    "full stack developer": [
      "JavaScript", "React", "Node.js", "HTML", "CSS", "SQL",
      "MongoDB", "Git", "REST APIs", "TypeScript", "Docker"
    ],
    "data scientist": [
      "Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn",
      "TensorFlow", "PyTorch", "Tableau", "Machine Learning", "Statistics"
    ],
    "ui/ux designer": [
      "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator",
      "User Research", "Wireframing", "Prototyping", "HTML", "CSS"
    ],
    "mobile developer": [
      "React Native", "Flutter", "iOS", "Android", "Swift", "Kotlin",
      "Firebase", "REST APIs", "Git", "JavaScript", "TypeScript"
    ]
  };

  const handleRecommendSkills = () => {
    if (jobTitle) {
      const normalizedTitle = jobTitle.toLowerCase();
      let matchedSkills = [];
      
      // Find matching skills
      for (const [title, skillList] of Object.entries(skillDatabase)) {
        if (normalizedTitle.includes(title.split(' ')[0]) || title.includes(normalizedTitle.split(' ')[0])) {
          matchedSkills = skillList;
          break;
        }
      }
      
      // If no match found, use a general set
      if (matchedSkills.length === 0) {
        matchedSkills = [
          "Communication", "Problem Solving", "Teamwork", "Leadership",
          "Time Management", "Adaptability", "Critical Thinking"
        ];
      }
      
      setRecommendedSkills(matchedSkills);
    }
  };

  const addSkill = (skill) => {
    const currentSkills = skills ? skills.split(',').map(s => s.trim()) : [];
    if (!currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill].join(', ');
      updateResumeData("skills", newSkills);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-border/50 bg-background/20 space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Lightbulb size={20} className="text-yellow-400" /> Skill Recommender
      </h3>
      <p className="text-sm text-muted-foreground">
        Enter your target job title to get recommended skills.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g., Frontend Developer"
          className="bg-background/50 border border-input rounded-lg px-4 py-3 text-base w-full"
        />
        <button
          onClick={handleRecommendSkills}
          className="flex items-center shrink-0 gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <Wrench size={16} />
          Recommend
        </button>
      </div>
      
      {recommendedSkills.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-base mb-2">Recommended Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {recommendedSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => addSkill(skill)}
                className="flex items-center gap-1 bg-secondary text-secondary-foreground py-1 px-3 rounded-full hover:bg-secondary/80 text-sm transition-colors"
              >
                <Plus size={14} />
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillRecommender;