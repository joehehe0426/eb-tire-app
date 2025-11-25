/**
 * Multi-provider AI service
 * Supports multiple AI backends that work in Hong Kong
 * Falls back to alternatives if primary provider fails
 */

export type AIProvider = 'huggingface' | 'openai' | 'replicate' | 'deepseek' | 'gemini';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
}

// Get active provider from environment or default
const getActiveProvider = (): AIProvider => {
  // Vite exposes env vars via import.meta.env
  const provider = (import.meta.env.VITE_AI_PROVIDER as string) || 'huggingface';
  return provider as AIProvider;
};

/**
 * Analyze tire image - works with multiple AI providers
 */
export const analyzeTireImage = async (base64Image: string): Promise<string> => {
  const provider = getActiveProvider();
  
  try {
    switch (provider) {
      case 'huggingface':
        return await analyzeWithHuggingFace(base64Image);
      case 'openai':
        return await analyzeWithOpenAI(base64Image);
      case 'replicate':
        return await analyzeWithReplicate(base64Image);
      case 'deepseek':
        return await analyzeWithDeepSeek(base64Image);
      case 'gemini':
        return await analyzeWithGemini(base64Image);
      default:
        return await analyzeWithHuggingFace(base64Image);
    }
  } catch (error) {
    console.error(`[${provider}] Analysis failed, trying fallback:`, error);
    // Fallback to Hugging Face (free, no API key needed for some models)
    if (provider !== 'huggingface') {
      try {
        return await analyzeWithHuggingFace(base64Image);
      } catch (fallbackError) {
        return "AI 分析暫時不可用，請稍後再試或直接聯繫客服。";
      }
    }
    return "AI 分析暫時不可用，請稍後再試或直接聯繫客服。";
  }
};

/**
 * Generate rim design - works with multiple AI providers
 */
export const generateRimDesign = async (
  base64Image: string,
  stylePrompt: string
): Promise<string | null> => {
  const provider = getActiveProvider();
  
  try {
    switch (provider) {
      case 'replicate':
        return await generateWithReplicate(base64Image, stylePrompt);
      case 'huggingface':
        return await generateWithHuggingFace(base64Image, stylePrompt);
      case 'openai':
        return await generateWithOpenAI(base64Image, stylePrompt);
      default:
        return await generateWithReplicate(base64Image, stylePrompt);
    }
  } catch (error) {
    console.error(`[${provider}] Generation failed:`, error);
    return null;
  }
};

// ==================== Hugging Face (FREE, No API Key Required) ====================

const analyzeWithHuggingFace = async (base64Image: string): Promise<string> => {
  // Use the dedicated Hugging Face service
  const { analyzeTireImageHF } = await import('./huggingFaceService');
  return await analyzeTireImageHF(base64Image);
};

const generateWithHuggingFace = async (
  base64Image: string,
  stylePrompt: string
): Promise<string | null> => {
  // Hugging Face has image editing models, but they're more limited
  // For rim design, Replicate or other services work better
  return null;
};

// ==================== Replicate (FREE TIER AVAILABLE) ====================

const analyzeWithReplicate = async (base64Image: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY as string;
  if (!apiKey) {
    throw new Error('Replicate API key not configured');
  }

  // Convert base64 to URL or use Replicate's image input
  const imageUrl = base64Image; // Replicate accepts data URLs
  
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'your-vision-model-version', // You'd need to find a vision model
        input: {
          image: imageUrl,
          prompt: 'Analyze this tire condition in Traditional Chinese'
        }
      })
    });

    const data = await response.json();
    return data.output || "無法分析圖片，請稍後再試。";
  } catch (error) {
    throw error;
  }
};

const generateWithReplicate = async (
  base64Image: string,
  stylePrompt: string
): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY as string;
  if (!apiKey) {
    throw new Error('Replicate API key not configured');
  }

  try {
    // Using image editing model (e.g., InstructPix2Pix or similar)
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'tstramer/instruct-pix2pix:latest', // Example model
        input: {
          image: base64Image,
          prompt: `Change the car wheel rims to ${stylePrompt} style. Maintain original car angle, lighting, and background.`
        }
      })
    });

    const data = await response.json();
    
    // Replicate is async, poll for result
    if (data.urls && data.urls.get) {
      const result = await pollReplicateResult(data.urls.get, apiKey);
      return result;
    }
    
    return null;
  } catch (error) {
    console.error('Replicate generation error:', error);
    return null;
  }
};

const pollReplicateResult = async (url: string, apiKey: string): Promise<string | null> => {
  for (let i = 0; i < 30; i++) {
    const response = await fetch(url, {
      headers: { 'Authorization': `Token ${apiKey}` }
    });
    const data = await response.json();
    
    if (data.status === 'succeeded' && data.output) {
      return Array.isArray(data.output) ? data.output[0] : data.output;
    }
    
    if (data.status === 'failed') {
      return null;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return null;
};

// ==================== OpenAI (Has Free Tier) ====================

const analyzeWithOpenAI = async (base64Image: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '你是一位專業的汽車技師。請分析這張輪胎照片：1. 判斷輪胎是否漏氣、損壞或爆裂。2. 評估嚴重程度（低/中/高）。3. 給駕駛者一句建議（例如：「請勿繼續行駛」或「可暫時充氣」）。請用繁體中文回答，簡潔扼要（50字以內）。'
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || "無法分析圖片，請稍後再試。";
  } catch (error) {
    throw error;
  }
};

const generateWithOpenAI = async (
  base64Image: string,
  stylePrompt: string
): Promise<string | null> => {
  // OpenAI DALL-E doesn't do image editing well, use Replicate instead
  return null;
};

// ==================== DeepSeek (Works in HK) ====================

const analyzeWithDeepSeek = async (base64Image: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY as string;
  if (!apiKey) {
    throw new Error('DeepSeek API key not configured');
  }

  // DeepSeek primarily does text, but can analyze image descriptions
  // You'd need to convert image to description first or use their vision API if available
  return "DeepSeek 分析功能開發中，請使用其他 AI 服務。";
};

// ==================== Gemini (Original) ====================

const analyzeWithGemini = async (base64Image: string): Promise<string> => {
  // Keep original Gemini implementation as fallback
  try {
    const { analyzeTireImage } = await import('./geminiService');
    return await analyzeTireImage(base64Image);
  } catch (error) {
    throw error;
  }
};

