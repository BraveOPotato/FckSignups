// Regenerates the tool list embedded in public/llms.txt and AGENTS.md from
// tools.json. Runs automatically as part of `npm run build`; can also be run
// directly with `npm run generate:llms`.
//
// Both files keep their hand-written prose; this script only rewrites the
// block between the BEGIN/END GENERATED TOOL LIST markers.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BEGIN = "<!-- BEGIN GENERATED TOOL LIST -->";
const END = "<!-- END GENERATED TOOL LIST -->";

const { categories, tools } = JSON.parse(
  readFileSync(resolve(ROOT, "tools.json"), "utf8"),
);

// Mirror the site's sorting: featured first, then by stars.
function byFeaturedThenStars(a, b) {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return (b.stars ?? 0) - (a.stars ?? 0);
}

function toolsOf(categoryId) {
  return tools.filter((t) => t.category === categoryId).sort(byFeaturedThenStars);
}

// Full list for llms.txt: linked name, description, optional source link,
// and a warning for tools flagged as not recommended.
function llmsBlock() {
  const lines = [
    `The full directory (${tools.length} tools, ${categories.length} categories) follows. This block is auto-generated from tools.json at build time.`,
  ];
  for (const cat of categories) {
    const catTools = toolsOf(cat.id);
    if (catTools.length === 0) continue;
    lines.push("", `## ${cat.name}`, "", cat.description, "");
    for (const t of catTools) {
      let line = `- [${t.name}](${t.url}): ${t.description}`;
      if (t.github) line += ` ([source](${t.github})${t.license ? `, ${t.license}` : ""})`;
      if (t.notRecommendedReason) line += ` — ⚠️ not recommended: ${t.notRecommendedReason}`;
      lines.push(line);
    }
  }
  return lines.join("\n");
}

// Compact index for AGENTS.md: enough to spot duplicates before adding a tool.
function agentsBlock() {
  const lines = [
    `${tools.length} tools across ${categories.length} categories, generated from tools.json. Check here before adding a tool to avoid duplicates.`,
  ];
  for (const cat of categories) {
    const catTools = toolsOf(cat.id);
    if (catTools.length === 0) continue;
    lines.push("", `### ${cat.name} (\`${cat.id}\`, ${catTools.length} tools)`, "");
    for (const t of catTools) {
      lines.push(`- \`${t.id}\` — [${t.name}](${t.url})`);
    }
  }
  return lines.join("\n");
}

function injectBlock(path, block) {
  const src = readFileSync(path, "utf8");
  const begin = src.indexOf(BEGIN);
  const end = src.indexOf(END);
  if (begin === -1 || end === -1 || end < begin) {
    throw new Error(`Markers "${BEGIN}" / "${END}" not found in ${path}`);
  }
  const out =
    src.slice(0, begin + BEGIN.length) + "\n" + block + "\n" + src.slice(end);
  writeFileSync(path, out);
  console.log(`Updated ${relative(ROOT, path)}`);
}

injectBlock(resolve(ROOT, "public/llms.txt"), llmsBlock());
injectBlock(resolve(ROOT, "AGENTS.md"), agentsBlock());
console.log(`Embedded ${tools.length} tools in ${categories.length} categories.`);
