// vite.config.ts
import { defineConfig } from "file:///C:/Users/malig/Desktop/sanat-galerisi/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/malig/Desktop/sanat-galerisi/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\malig\\Desktop\\sanat-galerisi";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  base: "./",
  server: {
    port: 4e3,
    host: true,
    open: true,
    proxy: {
      "/comfyui": {
        target: "http://127.0.0.1:8188",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/comfyui/, ""),
        secure: true
        // HTTPS için güvenli bağlantıyı ekledim
      }
    },
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: process.env.NODE_ENV !== "production",
    // Sadece geliştirme ortamında sourcemap oluştur
    minify: "terser",
    // Daha agresif minifikasyon için terser kullan
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === "production",
        // Üretim ortamında console.log ifadelerini kaldır
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor": ["react", "react-dom", "react-router-dom"],
          "ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-slot", "@radix-ui/react-toast"],
          "animation": ["framer-motion"],
          "icons": ["lucide-react"],
          "material": ["@mui/material", "@emotion/react", "@emotion/styled"],
          "supabase": ["@supabase/supabase-js"]
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    },
    target: "es2015",
    // Daha geniş tarayıcı desteği için
    cssCodeSplit: true,
    // CSS'i ayrı dosyalara böl
    assetsInlineLimit: 4096,
    // 4kb'den küçük dosyaları inline olarak ekle
    reportCompressedSize: false,
    // Build hızını artırmak için sıkıştırılmış boyut raporlamasını kapat
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion", "@supabase/supabase-js"],
    esbuildOptions: {
      target: "es2020"
    }
  },
  preview: {
    port: 4e3,
    host: true,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWxpZ1xcXFxEZXNrdG9wXFxcXHNhbmF0LWdhbGVyaXNpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWxpZ1xcXFxEZXNrdG9wXFxcXHNhbmF0LWdhbGVyaXNpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tYWxpZy9EZXNrdG9wL3NhbmF0LWdhbGVyaXNpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBiYXNlOiAnLi8nLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA0MDAwLFxuICAgIGhvc3Q6IHRydWUsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgJy9jb21meXVpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xOjgxODgnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9jb21meXVpLywgJycpLFxuICAgICAgICBzZWN1cmU6IHRydWUsIC8vIEhUVFBTIGlcdTAwRTdpbiBnXHUwMEZDdmVubGkgYmFcdTAxMUZsYW50XHUwMTMxeVx1MDEzMSBla2xlZGltXG4gICAgICB9XG4gICAgfSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICdYLUZyYW1lLU9wdGlvbnMnOiAnREVOWScsXG4gICAgICAnUmVmZXJyZXItUG9saWN5JzogJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nLFxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxuICAgIHNvdXJjZW1hcDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgLy8gU2FkZWNlIGdlbGlcdTAxNUZ0aXJtZSBvcnRhbVx1MDEzMW5kYSBzb3VyY2VtYXAgb2x1XHUwMTVGdHVyXG4gICAgbWluaWZ5OiAndGVyc2VyJywgLy8gRGFoYSBhZ3Jlc2lmIG1pbmlmaWthc3lvbiBpXHUwMEU3aW4gdGVyc2VyIGt1bGxhblxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJywgLy8gXHUwMERDcmV0aW0gb3J0YW1cdTAxMzFuZGEgY29uc29sZS5sb2cgaWZhZGVsZXJpbmkga2FsZFx1MDEzMXJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICd2ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgJ3VpJzogWydAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJywgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JywgJ0ByYWRpeC11aS9yZWFjdC1zbG90JywgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCddLFxuICAgICAgICAgICdhbmltYXRpb24nOiBbJ2ZyYW1lci1tb3Rpb24nXSxcbiAgICAgICAgICAnaWNvbnMnOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgICAgICdtYXRlcmlhbCc6IFsnQG11aS9tYXRlcmlhbCcsICdAZW1vdGlvbi9yZWFjdCcsICdAZW1vdGlvbi9zdHlsZWQnXSxcbiAgICAgICAgICAnc3VwYWJhc2UnOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddXG4gICAgICAgIH0sXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XSdcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhcmdldDogJ2VzMjAxNScsIC8vIERhaGEgZ2VuaVx1MDE1RiB0YXJheVx1MDEzMWNcdTAxMzEgZGVzdGVcdTAxMUZpIGlcdTAwRTdpblxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSwgLy8gQ1NTJ2kgYXlyXHUwMTMxIGRvc3lhbGFyYSBiXHUwMEY2bFxuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LCAvLyA0a2InZGVuIGtcdTAwRkNcdTAwRTdcdTAwRkNrIGRvc3lhbGFyXHUwMTMxIGlubGluZSBvbGFyYWsgZWtsZVxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSwgLy8gQnVpbGQgaFx1MDEzMXpcdTAxMzFuXHUwMTMxIGFydFx1MDEzMXJtYWsgaVx1MDBFN2luIHNcdTAxMzFrXHUwMTMxXHUwMTVGdFx1MDEzMXJcdTAxMzFsbVx1MDEzMVx1MDE1RiBib3l1dCByYXBvcmxhbWFzXHUwMTMxblx1MDEzMSBrYXBhdFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWVcbiAgICB9XG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nLCAnZnJhbWVyLW1vdGlvbicsICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiAnZXMyMDIwJ1xuICAgIH1cbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDQwMDAsXG4gICAgaG9zdDogdHJ1ZSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICdYLUZyYW1lLU9wdGlvbnMnOiAnREVOWScsXG4gICAgICAnUmVmZXJyZXItUG9saWN5JzogJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nLFxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlMsU0FBUyxvQkFBb0I7QUFDeFUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsY0FBYyxFQUFFO0FBQUEsUUFDaEQsUUFBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLDBCQUEwQjtBQUFBLE1BQzFCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsV0FBVyxRQUFRLElBQUksYUFBYTtBQUFBO0FBQUEsSUFDcEMsUUFBUTtBQUFBO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjLFFBQVEsSUFBSSxhQUFhO0FBQUE7QUFBQSxRQUN2QyxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixVQUFVLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ25ELE1BQU0sQ0FBQywwQkFBMEIsaUNBQWlDLHdCQUF3Qix1QkFBdUI7QUFBQSxVQUNqSCxhQUFhLENBQUMsZUFBZTtBQUFBLFVBQzdCLFNBQVMsQ0FBQyxjQUFjO0FBQUEsVUFDeEIsWUFBWSxDQUFDLGlCQUFpQixrQkFBa0IsaUJBQWlCO0FBQUEsVUFDakUsWUFBWSxDQUFDLHVCQUF1QjtBQUFBLFFBQ3RDO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLElBQ1IsY0FBYztBQUFBO0FBQUEsSUFDZCxtQkFBbUI7QUFBQTtBQUFBLElBQ25CLHNCQUFzQjtBQUFBO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLGFBQWEsb0JBQW9CLGlCQUFpQix1QkFBdUI7QUFBQSxJQUM1RixnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsMEJBQTBCO0FBQUEsTUFDMUIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
