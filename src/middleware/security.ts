import { rateLimiter } from '@/lib/rate-limit';
import DOMPurify from 'dompurify';

// Güvenlik için input temizleme fonksiyonu
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // DOMPurify ile HTML temizleme
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Hiçbir HTML tag'ine izin verme
    ALLOWED_ATTR: [], // Hiçbir HTML attribute'una izin verme
  });
  
  // SQL enjeksiyon için ek kontroller
  return sanitized
    .replace(/'/g, "''") // SQL string escape
    .replace(/;/g, '') // SQL komut sonlandırıcıları kaldır
    .replace(/--/g, '') // SQL yorum satırlarını kaldır
    .replace(/\/\*/g, '') // SQL blok yorumlarını kaldır
    .replace(/\*\//g, ''); // SQL blok yorumlarını kaldır
}

// Güvenlik için URL temizleme fonksiyonu
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  try {
    const parsed = new URL(url);
    
    // Sadece güvenli protokollere izin ver
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    
    return parsed.toString();
  } catch (e) {
    // Geçersiz URL
    return '';
  }
}

// JWT token doğrulama fonksiyonu
export async function verifyToken(token: string): Promise<any> {
  // Burada JWT doğrulama işlemi yapılabilir
  // Örnek: return jwt.verify(token, process.env.JWT_SECRET);
  throw new Error('Token verification not implemented');
}

// Ana güvenlik middleware'i
export async function securityMiddleware(request: Request) {
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  
  // Rate limiting kontrolü - DoS saldırılarına karşı koruma
  if (!rateLimiter.check(clientIP, 100)) { // IP başına dakikada 100 istek
    return new Response('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60', // 60 saniye sonra tekrar dene
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0'
      }
    });
  }

  // CORS kontrolü
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': process.env.VITE_APP_URL || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Güvenlik başlıkları
  const headers = new Headers({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://api.example.com wss:; frame-src 'none';",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  });

  // JWT token kontrolü
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (token) {
    try {
      // Token doğrulama işlemi burada yapılabilir
      // const decoded = await verifyToken(token);
    } catch (error) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  // HTTP metod kontrolü - sadece izin verilen metodlara izin ver
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  if (!allowedMethods.includes(request.method)) {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // İçerik türü kontrolü - JSON enjeksiyonuna karşı koruma
  const contentType = request.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    try {
      const body = await request.json();
      
      // JSON içeriğini doğrula ve temizle
      // Bu kısım gerçek uygulamada daha kapsamlı olmalı
      if (body && typeof body === 'object') {
        // İçeriği temizle
        Object.keys(body).forEach(key => {
          if (typeof body[key] === 'string') {
            body[key] = sanitizeInput(body[key]);
          }
        });
      }
    } catch (error) {
      return new Response('Invalid JSON', { status: 400 });
    }
  }

  return new Response(null, { headers });
}
