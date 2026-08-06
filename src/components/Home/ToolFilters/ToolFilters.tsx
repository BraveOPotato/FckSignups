import type { Category, Tool } from "../../../types";
import s from "./ToolFilters.module.css";

interface ToolFiltersProps {
  categories: Category[];
  activeCategory: string;
  searchQuery: string;
  allTools: Tool[];
  filteredCount: number;
  onCategoryChange: (id: string) => void;
  onSearchChange: (q: string) => void;
}

export function ToolFilters({
  categories,
  activeCategory,
  searchQuery,
  allTools,
  filteredCount,
  onCategoryChange,
  onSearchChange,
}: ToolFiltersProps) {
  // Count tools per category for badge
  const counts: Record<string, number> = { all: allTools.length };
  allTools.forEach((t) => {
    counts[t.category] = (counts[t.category] ?? 0) + 1;
  });

  return (
    <div className={s.controls}>
      <div className={s.controlsInner}>
        <div className={s.searchBox}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tools by name, tag, or description..."
            aria-label="Search tools by name, tag, or description"
            autoComplete="off"
          />
        </div>

        <div
          className={s.categories}
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const isCurrent = cat.id === activeCategory;
            const countNum = counts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                className={`${s.catBtn} ${isCurrent ? s.active : ""}`}
                data-id={cat.id}
                title={cat.description}
                aria-pressed={isCurrent}
                aria-label={`${cat.name}, ${countNum} tools`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.name}
                <span className={s.count} aria-hidden="true">
                  {String(countNum).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className={s.resultsCount} aria-live="polite">
          SHOWING{" "}
          <span className="white">
            {String(filteredCount).padStart(2, "0")}
          </span>{" "}
          OF{" "}
          <span className="white">
            {String(allTools.length).padStart(2, "0")}
          </span>{" "}
          TOOLS
        </div>
      </div>
    </div>
  );
}
