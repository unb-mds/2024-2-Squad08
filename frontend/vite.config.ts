import { defineConfig } from "vitest/config"; 
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
    },
    strictPort: true,
  },
  test: { 
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    include: ["src/tests/**/*.test.{ts,tsx,js,jsx}"], 
  },
});
