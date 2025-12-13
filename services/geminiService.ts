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

export const generateMetadata = async (inputText: string, apiKey?: string): Promise<{ subtitle: string; tags: string[] }> => {
  try {
    // 优先使用用户提供的 Key (前端输入)，否则尝试读取环境变量 (构建注入)
    const key = apiKey || process.env.API_KEY;
    
    if (!key) {
        throw new Error("未配置 API Key。请点击左上角的设置(钥匙图标)按钮输入您的 Google Gemini API Key。");
    }

    const ai = new GoogleGenAI({ apiKey: key });
    
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
      model: 'gemini-3-pro-preview',
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