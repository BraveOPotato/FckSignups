import { useCallback, useRef } from "react";
import type { Category, Tool } from "../types";

interface ControlsProps {
  categories: Category[];
  activeCategory: string;
  searchQuery: string;
  allTools: Tool[];
  filteredCount: number;
  onCategoryChange: (id: string) => void;
  onSearchChange: (q: string) => void;
}

export function Controls({
  categories,
  activeCategory,
  searchQuery,
  allTools,
  filteredCount,
  onCategoryChange,
  onSearchChange,
}: ControlsProps) {
  // Count tools per category for badge
  const counts: Record<string, number> = { all: allTools.length };
  allTools.forEach((t) => {
    counts[t.category] = (counts[t.category] ?? 0) + 1;
  });

  return (
    <div className="controls">
      <div className="controls-inner">
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tools by name, tag, or description..."
            autoComplete="off"
            aria-label="Search tools"
          />
        </div>

        <div
          className="categories"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn${cat.id === activeCategory ? " active" : ""}`}
              data-id={cat.id}
              title={cat.description}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.icon} {cat.name}
              <span className="count">
                {String(counts[cat.id] ?? 0).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div className="results-count" aria-live="polite">
          SHOWING {String(filteredCount).padStart(2, "0")} OF{" "}
          {String(allTools.length).padStart(2, "0")} TOOLS
        </div>
      </div>
    </div>
  );
}
