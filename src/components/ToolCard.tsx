import type { Tool, Category } from "../types";
import { ExternalIcon, GitHubIcon, StarIcon } from "../constants/icons";
import { formatStars, padIndex } from "../utils/formatters";

interface ToolCardProps {
  tool: Tool;
  index: number;
  category: Category | undefined;
  setSearchQuery: (query: string) => void;
}

export function ToolCard({
  tool,
  index,
  category,
  setSearchQuery,
}: ToolCardProps) {
  const cat = category ?? { icon: "◉", name: tool.category };

  return (
    <article className="card">
      <div className="card-index">
        INDEX_{padIndex(index)} // {tool.id.toUpperCase()}
      </div>

      <div className="card-header">
        <div className="card-title-wrap">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title"
          >
            {tool.name}
            <ExternalIcon />
          </a>
        </div>
        {tool.featured && <span className="featured-badge">Featured</span>}
      </div>

      <p className="card-desc">{tool.description}</p>

      <div className="card-tags">
        {tool.tags.map((tag) => (
          <span key={tag} className="tag" onClick={() => setSearchQuery(tag)}>
            #{tag}
          </span>
        ))}
      </div>

      <div className="card-footer">
        <div className="footer-left">
          <span className="category-pill">
            {cat.icon} {cat.name}
          </span>
          {!!tool.stars && (
            <span className="stars">
              <StarIcon />
              {formatStars(tool.stars)}
            </span>
          )}
        </div>

        {tool.github ? (
          <a
            href={tool.github}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-link"
            title="View source on GitHub"
          >
            <GitHubIcon />
            {tool.license ?? "SRC"}
          </a>
        ) : (
          <span className="web-only">WEB_ONLY</span>
        )}
      </div>
    </article>
  );
}
