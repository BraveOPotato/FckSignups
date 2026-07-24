import { useEffect, useMemo, useState } from "react";
import {
  DEV_JSON_URL,
  FALLBACK_DATA,
  PROD_JSON_URL,
} from "../constants/fallbackData";
import type { Category, LoadStatus, Tool, ToolsData } from "../types";

export interface ToolSections {
  featured: Tool[];
  editorsPicks: Tool[];
  meetsCriteria: Tool[];
}

interface UseToolsReturn {
  tools: Tool[];
  filteredTools: Tool[];
  sections: ToolSections;
  categories: Category[];
  loadStatus: LoadStatus;
  errorMessage: string;
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (id: string) => void;
}

export function useTools(): UseToolsReturn {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function load() {
      setLoadStatus("loading");
      let data: ToolsData | null = null;
      let error = "";

      if (import.meta?.env?.DEV) {
        data = await loadTools(DEV_JSON_URL);
      }

      // Try loading data from GITHUB if not loaded yet.
      if (!data) data = await loadTools(PROD_JSON_URL);

      // If all fails, load fallback data
      if (!data) {
        data = FALLBACK_DATA;
        error = `Failed to get the freshest data from prod`;
        setErrorMessage(error);
      }

      hydrate(data, error);
    }
    load();
  }, []);

  function hydrate(data: ToolsData, error: string) {
    const cats = data.categories ?? [];
    if (!cats.find((c) => c.id === "all")) {
      cats.unshift({
        id: "all",
        name: "All",
        icon: "◈",
        description: "All tools",
      });
    }
    // Legacy schema fallback: tools.json fetched from prod may still carry
    // the old `featured` boolean instead of `section`.
    const tools = (data.tools ?? []).map((t) => {
      if (t.section) return t;
      const legacy = t as Tool & { featured?: boolean };
      return {
        ...t,
        section: legacy.featured ? "featured" : "meets-criteria",
      } satisfies Tool;
    });
    setAllTools(tools);
    setCategories(cats);
    setLoadStatus(!error ? "success" : "error");
  }

  const filteredTools = useMemo(() => {
    const keywords = tokenize(searchQuery);
    return allTools
      .map((tool) => ({ tool, score: matchScore(tool, keywords) }))
      .filter(({ tool, score }) => {
        const matchCat =
          activeCategory === "all" || tool.category === activeCategory;
        return matchCat && (keywords.length === 0 || score > 0);
      })
      .sort(
        (a, b) =>
          b.score - a.score || (b.tool.stars ?? 0) - (a.tool.stars ?? 0),
      )
      .map(({ tool }) => tool);
  }, [allTools, activeCategory, searchQuery]);

  const sections = useMemo<ToolSections>(
    () => ({
      featured: filteredTools.filter((t) => t.section === "featured"),
      editorsPicks: filteredTools.filter((t) => t.section === "editors-pick"),
      meetsCriteria: filteredTools.filter(
        (t) => t.section !== "featured" && t.section !== "editors-pick",
      ),
    }),
    [filteredTools],
  );

  return {
    tools: allTools,
    filteredTools,
    sections,
    categories,
    loadStatus,
    errorMessage,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
  };
}

// Split text into lowercase alphanumeric keywords, so "video-editor",
// "Video Editor" and "video_editor" all yield ["video", "editor"].
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter(Boolean);
}

// Number of query keywords found in the tool's name, description, or tags.
function matchScore(tool: Tool, keywords: string[]): number {
  if (keywords.length === 0) return 0;
  const haystack = [tool.name, tool.description, ...tool.tags]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, " ");
  return keywords.filter((kw) => haystack.includes(kw)).length;
}

async function loadTools(JSON_URL: string): Promise<ToolsData | null> {
  try {
    const res = await fetch(JSON_URL);
    if (!res.ok) throw new Error(`Failed to get data from ${JSON_URL}`);
    return (await res.json()) as ToolsData;
  } catch (err) {
    console.error(`Couldn't parse tools from: ${JSON_URL}`, err);
    return null;
  }
}
