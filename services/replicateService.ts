/**
 * Replicate AI Service
 * FREE tier available with $10 credit
 * Works in Hong Kong ✅
 * Best for image generation/editing
 */

const REPLICATE_API_BASE = 'https://api.replicate.com/v1';

/**
 * Analyze tire image using Replicate
 */
export const analyzeTireImageReplicate = async (base64Image: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY as string;
  if (!apiKey) {
    throw new Error('Replicate API key not configured. Get one at replicate.com');
  }

  try {
    // Use a vision model available on Replicate
    // Note: You'll need to find a suitable vision model for tire analysis
    const response = await fetch(`${REPLICATE_API_BASE}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'your-vision-model-id', // Replace with actual model
        input: {
          image: base64Image,
          prompt: 'Analyze this car tire condition in Traditional Chinese. Identify if flat, damaged, or blown out. Estimate severity.'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Replicate API error');
    }

    const data = await response.json();
    
    // Poll for result (Replicate is async)
    if (data.urls && data.urls.get) {
      const result = await pollReplicateResult(data.urls.get, apiKey);
      return result || "無法分析圖片，請稍後再試。";
    }
    
    return "無法分析圖片，請稍後再試。";
  } catch (error) {
    console.error('Replicate analysis error:', error);
    throw error;
  }
};

/**
 * Generate rim design using Replicate (BEST OPTION for image editing)
 */
export const generateRimDesignReplicate = async (
  base64Image: string,
  stylePrompt: string
): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY as string;
  if (!apiKey) {
    throw new Error('Replicate API key not configured. Get one at replicate.com');
  }

  try {
    // Using InstructPix2Pix or similar image editing model
    const response = await fetch(`${REPLICATE_API_BASE}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'tstramer/instruct-pix2pix:latest', // Image editing model
        input: {
          image: base64Image,
          prompt: `Change the car wheel rims to ${stylePrompt} style. Maintain the original car angle, lighting, perspective, and background. High quality, photorealistic.`
        }
      })
    });

    if (!response.ok) {
      throw new Error('Replicate API error');
    }

    const data = await response.json();
    
    // Poll for result
    if (data.urls && data.urls.get) {
      const result = await pollReplicateResult(data.urls.get, apiKey);
      if (result && typeof result === 'string') {
        return result.startsWith('data:') ? result : `data:image/png;base64,${result}`;
      }
      return result;
    }
    
    return null;
  } catch (error) {
    console.error('Replicate generation error:', error);
    return null;
  }
};

/**
 * Poll Replicate API for async prediction results
 */
const pollReplicateResult = async (url: string, apiKey: string, maxAttempts = 30): Promise<string | null> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      });

      const data = await response.json();

      if (data.status === 'succeeded') {
        // Return the output (could be URL or base64)
        if (data.output) {
          if (Array.isArray(data.output)) {
            return data.output[0];
          }
          return data.output;
        }
        return null;
      }

      if (data.status === 'failed') {
        console.error('Replicate prediction failed:', data.error);
        return null;
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error polling Replicate:', error);
      return null;
    }
  }

  return null;
};

