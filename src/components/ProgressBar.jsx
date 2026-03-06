import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ currentStep, totalSteps, stepNames, onStepClick }) => {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full px-2 pb-4">
      <div className="relative h-2.5 w-full bg-secondary rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
      <div className="flex justify-between mt-3 text-sm text-muted-foreground">
        {stepNames.map((name, index) => (
          <button
            key={index}
            onClick={() => onStepClick(index)}
            className={`text-center w-1/${totalSteps} ${index <= currentStep ? "font-semibold text-primary" : ""} transition-colors hover:text-primary`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
