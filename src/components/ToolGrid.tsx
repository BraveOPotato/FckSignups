import type { Tool, Category, LoadStatus } from "../types";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  categories: Category[];
  loadStatus: LoadStatus;
  errorMessage: string;
}

export function ToolGrid({
  tools,
  categories,
  loadStatus,
  errorMessage,
}: ToolGridProps) {
  if (loadStatus === "loading") {
    return (
      <main className="grid">
        <div className="loading">Initializing index</div>
      </main>
    );
  }

  if (tools.length === 0) {
    return (
      <main className="grid">
        <div className="empty">
          <h3>NO MATCHES FOUND</h3>
          <p>Try a different search term or category filter.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="grid">
      {loadStatus == "error" && (
        <div className="error">
          <h3>ERR_LOAD_FAILED</h3>
          <p>{errorMessage}</p>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
            Falling back to embedded dataset...
          </p>
        </div>
      )}

      {tools.map((tool, idx) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          index={idx + 1}
          category={categories.find((c) => c.id === tool.category)}
        />
      ))}
    </main>
  );
}
