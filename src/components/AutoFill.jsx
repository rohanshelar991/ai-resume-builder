import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { Upload, FileJson, Linkedin, Download, User } from "lucide-react";

const AutoFill = () => {
  const { importFromJSON, importFromLinkedIn, exportToJSON, loading } = useContext(ResumeContext);
  const [importMethod, setImportMethod] = useState("json");
  const [jsonInput, setJsonInput] = useState("");
  const [linkedInData, setLinkedInData] = useState({
    name: "",
    headline: "",
    email: "",
    phone: "",
    skills: "",
  });
  const [importResult, setImportResult] = useState(null);

  const handleJSONImport = () => {
    const result = importFromJSON(jsonInput);
    setImportResult(result);
    setTimeout(() => setImportResult(null), 3000);
  };

  const handleLinkedInImport = () => {
    // Convert skills string to array
    const skillsArray = linkedInData.skills.split(",").map(skill => skill.trim());
    
    const profileData = {
      name: linkedInData.name,
      headline: linkedInData.headline,
      email: linkedInData.email,
      phone: linkedInData.phone,
      skills: skillsArray,
    };
    
    importFromLinkedIn(profileData).then(result => {
      setImportResult(result);
      setTimeout(() => setImportResult(null), 3000);
    });
  };

  const handleJSONExport = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-background/20 space-y-6 form-card">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <User size={24} className="text-blue-500" /> Auto-Fill Options
      </h3>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setImportMethod("json")}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
            importMethod === "json" ? "bg-primary/20" : "hover:bg-accent"
          }`}
        >
          <FileJson size={20} />
          <span className="text-xs">JSON</span>
        </button>
        <button
          onClick={() => setImportMethod("linkedin")}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
            importMethod === "linkedin" ? "bg-primary/20" : "hover:bg-accent"
          }`}
        >
          <Linkedin size={20} />
          <span className="text-xs">LinkedIn</span>
        </button>
        <button
          onClick={handleJSONExport}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
        >
          <Download size={20} />
          <span className="text-xs">Export</span>
        </button>
      </div>

      {importMethod === "json" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Paste your resume JSON data below
          </p>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{ "personalInfo": { "name": "John Doe", "email": "john@example.com" }, ... }'
            className="w-full form-input h-32 text-sm resize-none"
          />
          <button
            onClick={handleJSONImport}
            disabled={loading || !jsonInput}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Upload size={16} />
            )}
            Import from JSON
          </button>
        </div>
      )}

      {importMethod === "linkedin" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter your LinkedIn profile information
          </p>
          <input
            type="text"
            value={linkedInData.name}
            onChange={(e) => setLinkedInData({...linkedInData, name: e.target.value})}
            placeholder="Full Name"
            className="w-full form-input text-sm"
          />
          <input
            type="text"
            value={linkedInData.headline}
            onChange={(e) => setLinkedInData({...linkedInData, headline: e.target.value})}
            placeholder="Headline/Title"
            className="w-full form-input text-sm"
          />
          <input
            type="email"
            value={linkedInData.email}
            onChange={(e) => setLinkedInData({...linkedInData, email: e.target.value})}
            placeholder="Email"
            className="w-full form-input text-sm"
          />
          <input
            type="text"
            value={linkedInData.phone}
            onChange={(e) => setLinkedInData({...linkedInData, phone: e.target.value})}
            placeholder="Phone Number"
            className="w-full form-input text-sm"
          />
          <textarea
            value={linkedInData.skills}
            onChange={(e) => setLinkedInData({...linkedInData, skills: e.target.value})}
            placeholder="Skills (comma separated)"
            className="w-full form-input h-24 text-sm resize-none"
          />
          <button
            onClick={handleLinkedInImport}
            disabled={loading || !linkedInData.name}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Linkedin size={16} />
            )}
            Import from LinkedIn
          </button>
        </div>
      )}

      {importResult && (
        <div className={`p-3 rounded-lg text-sm ${
          importResult.success 
            ? "bg-green-500/20 text-green-700 dark:text-green-300" 
            : "bg-red-500/20 text-red-700 dark:text-red-300"
        }`}>
          {importResult.success 
            ? "Resume data imported successfully!" 
            : `Import failed: ${importResult.error}`}
        </div>
      )}

      <div className="pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Auto-fill your resume by importing data from JSON files or LinkedIn profile information.
          Export your current resume data to JSON for backup or transfer.
        </p>
      </div>
    </div>
  );
};

export default AutoFill;