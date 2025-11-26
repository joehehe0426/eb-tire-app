/**
 * Image compression utility to reduce file size before storage/upload
 * Helps prevent localStorage quota exceeded errors
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  maxSizeKB?: number; // Target max size in KB
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
  maxSizeKB: 500
};

/**
 * Compresses an image file and returns it as a base64 data URL
 */
export const compressImage = (
  file: File,
  options: CompressionOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > opts.maxWidth || height > opts.maxHeight) {
          const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Try to compress to target size
        let quality = opts.quality;
        let compressed = canvas.toDataURL('image/jpeg', quality);
        
        // If still too large, reduce quality further
        const sizeKB = (compressed.length * 3) / 4 / 1024; // Approximate size
        if (sizeKB > opts.maxSizeKB && quality > 0.3) {
          quality = Math.max(0.3, opts.maxSizeKB / sizeKB * quality);
          compressed = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(compressed);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Validates if a file is a valid image
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSizeMB = 10;

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: '請上傳 JPG、PNG 或 WebP 格式的圖片' };
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `圖片大小不能超過 ${maxSizeMB}MB` };
  }

  return { valid: true };
};

