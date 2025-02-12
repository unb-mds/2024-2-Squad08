import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      watch: {
        usePolling: true,
      },
      strictPort: true,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        }
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.js",
    },
  }
});