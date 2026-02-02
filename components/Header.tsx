
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 md:px-8 max-w-4xl">
        <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">CLO Verifier</h1>
                <p className="text-sm md:text-md text-slate-500">Your Digital Auditor for MQF Compliance</p>
            </div>
        </div>
      </div>
    </header>
  );
};