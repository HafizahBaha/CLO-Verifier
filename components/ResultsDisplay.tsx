
import React from 'react';
import { AnalysisResult, Year } from '../types';
import { Badge } from './Badge';
import { YEAR_PROGRESSION } from '../constants';

interface ResultsDisplayProps {
  result: AnalysisResult;
  year: Year;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, year }) => {
  const { identifiedVerbs, identifiedDomain, identifiedLevel, isCompliant, feedback, suggestions, ploAnalysis, bestPloSuggestion, suggestedClos } = result;

  const getStatusIcon = (isSuccess: boolean) => {
    if (isSuccess) {
      return (
        <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    return (
      <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    );
  };

  const getComplianceStatusIcon = (isSuccess: boolean) => {
    if (isSuccess) {
        return (
            <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        );
    }
    return (
        <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
    );
  }

  const allowedLevels = YEAR_PROGRESSION[year];
  
  return (
    <div className="mt-8 p-6 bg-slate-100/70 rounded-3xl border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Analysis Result</h3>
      <div className="space-y-6">
        {/* Bloom's Taxonomy Compliance */}
        <div className={`flex items-center p-4 rounded-2xl ${isCompliant ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'} border-2`}>
          {getComplianceStatusIcon(isCompliant)}
          <div className="ml-4">
            <p className={`text-lg font-semibold ${isCompliant ? 'text-green-800' : 'text-amber-800'}`}>
              Bloom's Taxonomy: {isCompliant ? 'Compliant' : 'Needs Improvement'}
            </p>
            <p className={`text-sm ${isCompliant ? 'text-green-700' : 'text-amber-700'}`}>{feedback}</p>
          </div>
        </div>

        {/* PLO Alignment */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <h4 className="font-semibold text-slate-700 mb-4 text-lg">PLO Alignment Analysis</h4>
             <div className="space-y-3">
                {ploAnalysis.map(analysis => (
                    <div key={analysis.code} className={`flex items-start p-3 rounded-xl border ${analysis.isAligned ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                        {getStatusIcon(analysis.isAligned)}
                        <div className="ml-3">
                            <p className={`font-semibold ${analysis.isAligned ? 'text-green-800' : 'text-amber-800'}`}>
                                {analysis.code}: {analysis.isAligned ? 'Aligned' : 'Misaligned'}
                            </p>
                            <p className="text-sm text-slate-600">{analysis.justification}</p>
                        </div>
                    </div>
                ))}
             </div>
             {bestPloSuggestion && bestPloSuggestion.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                     <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <h5 className="font-semibold text-blue-800 ml-2">Best Fit Suggestions</h5>
                     </div>
                     <div className="mt-2 pl-8 space-y-3">
                        {bestPloSuggestion.map((suggestion, index) => (
                           <div key={index}>
                                <p className="font-semibold text-slate-800 font-mono">{suggestion.suggestedPlo}</p>
                                <p className="text-sm text-slate-600 mt-1">{suggestion.justification}</p>
                           </div>
                        ))}
                     </div>
                </div>
             )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-slate-700 mb-3">CLO Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Identified Verb(s):</span>
                <div className="flex flex-wrap gap-1 justify-end">
                    {identifiedVerbs.map(verb => <Badge key={verb} text={verb} color="blue" />)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Domain:</span>
                <Badge text={identifiedDomain} color="purple" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Level:</span>
                <Badge text={`${identifiedLevel.code}: ${identifiedLevel.name}`} color="gray" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-slate-700 mb-3">Guidelines for {year}</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-500">Cognitive:</span>
                    <span className="font-mono text-slate-800">{allowedLevels.Cognitive?.join(', ')}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500">Affective:</span>
                    <span className="font-mono text-slate-800">{allowedLevels.Affective?.join(', ')}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500">Psychomotor:</span>
                    <span className="font-mono text-slate-800">{allowedLevels.Psychomotor?.join(', ')}</span>
                </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
           <h4 className="font-semibold text-slate-700 mb-2">General Suggestions</h4>
           <p className="text-sm text-slate-600">{suggestions}</p>
        </div>

        {suggestedClos && suggestedClos.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h4 className="font-semibold text-slate-700">Suggested CLO Revisions</h4>
                </div>
                <div className="space-y-4">
                    {suggestedClos.map((suggestion, index) => (
                        <div key={index} className="p-4 rounded-xl border bg-slate-50 border-slate-200">
                            <blockquote className="border-l-4 border-blue-500 pl-4">
                                <p className="font-semibold text-slate-800">"{suggestion.clo}"</p>
                            </blockquote>
                            <p className="text-sm text-slate-600 mt-2 pl-1"><span className="font-semibold">Justification:</span> {suggestion.justification}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        {result.softSkillsSuggestions && result.softSkillsSuggestions.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h4 className="font-semibold text-slate-700">Soft Skill Analysis</h4>
                </div>
                <p className="text-xs text-slate-500 italic mb-4">Note: This is an automated suggestion and compliance check to aid in curriculum mapping.</p>
                <div className="space-y-4">
                    {result.softSkillsSuggestions.map((suggestion, index) => (
                        <div key={index} className={`p-4 rounded-xl border ${suggestion.isCompliant ? 'bg-white border-slate-200' : 'bg-amber-50 border-amber-200'}`}>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    {suggestion.isCompliant ? (
                                        <div className="bg-green-100 p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                                    ) : (
                                        <div className="bg-amber-100 p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
                                    )}
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold text-blue-800"><span className="font-bold">{suggestion.code}:</span> {suggestion.description}</p>
                                    <p className="text-sm text-slate-600 mt-2"><span className="font-semibold">Justification:</span> {suggestion.justification}</p>
                                    <p className={`text-sm font-medium mt-2 ${suggestion.isCompliant ? 'text-green-700' : 'text-amber-800'}`}>{suggestion.complianceFeedback}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};