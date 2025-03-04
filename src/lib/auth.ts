import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Admin kimlik bilgileri - Gerçek uygulamada bu bilgiler burada saklanmamalı
// Bu sadece demo amaçlıdır
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Sanat2025!';
const ADMIN_TOKEN_KEY = 'sanat_admin_token';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 saat

interface JwtPayload {
  username: string;
  role: string;
  exp: number;
  iat: number;
}

/**
 * Admin girişi yapar ve JWT token oluşturur
 */
export const loginAdmin = (username: string, password: string): boolean => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const now = Date.now();
    const payload = {
      username: username,
      role: 'admin',
      iat: Math.floor(now / 1000),
      exp: Math.floor((now + TOKEN_EXPIRY) / 1000)
    };
    
    // Basit bir JWT token oluşturma (gerçek uygulamada daha güvenli bir yöntem kullanılmalı)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(`${header}.${encodedPayload}`); // Gerçek uygulamada doğru imzalama kullanılmalı
    
    const token = `${header}.${encodedPayload}.${signature}`;
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    return true;
  }
  return false;
};

/**
 * Admin çıkışı yapar
 */
export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

/**
 * Admin oturumunun aktif olup olmadığını kontrol eder
 */
export const isAdminAuthenticated = (): boolean => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      // Token süresi dolmuş, temizle
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      return false;
    }
    
    return decoded.role === 'admin';
  } catch (error) {
    // Token geçersiz
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    return false;
  }
};

/**
 * Admin sayfalarını korumak için kullanılan hook
 */
export const useAdminProtection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Admin kimlik doğrulaması
    if (!isAdminAuthenticated()) {
      // Kullanıcı admin değilse login sayfasına yönlendir
      navigate('/admin/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
    setIsLoading(false);
  }, [navigate, location]);
  
  return { isLoading };
};
