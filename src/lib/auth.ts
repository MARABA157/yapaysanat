import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { supabase } from './supabase';

// Admin kimlik bilgileri - Gerçek uygulamada bu bilgiler burada saklanmamalı
// Bu sadece demo amaçlıdır
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Sanat2025!';
const ADMIN_TOKEN_KEY = 'sanat_admin_token';
const USER_TOKEN_KEY = 'sanat_user_token';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 saat

interface JwtPayload {
  email?: string;
  username?: string;
  role: string;
  exp: number;
  iat: number;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  premium_status: 'free' | 'premium';
  premium_expiry?: string;
}

// Demo kullanıcıları - Gerçek uygulamada veritabanında saklanmalı
const DEMO_USERS = [
  { email: 'user@example.com', password: 'User2025!' }
];

/**
 * Kullanıcı girişi yapar ve JWT token oluşturur
 */
export const loginUser = async (email: string, password: string): Promise<boolean> => {
  const user = DEMO_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    const now = Date.now();
    const payload = {
      email: email,
      role: 'user',
      iat: Math.floor(now / 1000),
      exp: Math.floor((now + TOKEN_EXPIRY) / 1000)
    };
    
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(`${header}.${encodedPayload}`);
    
    const token = `${header}.${encodedPayload}.${signature}`;
    localStorage.setItem(USER_TOKEN_KEY, token);
    return true;
  }
  return false;
};

/**
 * Kullanıcı çıkışı yapar
 */
export const logoutUser = (): void => {
  localStorage.removeItem(USER_TOKEN_KEY);
};

/**
 * Kullanıcı oturumunun aktif olup olmadığını kontrol eder
 */
export const isUserAuthenticated = (): boolean => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      localStorage.removeItem(USER_TOKEN_KEY);
      return false;
    }
    
    return decoded.role === 'user';
  } catch (error) {
    localStorage.removeItem(USER_TOKEN_KEY);
    return false;
  }
};

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
    
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(`${header}.${encodedPayload}`);
    
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
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      return false;
    }
    
    return decoded.role === 'admin';
  } catch (error) {
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
    if (!isAdminAuthenticated()) {
      navigate('/auth/admin', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
    setIsLoading(false);
  }, [navigate, location]);
  
  return { isLoading };
};

/**
 * Kullanıcı sayfalarını korumak için kullanılan hook
 */
export const useUserProtection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/auth/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
    setIsLoading(false);
  }, [navigate, location]);
  
  return { isLoading };
};

/**
 * Google ile girişi destekler
 * Not: Şu anda bakımda
 */
export async function signInWithGoogle() {
  try {
    // localStorage'dan yönlendirme bilgisini al
    const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
    
    // Doğrudan tarayıcı yönlendirmesi kullanarak Google ile giriş
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${redirectPath}`,
      }
    });

    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Google login error:', error);
    return { data: null, error };
  }
}

/**
 * Apple ID ile girişi destekler
 */
export async function signInWithApple() {
  try {
    // localStorage'dan yönlendirme bilgisini al
    const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
    
    // Doğrudan tarayıcı yönlendirmesi kullanarak Apple ile giriş
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}${redirectPath}`,
        skipBrowserRedirect: false
      }
    });

    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Apple login error:', error);
    return { data: null, error };
  }
}

/**
 * Microsoft ile girişi destekler
 */
export async function signInWithMicrosoft() {
  try {
    // Doğrudan tarayıcı yönlendirmesi kullanarak Microsoft ile giriş
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}`,
        skipBrowserRedirect: false
      }
    });

    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Microsoft login error:', error);
    return { data: null, error };
  }
}

/**
 * E-posta ile girişi destekler
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Kullanıcı giriş yaptıktan sonra otomatik olarak free premium
  await activateFreePremium(data.user.id);

  return data;
}

/**
 * E-posta ile kaydolma işlemini destekler
 */
export async function signUpWithEmail(email: string, password: string, username: string) {
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;

  if (authData.user) {
    // Yeni profil oluştur
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          username,
          email,
          premium_status: 'free',
          premium_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 gün
        }
      ]);

    if (profileError) throw profileError;
  }

  return authData;
}

/**
 * Çıkış işlemini destekler
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Mevcut kullanıcıyı döner
 */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return {
    ...user,
    ...profile
  };
}

/**
 * Ücretsiz premium aktivasyonu
 */
export async function activateFreePremium(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .update({
      premium_status: 'free',
      premium_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 gün
    })
    .eq('id', userId);

  if (error) throw error;
}

/**
 * Profil güncelleme
 */
export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

/**
 * Kullanıcının premium durumu kontrolü
 */
export async function isUserPremium() {
  const user = await getCurrentUser();
  if (!user) return false;

  return user.premium_status === 'premium' || 
         (user.premium_status === 'free' && new Date(user.premium_expiry) > new Date());
}
