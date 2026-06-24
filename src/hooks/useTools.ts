import { useState, useEffect, useMemo } from "react";
import type { Tool, Category, LoadStatus, ToolsData } from "../types";
import {
  FALLBACK_DATA,
  DEV_JSON_URL,
  PROD_JSON_URL,
} from "../constants/fallbackData";

interface UseToolsReturn {
  tools: Tool[];
  filteredTools: Tool[];
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
      // Try loading the local dev JSON for testing.
      let data = await loadTools(DEV_JSON_URL);
      let error = "";
      // Try loading data from GITHUB.
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
    setAllTools(data.tools ?? []);
    setCategories(cats);
    setLoadStatus(!error ? "success" : "error");
  }

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allTools
      .filter((t) => {
        const matchCat =
          activeCategory === "all" || t.category === activeCategory;
        const matchSearch =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchCat && matchSearch;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.stars ?? 0) - (a.stars ?? 0);
      });
  }, [allTools, activeCategory, searchQuery]);

  return {
    tools: allTools,
    filteredTools,
    categories,
    loadStatus,
    errorMessage,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
  };
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
