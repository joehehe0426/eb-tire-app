import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRimDesign = async (base64Image: string, stylePrompt: string): Promise<string | null> => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const mimeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Update the car wheel rims in this image to match the style: "${stylePrompt}". Maintain the original car angle, lighting, perspective, and background. High quality, photorealistic, 8k resolution.`,
          },
        ],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Gemini Rim Design Error:", error);
    return null;
  }
};