import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Ortam değişkenlerini yükle
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: 'react'
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'next-themes': ['next-themes'],
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-icons', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge']
          }
        },
        onwarn(warning, warn) {
          if (warning.code === 'EVAL' || 
              warning.code === 'SOURCEMAP_ERROR' || 
              warning.code === 'THIS_IS_UNDEFINED') return;
          warn(warning);
        }
      },
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
        exclude: [/node_modules\/next-themes/]
      },
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    envDir: '.', // .env dosyalarının okunacağı dizin
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        'next-themes',
        '@radix-ui/react-icons',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ],
      exclude: []
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
  };
});
