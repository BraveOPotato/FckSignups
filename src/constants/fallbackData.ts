import type { ToolsData } from "../types";

export const FALLBACK_DATA: ToolsData = {
  categories: [
    {
      id: "all",
      name: "All",
      icon: "◈",
      description: "Every tool in one place",
    },
    {
      id: "productivity",
      name: "Productivity",
      icon: "⚡",
      description: "Get things done without creating accounts",
    },
    {
      id: "design",
      name: "Design & Graphics",
      icon: "▣",
      description: "Create visuals right in your browser",
    },
    {
      id: "utilities",
      name: "Utilities",
      icon: "◉",
      description: "Handy one-off tools",
    },
    {
      id: "dev",
      name: "Developer",
      icon: "◆",
      description: "Code helpers and formatters",
    },
    {
      id: "privacy",
      name: "Privacy",
      icon: "◊",
      description: "Tools that respect your data",
    },
  ],
  tools: [
    {
      id: "excalidraw",
      name: "Excalidraw",
      description:
        "Virtual whiteboard for sketching hand-drawn like diagrams. End-to-end encrypted. Collaborative without accounts.",
      url: "https://excalidraw.com",
      category: "design",
      tags: ["whiteboard", "diagrams", "sketch", "collaboration"],
      github: "https://github.com/excalidraw/excalidraw",
      license: "MIT",
      stars: 72000,
      featured: true,
    },
    {
      id: "kleki",
      name: "Kleki",
      description:
        "MS Paint-like interface in the browser with layers and brushes. Simple and fast. Zero setup.",
      url: "https://kleki.com",
      category: "design",
      tags: ["paint", "layers", "brushes", "drawing"],
      featured: false,
    },
    {
      id: "pixel-craft",
      name: "PixelCraft",
      description:
        "Pixel art editor and animation creation tool. Export to spritesheets. Runs entirely client-side.",
      url: "https://pixelcraft.web.app",
      category: "design",
      tags: ["pixel-art", "animation", "sprites", "game-dev"],
      github: "https://github.com/pixelcraftstudio/pixelcraft",
      license: "MIT",
      stars: 650,
      featured: false,
    },
    {
      id: "photopea",
      name: "Photopea",
      description:
        "Free online alternative to Photoshop. Supports PSD, XCF, Sketch, XD, and CDR formats. Professional-grade.",
      url: "https://photopea.com",
      category: "design",
      tags: ["photoshop", "psd", "editor", "professional"],
      featured: true,
    },
    {
      id: "waifu2x",
      name: "Waifu2x",
      description:
        "Upscale images and remove noise using deep convolutional neural networks. Great for anime-style art and photos.",
      url: "https://waifu2x.udp.jp",
      category: "design",
      tags: ["upscale", "noise-reduction", "ai", "image"],
      github: "https://github.com/nagadomi/waifu2x",
      license: "MIT",
      stars: 21000,
      featured: false,
    },
    {
      id: "json-crack",
      name: "JSON Crack",
      description:
        "Visualize JSON data into interactive graphs. Paste JSON, get a graph instantly. No data leaves your browser.",
      url: "https://jsoncrack.com",
      category: "dev",
      tags: ["json", "visualization", "graph", "data"],
      github: "https://github.com/AykutSarac/jsoncrack.com",
      license: "MIT",
      stars: 28000,
      featured: true,
    },
    {
      id: "regex101",
      name: "Regex101",
      description:
        "Build, test, and debug regex with real-time explanation and match highlighting. Supports multiple flavors.",
      url: "https://regex101.com",
      category: "dev",
      tags: ["regex", "testing", "debugger", "explain"],
      featured: false,
    },
    {
      id: "carbon",
      name: "Carbon",
      description:
        "Create and share beautiful images of your source code. Syntax highlighting for 100+ languages. Perfect for social media.",
      url: "https://carbon.now.sh",
      category: "dev",
      tags: ["code", "screenshots", "sharing", "syntax"],
      github: "https://github.com/carbon-app/carbon",
      license: "MIT",
      stars: 34000,
      featured: false,
    },
    {
      id: "randommer",
      name: "Randommer",
      description:
        "Random data generator and validator. Names, addresses, credit cards, IBANs. Perfect for testing and mockups.",
      url: "https://randommer.io",
      category: "utilities",
      tags: ["random", "generator", "data", "testing"],
      featured: false,
    },
    {
      id: "tinywow",
      name: "TinyWow",
      description:
        "Free tools for PDF, video, image, and text conversion. No signup, no limits. Over 200+ tools available.",
      url: "https://tinywow.com",
      category: "utilities",
      tags: ["converter", "pdf", "tools", "free"],
      featured: false,
    },
    {
      id: "temp-mail",
      name: "TempMail",
      description:
        "Disposable temporary email addresses. Receive emails and attachments anonymously. Auto-deletes after use.",
      url: "https://temp-mail.org",
      category: "privacy",
      tags: ["temp-email", "anonymous", "inbox", "disposable"],
      featured: false,
    },
    {
      id: "duckduckgo-email",
      name: "DuckDuckGo Email",
      description:
        "Generate unique email addresses that forward to your real inbox. No signup required for basic use. Burner emails.",
      url: "https://duckduckgo.com/email",
      category: "privacy",
      tags: ["email", "privacy", "alias", "burner"],
      featured: false,
    },
    {
      id: "cryptpad",
      name: "CryptPad",
      description:
        "Collaborative documents, spreadsheets, polls, whiteboards. End-to-end encrypted. Zero-knowledge architecture.",
      url: "https://cryptpad.fr",
      category: "productivity",
      tags: ["documents", "collaboration", "encrypted", "office"],
      github: "https://github.com/cryptpad/cryptpad",
      license: "AGPL-3.0",
      stars: 5200,
      featured: true,
    },
    {
      id: "draw-io",
      name: "draw.io",
      description:
        "Diagramming and whiteboarding app. Flowcharts, network diagrams, UML. Save to GitHub, Drive, or local.",
      url: "https://app.diagrams.net",
      category: "productivity",
      tags: ["diagrams", "flowcharts", "uml", "whiteboard"],
      github: "https://github.com/jgraph/drawio",
      license: "Apache-2.0",
      stars: 42000,
      featured: false,
    },
    {
      id: "libreoffice-online",
      name: "LibreOffice Online",
      description:
        "Full office suite in the browser. Writer, Calc, Impress. Open and edit documents without installation.",
      url: "https://www.libreoffice.org/download/download-libreoffice/",
      category: "productivity",
      tags: ["office", "documents", "spreadsheets", "presentations"],
      github: "https://github.com/LibreOffice/core",
      license: "MPL-2.0",
      featured: false,
    },
  ],
};

export const DEV_JSON_URL = "../../../tools.json";
export const PROD_JSON_URL =
  "https://raw.githubusercontent.com/BraveOPotato/FckSignups/refs/heads/main/tools.json";
export const FALLBACK_REPO_STARS = "1.8k+";
