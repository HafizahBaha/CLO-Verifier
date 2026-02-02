
import React from 'react';

interface TargetPloInputProps {
  targetPlos: string;
  setTargetPlos: (plos: string) => void;
}

export const TargetPloInput: React.FC<TargetPloInputProps> = ({ targetPlos, setTargetPlos }) => {
  return (
    <div>
      <label htmlFor="plo-input" className="block text-lg font-medium text-slate-700 mb-2">
        3. Enter Target Programme Outcome(s)
      </label>
      <input
        id="plo-input"
        type="text"
        className="w-full p-3 border-2 border-slate-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-all duration-300"
        placeholder="e.g., PLO1, PLO2, PLO3"
        value={targetPlos}
        onChange={(e) => setTargetPlos(e.target.value)}
      />
    </div>
  );
};