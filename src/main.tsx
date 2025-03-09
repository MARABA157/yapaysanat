import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { App } from '@/App';
import '@/index.css';

const root = document.getElementById('root') as HTMLElement

if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="sanat-galerisi-theme">
          <BrowserRouter future={{ 
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
)
