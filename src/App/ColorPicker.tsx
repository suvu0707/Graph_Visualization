// ColorPicker.tsx
import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  selectedColor?: string; 
  onColorChange: (color: { hex: string }) => void; 
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const [color, setColor] = useState<string>(selectedColor || "#000");

  const handleColorChange = (col: ColorResult) => {
    setColor(col.hex);
    onColorChange({ hex: col.hex });  // Call the callback with the selected color
  };

  return (
    <div>
      <SketchPicker color={color} onChangeComplete={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
