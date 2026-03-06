import React, { useState, useContext } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeContext } from "../../context/ResumeContext";
import PDFDocument from "../Preview/PDFDocument";
import { Download, Check, Loader, FileType } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";

const DownloadButton = () => {
  const { resumeData, template, themeColor } = useContext(ResumeContext);
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500); // Reset after animation
    }, 2000); // Simulate PDF generation time
  };

  const handleDocxDownload = async () => {
    const { Document, Packer, Paragraph, TextRun } = await import("docx");
    const { personalInfo, education, workExperience, projects, skills, certifications, languages } = resumeData;

    const section = (title, lines) => [
      new Paragraph({ text: title, heading: "Heading2" }),
      ...lines.map((line) => new Paragraph({ children: [new TextRun(line)] })),
      new Paragraph(""),
    ];

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: personalInfo.name || "Your Name", bold: true, size: 32 }),
              ],
            }),
            new Paragraph({ text: personalInfo.title || "Your Title" }),
            new Paragraph({ text: personalInfo.summary || "" }),
            new Paragraph(""),
            ...section(
              "Work Experience",
              workExperience?.map((work) => `${work.role} | ${work.company} | ${work.duration}\n${work.description || ""}`) || [],
            ),
            ...section(
              "Projects",
              projects?.map((proj) => `${proj.name} | ${proj.stack}\n${proj.description || ""}`) || [],
            ),
            ...section(
              "Education",
              education?.map((edu) => `${edu.school} | ${edu.degree} | ${edu.year}`) || [],
            ),
            ...section(
              "Skills",
              skills ? [skills] : [],
            ),
            ...section(
              "Certifications",
              certifications?.map((cert) => `${cert.name} | ${cert.issuer} | ${cert.year}`) || [],
            ),
            ...section(
              "Languages",
              languages?.map((lang) => `${lang.name} | ${lang.level}`) || [],
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(personalInfo.name || "resume").replace(/\s+/g, "_").toLowerCase()}_resume.docx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-green-500 font-bold">
        <Player
          autoplay
          keepLastFrame
          src="https://lottie.host/b2d39647-18e3-48a2-86d0-3b8a1033360b/3Ua4y2jQ5i.json"
          style={{ height: "60px", width: "60px" }}
        />
        <span>Downloaded!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <PDFDownloadLink
        document={<PDFDocument resumeData={resumeData} themeColor={themeColor} />}
        fileName={`${(resumeData.personalInfo.name || "resume").replace(/\s+/g, "_").toLowerCase()}_resume.pdf`}
        onClick={handleDownload}
        className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {({ loading }) =>
          loading || downloading ? (
            <>
              <Loader className="animate-spin" size={18} />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download PDF</span>
            </>
          )
        }
      </PDFDownloadLink>
      <button
        onClick={handleDocxDownload}
        className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        <FileType size={18} />
        <span>Download DOCX</span>
      </button>
    </div>
  );
};

export default DownloadButton;
