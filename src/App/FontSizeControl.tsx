// FontSizeControl.tsx
import React, { useState } from 'react';

interface FontSizeControlProps {
  selectedFontSize?: number;  
  onFontSizeChange: (fontSize: number) => void; 
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({ selectedFontSize, onFontSizeChange }) => {
  const [fontSize, setFontSize] = useState<number>(selectedFontSize || 14);

  const handleFontSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setFontSize(newSize);
    onFontSizeChange(newSize);
  };

  return (
    <div>
      <label>Font Size:</label>
      <select value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value)}>
        {[12, 14, 16, 18, 20, 22, 24,32,48].map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSizeControl;
