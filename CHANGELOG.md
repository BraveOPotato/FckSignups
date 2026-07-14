# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Tool additions and removals happen continuously in `tools.json` and go live
without a release; this changelog tracks changes to the site and tooling itself.

## [Unreleased]

## [1.1.0] - 2026-07-14

### Added

- `public/llms.txt`, served at `https://nosignups.net/llms.txt` per the
  [llmstxt.org](https://llmstxt.org) convention, embedding the complete tool
  directory so LLMs can read it in one fetch.
- `AGENTS.md`, repo-root instructions for AI coding agents per the
  [agents.md](https://agents.md) convention, with an auto-generated tool index
  for duplicate checking. Also served at `https://nosignups.net/AGENTS.md`.
- `scripts/generateLlmsDocs.mjs`, a zero-dependency script that regenerates
  the tool lists in both files from `tools.json` (`npm run generate:llms`).
- This changelog.

### Changed

- `npm run build` now regenerates the LLM docs from `tools.json` before
  compiling, so the published copies always match the latest data.

## [1.0.0] - 2026-05-07

### Added

- Initial release: the FckSignups (now NoSignups) directory — a React +
  TypeScript + Vite single-page app listing open-source, in-browser,
  no-signup tools.
- `tools.json` as the single source of truth for categories and tools,
  fetched at runtime from the `main` branch.
- Cloudflare Worker (`cloudflare-worker/`) handling submit, suggest, and
  report forms by opening GitHub issues.
- Python maintenance scripts (`management_tools/`) for adding tools from
  issues and refreshing GitHub star counts.
