import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Year, Domain, Plo } from '../types';
import { YEAR_PROGRESSION, BLOOM_TAXONOMY_DATA, SOFT_SKILLS_DATA, PLO_DATA, SOFT_SKILL_PROGRESSION } from '../constants';

export async function analyzeCLO(clo: string, year: Year, targetPlos: string): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert in curriculum design based on MQF 2nd Edition Bloom Taxonomy, Soft Skills, and Programme Learning Outcome (PLO) Mapping for undergraduate studies.
    Your task is to provide a comprehensive analysis of a given Course Learning Outcome (CLO).

    **Guidelines & Data:**

    1.  **Programme Learning Outcomes (PLOs):**
        ${JSON.stringify(PLO_DATA)}

    2.  **Bloom's Taxonomy Rules (Undergraduate Level):**
        a. **Year Progression:**
           - Year 1: Cognitive(C1, C2), Affective(A1, A2), Psychomotor(P1, P2)
           - Year 2: Cognitive(C2, C3), Affective(A2, A3), Psychomotor(P2, P3)
           - Year 3: Cognitive(C3, C4), Affective(A2, A3), Psychomotor(P3, P4)
           - Year 4: Cognitive(C3, C4), Affective(A3), Psychomotor(P4)
        b. **Key Clarifications (Overall UG Ceilings):**
           - **Cognitive (C):** UG ceiling = C4 (Analysis). CLOs should not claim C5-C6.
           - **Affective (A):** UG ceiling = A3 (Valuing). Students should consistently demonstrate values but not full internalization (A4-A5).
           - **Psychomotor (P):** UG ceiling = P4 (Mechanism). Skills should be performed confidently and consistently, but not yet at adaptation/origination (P5-P7).
        c. **Compliance Check:** When analyzing the CLO, you must check that the identified Bloom's level is compliant with **both** the specific year progression and the overall UG ceiling.

    3.  **Bloom's Taxonomy Verbs:**
        - Cognitive Domain: ${JSON.stringify(BLOOM_TAXONOMY_DATA[Domain.Cognitive])}
        - Affective Domain: ${JSON.stringify(BLOOM_TAXONOMY_DATA[Domain.Affective])}
        - Psychomotor Domain: ${JSON.stringify(BLOOM_TAXONOMY_DATA[Domain.Psychomotor])}

    4.  **Soft Skill Progression Guidelines:**
        This table dictates the allowed soft skill codes for each year. A skill is only compliant if its code is listed for the specified year.
        ${JSON.stringify(SOFT_SKILL_PROGRESSION)}

    5.  **Specific Soft Skill Details:**
        ${JSON.stringify(SOFT_SKILLS_DATA)}

    **Analysis Request:**

    -   **CLO to Analyze:** "${clo}"
    -   **Target PLO(s) for Mapping:** "${targetPlos}"
    -   **Year of Study:** "${year}"

    **Instructions:**
    Perform a multi-faceted analysis and return a single JSON object.

    1.  **Bloom's Taxonomy Analysis:**
        a. Identify the action verb(s) in the CLO.
        b. Determine the primary Bloom's Taxonomy domain and the specific level (e.g., C1, A2, P3).
        c. Check if the identified level is compliant with the allowed levels for the given year of study and the overall UG ceilings.
        d. Provide clear feedback on compliance and a general suggestion for improvement if needed.

    2.  **PLO Alignment Analysis:**
        a. For **each** of the Target PLO(s) provided (${targetPlos}), evaluate if the CLO is a logical and direct sub-component.
        b. Return an array of analysis objects, one for each target PLO, stating if it is aligned and providing a concise justification.

    3.  **Best Fit PLO Suggestion:**
        a. Independently of the target PLO(s), analyze the CLO against the **entire list** of available PLOs.
        b. Identify the top 2 to 3 most relevant PLOs that the CLO aligns with. It is important to suggest at least 2 and at most 3.
        c. For each suggested PLO, provide a justification for why it is a good fit.

    4.  **Soft Skill Analysis & Validation:**
        a. Based on the CLO, suggest one or two most relevant **specific** soft skills from the detailed list.
        b. For each suggested soft skill, validate its code (e.g., CS1, LL2) against the **Soft Skill Progression Guidelines** for the given year of study.
        c. For each suggestion, provide:
           i. The category, code, and description.
           ii. A justification for why the skill is relevant to the CLO.
           iii. A boolean 'isCompliant' field. A skill is compliant only if its code is present in the allowed list for that category and year.
           iv. 'complianceFeedback' explaining the compliance status (e.g., "Compliant. LL2 is an expected skill for Year 2." or "Not compliant. For Year 2, the expected skill is LL2, not LL1.").

    5.  **CLO Revision Suggestions:**
        a. Based on the entire analysis (especially the Bloom's Taxonomy compliance check), generate 2-3 revised versions of the original CLO.
        b. Each revision must be a high-impact, measurable undergraduate course learning outcome.
        c. Ensure each revision uses a clear action verb that aligns with the appropriate Bloom's Taxonomy level for the selected year of study.
        d. If the original CLO was non-compliant, the revisions must correct the issue.
        e. For each suggested CLO, provide a brief justification explaining why it is an improvement (e.g., "Uses a more precise verb 'Analyze' (C4) which is appropriate for Year 3 and is more measurable.").

    Return the complete analysis in a JSON object with the specified schema.
    `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      identifiedVerbs: { type: Type.ARRAY, items: { type: Type.STRING } },
      identifiedDomain: { type: Type.STRING, description: `The identified Bloom's Taxonomy domain. Must be one of 'Cognitive', 'Affective', or 'Psychomotor'.` },
      identifiedLevel: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING },
          name: { type: Type.STRING },
        },
      },
      isCompliant: { type: Type.BOOLEAN },
      feedback: { type: Type.STRING },
      suggestions: { type: Type.STRING },
      ploAnalysis: {
        type: Type.ARRAY,
        description: "Analysis for each of the user-provided target PLOs.",
        items: {
            type: Type.OBJECT,
            properties: {
                code: { type: Type.STRING, description: "The PLO code being analyzed, e.g., 'PLO1'." },
                isAligned: { type: Type.BOOLEAN },
                justification: { type: Type.STRING }
            },
            required: ['code', 'isAligned', 'justification']
        }
      },
      bestPloSuggestion: {
        type: Type.ARRAY,
        description: "A list of the top 2 to 3 best-fitting PLOs from the entire list.",
        items: {
            type: Type.OBJECT,
            properties: {
                suggestedPlo: { type: Type.STRING, description: "The suggested PLO code, e.g., 'PLO2'." },
                justification: { type: Type.STRING }
            },
            required: ['suggestedPlo', 'justification']
        }
      },
      softSkillsSuggestions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            code: { type: Type.STRING },
            description: { type: Type.STRING },
            justification: { type: Type.STRING },
            isCompliant: { type: Type.BOOLEAN },
            complianceFeedback: { type: Type.STRING },
          },
          required: ['category', 'code', 'description', 'justification', 'isCompliant', 'complianceFeedback']
        }
      },
      suggestedClos: {
        type: Type.ARRAY,
        description: "A list of 2-3 revised, high-impact CLOs with justifications.",
        items: {
          type: Type.OBJECT,
          properties: {
            clo: { type: Type.STRING },
            justification: { type: Type.STRING }
          },
          required: ['clo', 'justification']
        }
      }
    },
    required: ['identifiedVerbs', 'identifiedDomain', 'identifiedLevel', 'isCompliant', 'feedback', 'suggestions', 'softSkillsSuggestions', 'ploAnalysis', 'bestPloSuggestion', 'suggestedClos'],
  };

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema,
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
}