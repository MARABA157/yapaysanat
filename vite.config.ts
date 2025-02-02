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
      dedupe: ['react', 'react-dom']
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
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('next-themes')) {
                return 'next-themes';
              }
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
                return 'ui-vendor';
              }
              return 'vendor';
            }
          }
        },
        onwarn(warning, warn) {
          if (warning.code === 'EVAL' || 
              warning.code === 'SOURCEMAP_ERROR' || 
              warning.code === 'THIS_IS_UNDEFINED' ||
              warning.code === 'MISSING_EXPORT') return;
          warn(warning);
        }
      },
      commonjsOptions: {
        include: [/node_modules/],
        extensions: ['.js', '.cjs', '.jsx', '.tsx', '.ts'],
        strictRequires: true,
        transformMixedEsModules: true
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
        'tailwind-merge',
        'framer-motion',
        'lucide-react'
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2020'
      }
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
    envDir: '.', // .env dosyalarının okunacağı dizin
  };
});
