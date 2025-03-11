// imageOptimizer.js
// Basitleştirilmiş resim optimizasyon stratejileri
import { loadedImages, failedImages } from './utils';

// Önbellek için temel değişkenler
export const imageCache = new Map();
export const MAX_CONCURRENT_LOADS = 8;

// WebP desteğini kontrol et
export const detectOptimalImageFormat = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
};

// Görsel URL'ini optimize et
export const getOptimalImageUrl = (originalUrl) => {
  if (!originalUrl) return originalUrl;
  
  try {
    // WebP desteği varsa ve window.getWebpUrl mevcutsa kullan
    if (window.supportsWebp && window.getWebpUrl) {
      return window.getWebpUrl(originalUrl) || originalUrl;
    }
  } catch {
    // Hata durumunda orijinal URL'i döndür
  }
  
  return originalUrl;
};

// Optimizasyon sistemini başlat
export const initImageOptimizer = async () => {
  try {
    const supportsWebP = await detectOptimalImageFormat();
    window.supportsWebp = supportsWebP;
  } catch {
    window.supportsWebp = false;
  }
};

// Resim boyutunu tespit et
export const detectImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    
    img.onerror = () => {
      reject(new Error('Resim boyutları tespit edilemedi'));
    };
    
    img.src = url;
  });
};

// Düşük kaliteli görsel URL'i oluştur
export const createLQIP = (width = 20, height = 12, color = '#f0f0f0') => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='${color.replace('#', '%23')}'/%3E%3C/svg%3E`;
};

export default {
  initImageOptimizer,
  detectOptimalImageFormat,
  getOptimalImageUrl,
  detectImageDimensions,
  createLQIP,
  imageCache,
  MAX_CONCURRENT_LOADS
};
