
export type Year = 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4';
export type Plo = 'PLO1' | 'PLO2' | 'PLO3' | 'PLO4' | 'PLO5' | 'PLO6';

export enum Domain {
  Cognitive = 'Cognitive',
  Affective = 'Affective',
  Psychomotor = 'Psychomotor'
}

export interface SoftSkillSuggestion {
  category: string;
  code: string;
  description: string;
  justification: string;
  isCompliant: boolean;
  complianceFeedback: string;
}

export interface PloAnalysisResult {
    code: Plo;
    isAligned: boolean;
    justification: string;
}

export interface BestPloSuggestion {
    suggestedPlo: Plo;
    justification: string;
}

export interface SuggestedClo {
  clo: string;
  justification: string;
}


export interface AnalysisResult {
  identifiedVerbs: string[];
  identifiedDomain: Domain;
  identifiedLevel: { code: string; name: string };
  isCompliant: boolean;
  feedback: string;
  suggestions: string;
  softSkillsSuggestions: SoftSkillSuggestion[];
  ploAnalysis: PloAnalysisResult[];
  bestPloSuggestion: BestPloSuggestion[];
  suggestedClos: SuggestedClo[];
}

export interface BloomLevel {
  code: string;
  name: string;
  verbs: string[];
}

export interface DomainData {
  [key: string]: BloomLevel[];
}

export interface PloData {
  code: Plo;
  outcome: string;
  domain: string;
}