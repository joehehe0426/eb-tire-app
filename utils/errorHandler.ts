/**
 * Centralized error handling utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public userMessage: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.userMessage;
  }

  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return '網絡連接失敗，請檢查您的網絡連接後重試。';
    }

    // API errors
    if (error.message.includes('API') || error.message.includes('key')) {
      return 'API 服務暫時不可用，請稍後再試。';
    }

    // Timeout errors
    if (error.message.includes('timeout')) {
      return '請求超時，請稍後再試。';
    }
  }

  // Unknown errors
  return '發生未知錯誤，請稍後再試。';
};

export const logError = (error: unknown, context?: string): void => {
  // Only log in development or if explicitly enabled
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_LOGGING === 'true') {
    const errorInfo = {
      message: error instanceof Error ? error.message : String(error),
      context,
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined
    };
    
    console.error('[App Error]', errorInfo);
  }
};

