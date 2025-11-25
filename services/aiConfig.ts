/**
 * AI Provider Configuration
 * Switch between different AI providers based on availability
 */

export enum AIProvider {
  HUGGINGFACE = 'huggingface',
  REPLICATE = 'replicate',
  OPENAI = 'openai',
  DEEPSEEK = 'deepseek',
  GEMINI = 'gemini' // Keep for reference, but not available in HK
}

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  // Hugging Face specific
  huggingfaceModel?: string;
  // Replicate specific
  replicateModel?: string;
  // OpenAI specific
  openaiModel?: string;
}

// Default configuration - uses Hugging Face (free, works in HK)
export const getAIConfig = (): AIConfig => {
  // Check environment variables to determine provider
  if (process.env.HUGGINGFACE_API_KEY) {
    return {
      provider: AIProvider.HUGGINGFACE,
      apiKey: process.env.HUGGINGFACE_API_KEY,
      huggingfaceModel: process.env.HUGGINGFACE_MODEL || 'Salesforce/blip-image-captioning-base'
    };
  }
  
  if (process.env.REPLICATE_API_TOKEN) {
    return {
      provider: AIProvider.REPLICATE,
      apiKey: process.env.REPLICATE_API_TOKEN,
      replicateModel: process.env.REPLICATE_MODEL || 'stability-ai/stable-diffusion'
    };
  }
  
  if (process.env.OPENAI_API_KEY) {
    return {
      provider: AIProvider.OPENAI,
      apiKey: process.env.OPENAI_API_KEY,
      openaiModel: process.env.OPENAI_MODEL || 'gpt-4-vision-preview'
    };
  }
  
  // Default to Hugging Face (no API key needed for public models)
  return {
    provider: AIProvider.HUGGINGFACE,
    huggingfaceModel: 'Salesforce/blip-image-captioning-base'
  };
};

