# AGENTS.md

Guidance for AI coding agents working on this repository.

## What this project is

NoSignups (formerly FckSignups) is an open-source directory of free tools that run in the browser, require no signup, and are open source. It is a React + TypeScript single-page app built with Vite, deployed at https://nosignups.net. The code is licensed GPL-3.0.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # type-check (tsc) and build to dist/
npm run preview    # preview the production build
```

There is no test suite. `npm run build` is the correctness gate — it must pass (TypeScript strict compilation) before you commit.

## Project layout

- `tools.json` — the tool directory data (categories + tools). This is the heart of the project. In production the app fetches it from the raw GitHub URL of the `main` branch, so changes to it go live without a redeploy.
- `src/` — the React app:
  - `src/hooks/useTools.ts` — loads `tools.json` (dev path → prod raw URL → `src/constants/fallbackData.ts`), filtering and sorting.
  - `src/components/` — UI components (Header, Controls, ToolGrid, ToolCard, Footer, Toast, Report).
  - `src/hooks/useModal/` — the submit/suggest/report modal system; field definitions live in `src/constants/ModalConfigs.tsx`.
  - `src/types/index.ts` — the `Tool`, `Category`, and `ToolsData` interfaces. Keep `tools.json` consistent with these.
- `public/` — static files copied verbatim to the site root at build time (e.g. `llms.txt`).
- `cloudflare-worker/` — a separate Cloudflare Worker that receives submit/suggest/report form posts and opens GitHub issues. It has its own `package.json` and is not part of the Vite build.
- `management_tools/` — Python maintenance scripts (adding tools from issues, refreshing GitHub star counts).

## Editing tools.json

Each tool entry follows this schema (see also the README):

| Field | Required | Notes |
|-------|----------|-------|
| `id` | Yes | URL-friendly unique identifier |
| `name` | Yes | Display name |
| `description` | Yes | One sentence, under 140 characters |
| `url` | Yes | Direct link to the tool |
| `category` | Yes | Must match a category `id` in the same file |
| `tags` | No | 3–5 searchable keywords |
| `github` | No | Source repository link |
| `license` | No | SPDX identifier |
| `stars` | No | GitHub star count |
| `featured` | No | Boolean; pins to top |
| `notRecommendedReason` | No | Why the entry is not recommended |

Rules for adding a tool:

- It must work **without creating an account** — this is the project's core promise.
- It should run in the browser and be open source.
- Keep the description under 140 characters and use 3–5 relevant tags.
- Validate that the file is still valid JSON after editing.

## Conventions

- TypeScript strict mode; functional React components with hooks.
- No CSS framework — styles live in `src/index.css`.
- Keep dependencies minimal; this project deliberately avoids bloat.
- Don't add analytics, tracking, or anything that conflicts with the project philosophy in the README.

## Publishing note

This file is copied into the build output by a plugin in `vite.config.ts` so it is also served at https://nosignups.net/AGENTS.md, and it is referenced from `public/llms.txt`. If you rename or move it, update both.
