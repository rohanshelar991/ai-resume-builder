import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';

const colors = [
  '#38bdf8', // Sky
  '#fb7185', // Rose
  '#4ade80', // Green
  '#facc15', // Yellow
  '#c084fc', // Purple
  '#818cf8', // Indigo
];

const ColorSwitcher = () => {
  const { themeColor, setThemeColor } = useContext(ResumeContext);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-muted-foreground">Color:</p>
      <div className="flex items-center gap-1.5">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setThemeColor(color)}
            className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${themeColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''}`}
            style={{ backgroundColor: color }}
            aria-label={`Switch to ${color} theme`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSwitcher;
