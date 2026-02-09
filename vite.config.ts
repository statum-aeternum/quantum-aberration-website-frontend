import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const allowNgrok = false;

  const allowedHosts = [];

  if (allowNgrok) {
    const ngrokHost = loadEnv(mode, process.cwd()).VITE_NGROK_HOST;
    allowedHosts.push(ngrokHost);
  }

  return defineConfig({
    plugins: [
      react(),
      Sitemap({
        hostname: "https://example.com",
        dynamicRoutes: ["/", "/about", "/news", "/merch", "/contact"],
      }),
    ],
    server: {
      watch: {
        usePolling: true,
      },
      allowedHosts: allowedHosts,
    },
    preview: {
      allowedHosts: allowedHosts,
    },
  });
};
