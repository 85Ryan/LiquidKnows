
import { GoogleGenAI, Type, Schema } from "@google/genai";

const METADATA_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    subtitle: { type: Type.STRING, description: "A compelling subtitle (MAX 30 chars). NO ending punctuation (like periods) allowed unless it is a question mark." },
    tags: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Exactly 3 short, high-impact keywords related to the content." 
    },
  },
  required: ["subtitle", "tags"],
};

export const generateMetadata = async (inputText: string): Promise<{ subtitle: string; tags: string[] }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Limit input length to ensure efficiency
    const truncatedText = inputText.length > 8000 ? inputText.substring(0, 8000) + "..." : inputText;

    const prompt = `
      Analyze the provided text and generate a subtitle and tags for a knowledge card cover.
      
      Requirements:
      1. **Subtitle**: Generate a concise, engaging subtitle (MAXIMUM 30 Chinese characters). Do NOT add a period or any punctuation at the end, unless it is a question mark.
      2. **Tags**: Generate exactly 3 relevant keywords.
      
      IMPORTANT: The output MUST be in CHINESE (Simplified).
      
      Input Text:
      ${truncatedText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: METADATA_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as { subtitle: string; tags: string[] };
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw error;
  }
};
