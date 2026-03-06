import React from "react";
import { Link } from "react-router-dom";

const templates = [
  { id: "template1", name: "Classic", desc: "Balanced and ATS-friendly." },
  { id: "template2", name: "Modern", desc: "Clean, crisp, and professional." },
  { id: "template3", name: "Creative", desc: "Color-forward with bold sections." },
  { id: "template4", name: "Minimalist", desc: "Minimal typography for clarity." },
  { id: "template5", name: "Professional", desc: "Corporate-ready layout." },
  { id: "template6", name: "Contemporary", desc: "Elegant and flexible." },
  { id: "template7", name: "Tech", desc: "High-signal layout for engineers." },
  { id: "template8", name: "Corporate", desc: "Executive-ready presentation." },
  { id: "template9", name: "Editorial", desc: "Classic serif editorial style." },
  { id: "template10", name: "Accent", desc: "Strong accent and modern blocks." },
];

const TemplatesPage = () => {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Resume Templates</h1>
            <p className="text-muted-foreground mt-2">
              Pick a layout that matches your role, then customize instantly.
            </p>
          </div>
          <Link
            to="/builder"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            Start Building
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="form-card space-y-3">
              <div className="h-40 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-border" />
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.desc}</p>
              </div>
              <Link
                to="/builder"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600"
              >
                Use this template →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
