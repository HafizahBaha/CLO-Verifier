
import React from 'react';
import { Year } from '../types';

interface YearSelectorProps {
  selectedYear: Year;
  onSelectYear: (year: Year) => void;
}

const years: Year[] = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];

export const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onSelectYear }) => {
  return (
    <div>
      <label htmlFor="year-select" className="block text-lg font-medium text-slate-700 mb-2">
        1. Select Year of Study
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className={`p-4 rounded-xl text-center font-semibold transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
              selectedYear === year
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};