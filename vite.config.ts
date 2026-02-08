import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    allowedHosts: [import.meta.env.VITE_NGROK_HOST],
  },
  preview: {
    allowedHosts: [import.meta.env.VITE_NGROK_HOST],
  },
});
