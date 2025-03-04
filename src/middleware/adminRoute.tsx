import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthenticated } from '@/lib/auth';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Admin sayfalarını koruyan bir yönlendirme bileşeni
 * Sadece admin yetkisi olan kullanıcıların erişimine izin verir
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  const location = useLocation();
  
  // Admin kimlik doğrulaması
  if (!isAdminAuthenticated()) {
    // Kullanıcı admin değilse login sayfasına yönlendir
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  
  // Admin ise içeriği göster
  return <>{children}</>;
}
