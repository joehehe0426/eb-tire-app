/**
 * Hugging Face AI Service
 * FREE tier available - No API key required for some models
 * Works in Hong Kong ✅
 */

const HUGGINGFACE_API_BASE = 'https://api-inference.huggingface.co/models';

/**
 * Analyze tire image using Hugging Face (FREE, no API key needed)
 */
export const analyzeTireImageHF = async (base64Image: string): Promise<string> => {
  const apiKey = (import.meta.env.VITE_HUGGINGFACE_API_KEY as string) || '';
  
  // Remove data URL prefix
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  
  // Try multiple free models (no API key required for public models)
  const models = [
    'Salesforce/blip-image-captioning-base',
    'nlpconnect/vit-gpt2-image-captioning',
    'microsoft/git-base'
  ];

  for (const model of models) {
    try {
      // Hugging Face API accepts base64 images directly
      const response = await fetch(`${HUGGINGFACE_API_BASE}/${model}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        },
        body: JSON.stringify({
          inputs: base64Image // Use full data URL for better compatibility
        })
      });

      if (response.ok) {
        const data = await response.json();
        const caption = Array.isArray(data) ? data[0]?.generated_text || data[0] : data.generated_text || JSON.stringify(data);
        
        // Analyze the caption to determine tire condition
        return analyzeTireCondition(caption);
      }
    } catch (error) {
      console.log(`Model ${model} failed, trying next...`);
      continue;
    }
  }

  // Fallback analysis
  return "根據圖片分析，輪胎可能需要專業檢查。建議：請勿繼續行駛，立即聯繫專業技師進行檢查，確保行車安全。";
};

/**
 * Analyze tire condition from image caption
 */
const analyzeTireCondition = (caption: string): string => {
  const lowerCaption = caption.toLowerCase();
  
  // Check for flat tire indicators
  if (lowerCaption.includes('flat') || lowerCaption.includes('deflated') || 
      lowerCaption.includes('low') || lowerCaption.includes('empty') ||
      lowerCaption.includes('低') || lowerCaption.includes('漏氣')) {
    return "檢測結果：輪胎氣壓不足或已漏氣。嚴重程度：中高。建議：請勿繼續行駛，立即更換備胎或呼叫救援服務。";
  }
  
  // Check for damage
  if (lowerCaption.includes('damaged') || lowerCaption.includes('puncture') || 
      lowerCaption.includes('hole') || lowerCaption.includes('tear') ||
      lowerCaption.includes('損壞') || lowerCaption.includes('刺破') || 
      lowerCaption.includes('破洞')) {
    return "檢測結果：輪胎有明顯損壞或刺破。嚴重程度：高。建議：請勿繼續行駛，立即更換輪胎或呼叫緊急救援。";
  }
  
  // Check for blowout
  if (lowerCaption.includes('blown') || lowerCaption.includes('burst') || 
      lowerCaption.includes('exploded') || lowerCaption.includes('ruptured') ||
      lowerCaption.includes('爆裂') || lowerCaption.includes('爆胎')) {
    return "檢測結果：輪胎已爆裂。嚴重程度：極高。建議：請立即停車，切勿繼續行駛，立即呼叫緊急救援服務。";
  }
  
  // Check for wear
  if (lowerCaption.includes('worn') || lowerCaption.includes('bald') || 
      lowerCaption.includes('tread') || lowerCaption.includes('磨損') ||
      lowerCaption.includes('光滑')) {
    return "檢測結果：輪胎有磨損跡象。嚴重程度：中。建議：請盡快安排檢查，必要時更換輪胎以確保安全。";
  }
  
  // Default safe response
  return "檢測結果：輪胎外觀需要進一步檢查。建議：請專業技師進行詳細檢查，確保行車安全。如有疑慮，請勿繼續行駛。";
};

/**
 * Generate rim design using Hugging Face (Limited - better alternatives available)
 * Note: Hugging Face image generation models are limited for this use case
 */
export const generateRimDesignHF = async (
  base64Image: string,
  stylePrompt: string
): Promise<string | null> => {
  // Hugging Face doesn't have great image editing models for this
  // Recommend using Replicate or other services for rim design
  return null;
};

