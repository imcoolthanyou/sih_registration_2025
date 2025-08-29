import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/", // ✅ Use the root path for Vercel

  server: {
    host: true,
    port: 8080,
  },
  // ... rest of your config
}));