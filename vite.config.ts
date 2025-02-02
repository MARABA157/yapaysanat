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
        jsxImportSource: 'react',
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
            'next-themes': ['next-themes']
          }
        },
        onwarn(warning, warn) {
          if (warning.code === 'EVAL' || warning.code === 'SOURCEMAP_ERROR') return;
          warn(warning);
        }
      },
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
        exclude: [/node_modules\/next-themes/]
      }
    },
    envDir: '.', // .env dosyalarının okunacağı dizin
    optimizeDeps: {
      include: ['react', 'react-dom', 'next-themes'],
      exclude: []
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
  };
});
