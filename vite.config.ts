import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// AGENTS.md lives at the repo root (the standard location for coding agents),
// so copy it into the build output to also serve it at /AGENTS.md.
function publishAgentsMd(): Plugin {
  return {
    name: "publish-agents-md",
    apply: "build",
    closeBundle() {
      copyFileSync(
        resolve(__dirname, "AGENTS.md"),
        resolve(__dirname, "dist/AGENTS.md"),
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), publishAgentsMd()],
});
