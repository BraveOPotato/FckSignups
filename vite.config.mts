import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { websiteSchema } from "./src/data/schema";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          jsonLd: JSON.stringify(websiteSchema),
        },
      },
    }),
  ],
});
