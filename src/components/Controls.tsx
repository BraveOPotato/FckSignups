import type { Category, Tool } from "../types";

interface ControlsProps {
  categories: Category[];
  activeCategory: string;
  searchQuery: string;
  allTools: Tool[];
  filteredCount: number;
  sortBy: string;
  onCategoryChange: (id: string) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: string) => void;
}

export function Controls({
  categories,
  activeCategory,
  searchQuery,
  allTools,
  filteredCount,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
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
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tools by name, tag, or description..."
            aria-label="Search tools by name, tag, or description"
            autoComplete="off"
          />
        </div>

        <div
          className="categories"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const isCurrent = cat.id === activeCategory;
            const countNum = counts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                className={`cat-btn${isCurrent ? " active" : ""}`}
                data-id={cat.id}
                title={cat.description}
                aria-pressed={isCurrent}
                aria-label={`${cat.name}, ${countNum} tools`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.name}
                <span className="count" aria-hidden="true">
                  {String(countNum).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="results-toolbar">
          <div className="results-count" aria-live="polite">
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

          <div className="sort-controls">
            <label htmlFor="sort-select">SORT BY</label>

            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}