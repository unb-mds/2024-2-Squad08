import { defineConfig } from "vitest/config"; 
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
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
