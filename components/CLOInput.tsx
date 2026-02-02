
import React from 'react';

interface CLOInputProps {
  clo: string;
  setClo: (clo: string) => void;
}

export const CLOInput: React.FC<CLOInputProps> = ({ clo, setClo }) => {
  return (
    <div>
      <label htmlFor="clo-input" className="block text-lg font-medium text-slate-700 mb-2">
        2. Enter Course Learning Outcome (CLO)
      </label>
      <textarea
        id="clo-input"
        rows={4}
        className="w-full p-3 border-2 border-slate-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-all duration-300"
        placeholder="e.g., 'Illustrate different types of derivatives such as forward contracts, future contracts, swaps and options.'"
        value={clo}
        onChange={(e) => setClo(e.target.value)}
      />
    </div>
  );
};