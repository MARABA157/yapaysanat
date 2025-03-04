import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import '@/index.css';

const root = document.getElementById('root') as HTMLElement

if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="sanat-galerisi-theme">
          <BrowserRouter>
            <RouterProvider router={router} />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
)
