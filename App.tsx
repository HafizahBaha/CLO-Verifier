
import React, { useState, useCallback } from 'react';
import { Year, AnalysisResult } from './types';
import { Header } from './components/Header';
import { YearSelector } from './components/YearSelector';
import { TargetPloInput } from './components/TargetPloInput';
import { CLOInput } from './components/CLOInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeCLO } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [year, setYear] = useState<Year>('Year 1');
  const [targetPlos, setTargetPlos] = useState<string>('');
  const [clo, setClo] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!clo.trim()) {
      setError('Please enter a Course Learning Outcome.');
      return;
    }
    if (!targetPlos.trim()) {
      setError('Please enter at least one Target Programme Outcome.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeCLO(clo, year, targetPlos);
      setAnalysisResult(result);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [clo, year, targetPlos]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-200 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Verification Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
                <li>Select the year of study for the course.</li>
                <li>Enter the Course Learning Outcome (CLO).</li>
                <li>Enter the target Programme Learning Outcome(s) (PLOs) the CLO is mapped to.</li>
                <li>Click "Analyze CLO" to get instant feedback based on MQF guidelines.</li>
            </ol>
          </div>

          <div className="space-y-6">
            <YearSelector selectedYear={year} onSelectYear={setYear} />
            <CLOInput clo={clo} setClo={setClo} />
            <TargetPloInput targetPlos={targetPlos} setTargetPlos={setTargetPlos} />
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !clo.trim() || !targetPlos.trim()}
              className="flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="h-5 w-5" color="text-white" />
                  <span className="ml-2">Analyzing...</span>
                </>
              ) : (
                'Analyze CLO'
              )}
            </button>
          </div>


          {error && <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">{error}</div>}

          {isLoading && <LoadingSpinner />}
          
          {analysisResult && !isLoading && <ResultsDisplay result={analysisResult} year={year} />}
        </div>
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>&copy; 2026 Hafizah Bahaludin. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;