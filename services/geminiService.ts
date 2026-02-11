
import { GoogleGenAI, Type } from "@google/genai";
import { SiteTheme } from "../types";

export const generateSiteTheme = async (prompt: string): Promise<SiteTheme> => {
  // Use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Transform this landing page theme based on the user's vibe: "${prompt}". 
    Be creative, modern, and high-tech.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING, description: "A short, punchy hero headline." },
          subheadline: { type: Type.STRING, description: "A supporting subheadline." },
          primaryColor: { type: Type.STRING, description: "A hex code for the primary accent color." },
          secondaryColor: { type: Type.STRING, description: "A hex code for the secondary glow color." },
          vibe: { type: Type.STRING, description: "A one-word description of the visual style." }
        },
        required: ["headline", "subheadline", "primaryColor", "secondaryColor", "vibe"]
      }
    }
  });

  try {
    // response.text is a property, not a method.
    return JSON.parse(response.text || '{}') as SiteTheme;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return {
      headline: "The Future of 3D Web",
      subheadline: "Experience generative aesthetics driven by intelligence.",
      primaryColor: "#00f2ff",
      secondaryColor: "#7000ff",
      vibe: "Neon"
    };
  }
};
