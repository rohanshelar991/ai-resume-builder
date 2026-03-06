import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";
import Template10 from "./Template10";

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
  template5: Template5,
  template6: Template6,
  template7: Template7,
  template8: Template8,
  template9: Template9,
  template10: Template10,
};

const Preview = () => {
  const { resumeData, template, themeColor } = useContext(ResumeContext);

  const SelectedTemplate = templates[template];

  return (
    <div className="w-full h-full bg-white">
      {SelectedTemplate ? (
        <SelectedTemplate resumeData={resumeData} themeColor={themeColor} />
      ) : (
        <p>Select a template</p>
      )}
    </div>
  );
};

export default Preview;
