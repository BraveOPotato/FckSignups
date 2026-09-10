export type ToolSection = "featured" | "editors-pick" | "meets-criteria";

export type ToolFlag = "new" | "abandoned";

export type SortOption = "default" | "newest" | "oldest";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  github?: string;
  license?: string;
  stars?: number;
  section?: ToolSection;
  flag?: ToolFlag;
  addedAt?: string;
  notRecommendedReason?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ToolsData {
  categories: Category[];
  tools: Tool[];
}

export type LoadStatus = "idle" | "loading" | "success" | "error";
