import { useEffect, useState } from "react";
import type { ToolSections } from "../hooks/useTools";
import type { Tool, Category, LoadStatus } from "../types";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  sections: ToolSections;
  searchKeywords: string[];
  isSearching: boolean;
  categories: Category[];
  loadStatus: LoadStatus;
  errorMessage: string;
  searchQuery: string;
  activeCategory: string;
  sortBy: string;
  setSearchQuery: (query: string) => void;
}

export function ToolGrid({
  sections,
  searchKeywords,
  isSearching,
  categories,
  loadStatus,
  errorMessage,
  searchQuery,
  activeCategory,
  sortBy,
  setSearchQuery,
}: ToolGridProps) {
  const [showMore, setShowMore] = useState(false);

  // Collapse "Meets Criteria" again whenever the filters change
  useEffect(() => {
    setShowMore(false);
  }, [searchQuery, activeCategory]);

  if (loadStatus === "loading") {
    return (
      <main className="grid">
        <div className="loading">Initializing index</div>
      </main>
    );
  }

  const { featured, editorsPicks, meetsCriteria } = sections;
  const totalCount = featured.length + editorsPicks.length + meetsCriteria.length;

  if (totalCount === 0) {
    return (
      <main className="grid">
        <div className="empty">
          <h3>NO MATCHES FOUND</h3>
          <p>Try a different search term or category filter.</p>
        </div>
      </main>
    );
  }

  // Meets Criteria stays behind "Show More" only while browsing
  const hasCurated = featured.length > 0 || editorsPicks.length > 0;
  const meetsExpanded = !hasCurated || showMore;

  return (
    <main className="tool-sections" id="main-content">
      {loadStatus == "error" && (
        <div className="error">
          <h3>ERR_LOAD_FAILED</h3>
          <p>{errorMessage}</p>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
            Falling back to embedded dataset...
          </p>
        </div>
      )}

          <>
            {featured.length > 0 && (
              <Section
                label="Featured"
                variant="featured"
                tools={featured}
                categories={categories}
                searchKeywords={searchKeywords}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
              />
            )}

            {editorsPicks.length > 0 && (
              <Section
                label="Editor's Picks"
                variant="editors"
                tools={editorsPicks}
                categories={categories}
                searchKeywords={searchKeywords}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
              />
            )}

            {meetsCriteria.length > 0 &&
              ((meetsExpanded || isSearching)? (
                <Section
                  label="Meets Criteria"
                  variant="meets"
                  tools={meetsCriteria}
                  categories={categories}
                  searchKeywords={searchKeywords}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                />
              ) : (
                <div className="show-more-wrap">
                  <button
                    type="button"
                    className="show-more-btn"
                    onClick={() => setShowMore(true)}
                  >
                    <strong>Show More </strong><br/>{meetsCriteria.length} more{" "}
                    {meetsCriteria.length === 1 ? "tool meets" : "tools meet"}{" "}
                    the criteria
                  </button>
                </div>
              ))}
          </>
    </main>
  );
}

interface SectionProps {
  label: string;
  variant: "featured" | "editors" | "meets";
  tools: Tool[];
  categories: Category[];
  searchKeywords: string[];
  setSearchQuery: (query: string) => void;
  sortBy: string;
}

function Section({
  label,
  variant,
  tools,
  categories,
  searchKeywords,
  setSearchQuery,
  sortBy,
}: SectionProps) {
  const sortedTools = [...tools];

  if (sortBy === "newest") {
    sortedTools.sort(
      (a, b) =>
        new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  } else if (sortBy === "oldest") {
    sortedTools.sort(
      (a, b) =>
        new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
    );
  }

  return (
    <section className={`tool-section tool-section--${variant}`}>
      <div className="section-divider">{label}</div>
      <div className="grid border-glow">
        {sortedTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            category={categories.find((c) => c.id === tool.category)}
            searchKeywords={searchKeywords}
            setSearchQuery={setSearchQuery}
          />
        ))}
      </div>
    </section>
  );
}
