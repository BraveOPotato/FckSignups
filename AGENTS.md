# AGENTS.md

Guidance for AI coding agents working on this repository.

## What this project is

NoSignups (formerly FckSignups) is an open-source directory of free tools that run in the browser, require no signup, and are open source. It is a React + TypeScript single-page app built with Vite, deployed at https://nosignups.net. The code is licensed GPL-3.0.

## Commands

```bash
npm install            # install dependencies
npm run dev            # start the Vite dev server
npm run build          # regenerate LLM docs, type-check (tsc), build to dist/
npm run preview        # preview the production build
npm run generate:llms  # regenerate the tool lists in llms.txt and AGENTS.md
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
- `scripts/generateLlmsDocs.mjs` — regenerates the tool lists embedded in `public/llms.txt` and this file from `tools.json`; runs automatically as part of `npm run build`.

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
- Check the auto-generated tool index at the bottom of this file for duplicates first.
- After editing `tools.json`, run `npm run generate:llms` and commit the regenerated `public/llms.txt` and `AGENTS.md` together with it.

## Conventions

- TypeScript strict mode; functional React components with hooks.
- No CSS framework — styles live in `src/index.css`.
- Keep dependencies minimal; this project deliberately avoids bloat.
- Don't add analytics, tracking, or anything that conflicts with the project philosophy in the README.

## Publishing note

This file is copied into the build output by a plugin in `vite.config.ts` so it is also served at https://nosignups.net/AGENTS.md, and it is referenced from `public/llms.txt`. If you rename or move it, update both, plus `scripts/generateLlmsDocs.mjs`.

## Tool index (auto-generated)

<!-- BEGIN GENERATED TOOL LIST -->
210 tools across 10 categories, generated from tools.json. Check here before adding a tool to avoid duplicates.

### Productivity (`productivity`, 17 tools)

- `webllm` — [WebLLM](https://webllm.mlc.ai/)
- `grist` — [Grist](https://docs.getgrist.com)
- `cryptpad` — [CryptPad](https://cryptpad.fr)
- `stirling-pdf` — [Stirling-PDF](https://stirling.com/app)
- `bentopdf` — [BentoPDF](https://www.bentopdf.com/)
- `asciiflow` — [ASCIIFlow](https://asciiflow.com/)
- `mirotalk-p2p` — [MiroTalk P2P](https://p2p.mirotalk.com/)
- `flowchartfun` — [flowchart.fun](https://flowchart.fun/)
- `ethercalc` — [EtherCalc](https://ethercalc.net/)
- `tomodoro` — [Tomodoro](https://lazy-guy.github.io/tomodoro/)
- `resume-nation` — [Resume Nation](https://resume-nation.github.io)
- `dsheets` — [dSheets](https://dsheets.new/)
- `dohabit` — [DoHabit](https://dohabit.app/)
- `quickretro` — [QuickRetro](https://quickretro.app/)
- `sipp-chat` — [Sipp Chat](https://chat.sipp.sh/)
- `tailit` — [Tailit](https://tailit.xyz/)
- `mermify` — [Mermify](https://tra-sco.github.io/mermify/)

### Design & Graphics (`design`, 37 tools)

- `excalidraw` — [Excalidraw](https://excalidraw.com)
- `graphite` — [Graphite](https://editor.graphite.rs)
- `jspaint` — [JSPaint](https://jspaint.app)
- `tldraw` — [tldraw](https://www.tldraw.com/)
- `piskel` — [Piskel](https://www.piskelapp.com)
- `pixelorama` — [Pixelorama](https://orama-interactive.itch.io/pixelorama)
- `dashboard-icons` — [Dashboard Icons](https://dashboardicons.com/)
- `svg-edit` — [SVG-Edit](https://svgedit.netlify.app/index.html)
- `drawio` — [draw.io](https://www.drawio.com/)
- `blockbench` — [Blockbench](https://web.blockbench.net/)
- `svgpatheditor` — [SvgPathEditor](https://yqnn.github.io/svg-path-editor/)
- `makegirlsmoe` — [MakeGirlsMoe](https://make.girls.moe)
- `terraink` — [TerraInk](https://terraink.app/)
- `pattern-craft` — [Pattern Craft](https://patterncraft.store/)
- `method-draw` — [Method Draw](https://editor.method.ac)
- `godsvg` — [GodSVG](https://www.godsvg.com/editor/)
- `thesvg` — [TheSVG](https://thesvg.org/)
- `icon-maker` — [Icon Maker](https://ray.so/icon)
- `pixel-craft` — [PixelCraft](https://pixelcraft.web.app)
- `vecto3d` — [Vecto3d](https://vecto3d.app/)
- `screenshot-studio` — [Screenshot Studio](https://www.screenshot-studio.com/)
- `klecks` — [Klecks](https://kleki.com/)
- `component-gallery` — [Component Gallery](https://component.gallery/)
- `glyphr-studio` — [Glyphr Studio](https://www.glyphrstudio.com/)
- `studio` — [Studio](https://studio.neato.fun/)
- `phosphor-cam` — [Phosphor-Cam](https://phosphor-cam.vercel.app/)
- `darklyart` — [Darkly.Art](https://darkly.art/)
- `fluid` — [Fluid](https://fluid.krackeddevs.com/)
- `toolsforimage` — [ToolsForImage](https://toolsforimage.com/)
- `word-aligner` — [Word Aligner](https://aligner.tinygods.dev)
- `voidmesh` — [VoidMesh](https://voidmesh.xyz/)
- `drawshare` — [DrawShare](https://shravangoswami.com/DrawShare/)
- `colorkit` — [ColorKit](https://colorskit.vercel.app/)
- `shadestudio` — [ShadeStudio](https://laura.media/shade-studio/)
- `planar` — [Planar](https://planar.masn.studio)
- `dither` — [dither](https://dither.fuego.im/)
- `image-to-unicodeascii-generator` — [Image to UnicodeASCII Generator](https://reactorcore.itch.io/image-to-unicodeascii-generator)

### Development (`development`, 58 tools)

- `drawdb` — [drawDB](https://www.drawdb.app)
- `visual-studio-code-for-the-web` — [Visual Studio Code for the Web](https://vscode.dev/)
- `hoppscotch` — [hoppscotch](https://hoppscotch.io/)
- `algorithm-visualizer` — [Algorithm Visualizer](https://algorithm-visualizer.org/)
- `json-crack` — [JSON Crack](https://jsoncrack.com/)
- `it-tools` — [IT-Tools](https://it-tools.tech/)
- `carbon` — [carbon](https://carbon.now.sh/)
- `feather` — [Feather](https://feathericons.com/)
- `simple-icons` — [Simple Icons](https://simpleicons.org/)
- `heroicons` — [heroicons](https://heroicons.com/)
- `lucide` — [Lucide](https://lucide.dev/)
- `tabler-icons` — [Tabler Icons](https://tabler.io/icons)
- `ffmpegwasm` — [ffmpeg.wasm](https://ffmpegwasm.netlify.app/playground)
- `explainshellcom` — [explainshell.com](https://explainshell.com/)
- `markmap` — [Markmap](https://markmap.js.org/)
- `quickrefme` — [QuickRef.ME](https://quickref.me/)
- `regexr` — [RegExr](https://regexr.com/)
- `bundlephobia` — [Bundlephobia](https://bundlephobia.com/)
- `transform` — [Transform](https://transform.tools/)
- `remix-icons` — [Remix Icons](https://remixicon.com/)
- `phosphor-icons` — [Phosphor Icons](https://ionic.io/ionicons)
- `mermaid-live` — [Mermaid Live](https://mermaid.live)
- `ast-explorer` — [AST explorer](https://astexplorer.net/)
- `svgomg` — [SVGOMG](https://jakearchibald.github.io/svgomg/)
- `iconoir` — [Iconoir](https://iconoir.com/)
- `openmoji` — [OpenMoji](https://openmoji.org/library/)
- `js-bin` — [JS Bin](https://jsbin.com)
- `kroki` — [Kroki](https://kroki.io/#try)
- `codegraphcontext-cgc` — [CodeGraphContext (CGC)](https://cgc.codes/explore)
- `circuitjs1` — [CircuitJS1](https://www.falstad.com/circuit/)
- `dart-pad` — [DartPad](https://dartpad.dev)
- `gitfut` — [GitFut](https://gitfut.com/)
- `online-tools` — [Online tools](https://emn178.github.io/online-tools/)
- `rom-patcher-js` — [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/)
- `kicanvas` — [KiCanvas](https://kicanvas.org/)
- `sqlime` — [Sqlime](https://sqlime.org/)
- `selfh-st-icons` — [selfh.st Icons](https://selfh.st/icons/)
- `checkmygit` — [CheckMyGit](https://checkmygit.com/)
- `delphitools` — [delphitools](https://delphi.tools/)
- `openhero` — [Openhero](https://openhero.art/)
- `asm-editor` — [ASM Editor](https://asm-editor.specy.app)
- `python-tutor` — [Python Tutor](https://pythontutor.com)
- `log-voyager` — [Log Voyager](https://www.logvoyager.cc/)
- `niolesk` — [Niolesk](niolesk.top)
- `gistssh` — [gists.sh](https://gists.sh/)
- `rooc-optimization` — [ROOC Optimization](https://rooc.specy.app/)
- `tokeko` — [Tokeko](https://tokeko.specy.app/)
- `ffmpeg-cli-online` — [FFmpeg CLI Online](https://ffmpeg.wide.video)
- `verisim` — [VeriSim](https://senolgulgonul.github.io/verisim/)
- `app-store-web-search` — [App Store Web Search](https://vexelon.net/asws)
- `codemap-ai` — [CodeMap AI](https://code-map-ai-mu.vercel.app/)
- `csv-repair` — [CSV Repair](https://www.csv.repair/)
- `gately` — [Gately](https://www.gately.dev/)
- `online-maven-download-tool` — [Online Maven Download Tool](https://maven-tools.mohants.com/)
- `scratch-tabs` — [Scratch Tabs](https://app.scratchtabs.com/)
- `faviconapi` — [FaviconAPI](https://faviconapi.com)
- `opencode-config-builder` — [OpenCode Config Builder](https://openconfig.mikescave.us)
- `beziermotion` — [BezierMotion](https://tughloks.github.io/BezierMotion/)

### Writing & Docs (`writing`, 17 tools)

- `stackedit` — [StackEdit](https://stackedit.io)
- `affine` — [AFFiNE](https://affine.pro/)
- `logseq` — [Logseq](https://logseq.com/)
- `koodo-reader` — [Koodo Reader](https://web.koodoreader.com/)
- `dillinger` — [Dillinger](https://dillinger.io)
- `lookscanned` — [lookscanned](https://lookscanned.io)
- `linwood-butterfly` — [Linwood Butterfly](https://web.butterfly.linwood.dev/)
- `universal-résumé-template` — [Universal Résumé Template](https://universalresume.app/?s=g)
- `markdown-live-preview` — [Markdown Live Preview](https://markdownlivepreview.com)
- `notepad-pwa` — [Notepad PWA](https://notepad.js.org)
- `ddocs` — [dDocs](https://ddocs.new/)
- `browserpad` — [Browserpad](https://browserpad.org)
- `free-cv-builder` — [Free CV Builder](https://buildmyfree.cv/)
- `easypeasycv` — [EasyPeasyCV](https://easypeasycv.com/)
- `strong-editor` — [Strong Editor](https://strongeditor.com/)
- `editorpilot` — [EditorPilot](https://editorpilot.com/)
- `goatpad` — [GoatPad](https://goatpad.drexfall.com/)

### Privacy & Security (`privacy`, 8 tools)

- `privacy-sexy` — [privacy.sexy](https://privacy.sexy)
- `cyberchef` — [CyberChef](https://gchq.github.io/CyberChef/)
- `cryptii` — [Cryptii](https://cryptii.com)
- `cryptgeon` — [Cryptgeon](https://cryptgeon.com/)
- `image-scrubber` — [image-scrubber](https://everestpipkin.github.io/image-scrubber/)
- `metadata-remover` — [Metadata Remover](https://ianonymous3000.github.io/metadata-remover/)
- `protegemidni` — [ProtegeMiDNI](https://protegemidni.es)
- `shareclean` — [ShareClean](https://omarh-creator.github.io/ShareClean/#playground)

### Utilities (`utilities`, 37 tools)

- `pairdrop` — [PairDrop](https://pairdrop.net/)
- `localsend-web` — [LocalSend-Web](https://web.localsend.org/)
- `ente-paste` — [ente Paste](https://paste.ente.com/)
- `readest` — [Readest](https://web.readest.com/)
- `vert` — [VERT](https://vert.sh/)
- `convert` — [Convert To It](http://convert.to.it/)
- `spliit` — [Spliit](https://spliit.app/)
- `enclosed` — [Enclosed](https://enclosed.cc/)
- `paperknife` — [PaperKnife](https://potatameister.github.io/PaperKnife/)
- `filedrop` — [FileDrop](https://drop.lol/)
- `qrcodeshow` — [QrCodeShow](https://qrcode.show/)
- `qrazybox` — [QRazyBox](https://merricx.github.io/qrazybox/)
- `e2ecp` — [e2ecp](https://e2ecp.com)
- `brouter-web` — [BRouter-web](https://brouter.de/brouter-web/)
- `openreader` — [OpenReader](https://openreader.richardr.dev/app)
- `sharr` — [Sharr](https://www.sharrr.com/)
- `cheezypizza` — [CheezyPizza](https://file.pizza/)
- `gridfinity-layout-tool` — [Gridfinity Layout Tool](https://gridfinitylayouttool.com)
- `giraffile` — [Giraffile](https://giraffile.pages.dev/)
- `webtorio` — [Webtor.io](https://webtor.io/)
- `clip-fish` — [Clip Fish](https://clip.fish/)
- `kpaste` — [kPaste](https://kpaste.infomaniak.com/)
- `owncardly` — [OwnCardly](https://owncardly.com/)
- `texturinator` — [Texturinator](https://texturinator.buttermilch-dev.de/)
- `open-razerkit` — [Open-RazerKit](https://hamzayslmn.github.io/open-razerkit/)
- `pandoc-wasm` — [Pandoc WASM](https://pandoc.github.io/pandoc-wasm/)
- `toolsatzero` — [ToolsAtZero](https://www.toolsatzero.com/)
- `oscilloscope-online-v2` — [Oscilloscope Online V2](https://mumarshahbaz.github.io/Oscilloscope-Online-V2/setup.html)
- `dropsilk` — [DropSilk](https://www.dropsilk.xyz/)
- `daggerheart-gm-screen` — [Daggerheart GM Screen](https://jutier.github.io/Daggerheart/)
- `jobber` — [Jobber](https://rssjobs.app/)
- `relay` — [Relay](https://relay.rishishah.in)
- `zkdrop` — [zkdrop](https://zkdrop.org)
- `xipe` — [xipe](https://xi.pe/)
- `ul0` — [Ul0](https://ul0.site)
- `qtransfer` — [qTransfer](https://transfer-cv5.pages.dev/)
- `enumbers-lookup` — [enumbers lookup](https://enumbers.jarvisdiscordbot.net/)

### Data & Analytics (`data`, 9 tools)

- `world-monitor` — [World Monitor](https://www.worldmonitor.app/)
- `rawgraphs` — [RAWGraphs](https://app.rawgraphs.io)
- `osiris` — [OSIRIS](https://www.osirisai.live/)
- `mr-data-converter` — [Mr. Data Converter](https://shancarter.github.io/mr-data-converter/)
- `datasette-lite` — [Datasette Lite](https://lite.datasette.io)
- `sqlchef` — [SQLChef](https://jonathanwalker.github.io/SQLChef/)
- `schema3d` — [Schema3D](https://schema3d.com/)
- `satvisor` — [Satvisor](https://satvisor.com/)
- `grade-boundaries` — [Grade Boundaries](https://gradeboundaries.com)

### Media (`media`, 19 tools)

- `opencut` — [OpenCut](https://opencut.app)
- `cobalt` — [Cobalt](https://cobalt.tools/)
- `squoosh` — [Squoosh](https://squoosh.app/)
- `subtitleedit` — [SubtitleEdit](https://www.nikse.dk/subtitleedit/online)
- `openreel` — [OpenReel](https://openreel.video/)
- `audiomass` — [AudioMass](https://audiomass.co/)
- `image-max-url` — [Image Max URL](https://qsniyg.github.io/maxurl/)
- `freecut` — [FreeCut](https://freecut.net)
- `openvid` — [Openvid](https://openvid.dev/en)
- `omniclip` — [OmniClip](https://omniclip.app/)
- `mini-photoeditor` — [MiNi PhotoEditor](https://mini2-photo-editor.netlify.app/)
- `wavacity` — [Wavacity](https://wavacity.com/)
- `compress` — [Compress](https://videocompress.prolab.sh/)
- `drumhaus` — [Drumhaus](https://drumha.us/)
- `composeyogi` — [ComposeYogi](https://composeyogi.com/)
- `midee` — [Midee](https://midee.app/)
- `greendolphin` — [GreenDolphin](https://greendolph.in)
- `clearcanvas-ai` — [ClearCanvas AI](https://clearcanvasai.vercel.app/)
- `s-2-v` — [s-2-v](https://s-2-v.pages.dev/)

### Education (`education`, 5 tools)

- `roadmapssh` — [Roadmaps.sh](https://roadmap.sh/)
- `full-stack-open` — [Full Stack open](https://fullstackopen.com/en/)
- `agora-cosmica` — [Agora Cosmica](https://agoracosmica.org)
- `quizbun` — [Quizbun](https://a-dev.github.io/quizbun/)
- `the-missing-manual` — [The Missing Manual](https://themissingmanual.dev)

### Lists (`lists`, 3 tools)

- `free-fordev` — [free-for.dev](https://free-for.dev/#/)
- `osint-framework` — [OSINT Framework](https://osintframework.com/)
- `freemediaheckyeah` — [freemediaheckyeah](https://fmhy.net/)
<!-- END GENERATED TOOL LIST -->
