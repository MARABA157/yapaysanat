/**
 * Web Crypto API kullanan güvenli şifreleme servisi
 */

const encoder = new TextEncoder();

/**
 * Şifre gücünü kontrol eder
 */
export function checkPasswordStrength(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Şifre en az bir özel karakter içermelidir (!@#$%^&*(),.?":{}|<>)');
  }

  return {
    isStrong: errors.length === 0,
    errors
  };
}

/**
 * Güvenli rastgele token oluşturur
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Şifreyi güvenli bir şekilde hashler
 * PBKDF2 ile SHA-256 kullanır
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Salt oluştur
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Şifreyi UTF-8'e dönüştür
    const passwordBuffer = encoder.encode(password);
    
    // PBKDF2 için anahtar oluştur
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    // PBKDF2 ile hash oluştur
    const hash = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      key,
      256
    );
    
    // Salt ve hash'i birleştir
    const result = new Uint8Array(salt.length + hash.byteLength);
    result.set(salt);
    result.set(new Uint8Array(hash), salt.length);
    
    // Base64'e dönüştür
    return btoa(String.fromCharCode(...result));
  } catch (error) {
    console.error('Hash error:', error);
    throw new Error('Şifreleme hatası');
  }
}

/**
 * Verilen şifrenin hash'ini doğrular
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Base64'ten dönüştür
    const hashBytes = Uint8Array.from(atob(storedHash), c => c.charCodeAt(0));
    
    // Salt'ı ayır
    const salt = hashBytes.slice(0, 16);
    const hash = hashBytes.slice(16);
    
    // Şifreyi UTF-8'e dönüştür
    const passwordBuffer = encoder.encode(password);
    
    // PBKDF2 için anahtar oluştur
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    // Yeni hash oluştur
    const newHash = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      key,
      256
    );
    
    // Hash'leri karşılaştır
    return arrayBufferEquals(hash, new Uint8Array(newHash));
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
}

/**
 * İki ArrayBuffer'ı karşılaştırır
 */
function arrayBufferEquals(a: ArrayBuffer | Uint8Array, b: ArrayBuffer | Uint8Array): boolean {
  const a8 = a instanceof Uint8Array ? a : new Uint8Array(a);
  const b8 = b instanceof Uint8Array ? b : new Uint8Array(b);
  
  if (a8.length !== b8.length) return false;
  
  return a8.every((val, i) => val === b8[i]);
}
