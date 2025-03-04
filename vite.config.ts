import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/comfyui': {
        target: 'http://127.0.0.1:8188',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/comfyui/, ''),
        secure: true, // HTTPS için güvenli bağlantıyı ekledim
      }
    },
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV !== 'production', // Sadece geliştirme ortamında sourcemap oluştur
    minify: 'terser', // Daha agresif minifikasyon için terser kullan
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production', // Üretim ortamında console.log ifadelerini kaldır
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot', '@radix-ui/react-toast'],
          'animation': ['framer-motion'],
          'icons': ['lucide-react'],
          'material': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'supabase': ['@supabase/supabase-js']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    target: 'es2015', // Daha geniş tarayıcı desteği için
    cssCodeSplit: true, // CSS'i ayrı dosyalara böl
    assetsInlineLimit: 4096, // 4kb'den küçük dosyaları inline olarak ekle
    reportCompressedSize: false, // Build hızını artırmak için sıkıştırılmış boyut raporlamasını kapat
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@supabase/supabase-js'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  preview: {
    port: 3000,
    host: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  }
})
