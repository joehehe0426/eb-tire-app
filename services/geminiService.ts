import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTireImage = async (base64Image: string): Promise<string> => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const mimeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    const prompt = `
      You are an expert mechanic assistant. 
      Analyze this image of a car tire.
      1. Identify if the tire is flat, damaged, or completely blown out.
      2. Estimate the severity (Low/Medium/High).
      3. Give a 1-sentence advice to the driver (e.g., "Do not drive," "Safe to inflate temporarily").
      
      Respond in Traditional Chinese (Cantonese style if appropriate for Hong Kong context).
      Keep it short and concise (under 50 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          { text: prompt }
        ]
      }
    });

    return response.text || "無法分析圖片，請稍後再試。";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "AI 分析暫時不可用。";
  }
};