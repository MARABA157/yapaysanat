import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Ortam değişkenlerini yükle
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                fileName: false,
                pure: true
              }
            ]
          ]
        }
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'styled-components': path.resolve(__dirname, 'node_modules/styled-components')
      },
      dedupe: ['react', 'react-dom', 'styled-components']
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
        onwarn(warning, warn) {
          if (warning.code === 'EVAL' || 
              warning.code === 'SOURCEMAP_ERROR' || 
              warning.code === 'THIS_IS_UNDEFINED' ||
              warning.code === 'MISSING_EXPORT' ||
              warning.code === 'PURE_COMMENT_HAS_INVALID_POSITION') return;
          warn(warning);
        },
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        output: {
          paths: {
            'styled-components': './node_modules/styled-components/dist/styled-components.browser.esm.js'
          },
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@radix-ui/react-icons', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge']
          },
          format: 'es',
          generatedCode: {
            arrowFunctions: true,
            constBindings: true,
            objectShorthand: true
          },
          globals: {
            'styled-components': 'styled'
          }
        },
        external: ['styled-components'],
        preserveEntrySignatures: 'strict',
        treeshake: {
          moduleSideEffects: true,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        }
      },
      commonjsOptions: {
        include: [/styled-components/, /node_modules/],
        extensions: ['.js', '.cjs', '.jsx', '.tsx', '.ts'],
        strictRequires: true,
        transformMixedEsModules: true,
        sourceMap: true
      },
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          arrows: true,
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
          passes: 2
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false,
          preserve_annotations: true
        }
      }
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        '@radix-ui/react-icons',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'framer-motion',
        'lucide-react',
        'styled-components'
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
        format: 'esm',
        treeShaking: true,
        minify: true,
        keepNames: true
      }
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
    envDir: '.', // .env dosyalarının okunacağı dizin
  };
});
