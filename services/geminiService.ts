import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, Year } from '../types';
import { BLOOM_TAXONOMY_DATA, SOFT_SKILLS_DATA, PLO_DATA, SOFT_SKILL_PROGRESSION } from '../constants';

export async function analyzeCLO(clo: string, year: Year, targetPlos: string): Promise<AnalysisResult> {
  // Menggunakan VITE_ prefix untuk membolehkan browser membaca key ini
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key tidak dijumpai. Sila pastikan VITE_GEMINI_API_KEY telah di-set di Vercel.");
  }

  const genAI = new GoogleGenAI(apiKey);

  const prompt = `
    You are an expert in curriculum design based on MQF 2nd Edition.
    Analyze the following CLO: "${clo}" for Year: "${year}" against Target PLOs: "${targetPlos}".
    
    Data Context:
    - PLOs: ${JSON.stringify(PLO_DATA)}
    - Bloom: ${JSON.stringify(BLOOM_TAXONOMY_DATA)}
    - Soft Skills: ${JSON.stringify(SOFT_SKILLS_DATA)}

    Return a JSON object with all required analysis fields.
  `;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text()) as AnalysisResult;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(`Gagal: ${error.message}`);
  }
}
