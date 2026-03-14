import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, Year } from '../types';
import { BLOOM_TAXONOMY_DATA, SOFT_SKILLS_DATA, PLO_DATA, SOFT_SKILL_PROGRESSION } from '../constants';

export async function analyzeCLO(clo: string, year: Year, targetPlos: string): Promise<AnalysisResult> {
  // 1. Membaca API Key yang dipetakan oleh vite.config.ts Prof
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === '') {
    console.error("API Key kosong atau tidak dijumpai.");
    throw new Error("Sistem belum bersedia. Sila pastikan GEMINI_API_KEY telah ditetapkan di Vercel.");
  }

  const genAI = new GoogleGenAI(apiKey);

  // 2. Penyediaan Prompt MQF
  const prompt = `
    You are an expert in curriculum design based on MQF 2nd Edition.
    Task: Analyze the following Course Learning Outcome (CLO) for an undergraduate program.

    **Reference Data:**
    - PLOs: ${JSON.stringify(PLO_DATA)}
    - Bloom Taxonomy: ${JSON.stringify(BLOOM_TAXONOMY_DATA)}
    - Soft Skills: ${JSON.stringify(SOFT_SKILLS_DATA)}
    - Year Progression: ${JSON.stringify(SOFT_SKILL_PROGRESSION)}

    **Input:**
    - CLO: "${clo}"
    - Target PLO(s): "${targetPlos}"
    - Year of Study: "${year}"

    **Requirement:**
    Return a single JSON object strictly following the AnalysisResult structure:
    identifiedVerbs (array), identifiedDomain, identifiedLevel (code & name), isCompliant (boolean), feedback, suggestions, ploAnalysis, bestPloSuggestion, softSkillsSuggestions, and suggestedClos.
  `;

  try {
    // 3. Memanggil Model Gemini 1.5 Flash (Paling Stabil)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 4. Memulangkan hasil dalam format JSON
    return JSON.parse(text) as AnalysisResult;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(`Gagal menganalisis CLO: ${error.message || "Sila cuba sebentar lagi."}`);
  }
}
