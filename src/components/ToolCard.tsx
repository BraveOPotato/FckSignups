import { useState } from "react";
import { ExternalIcon, GitHubIcon, StarIcon } from "../constants/icons";
import { useModal } from "../hooks/useModal";
import { useReport } from "../hooks/useReport";
import type { Category, Tool } from "../types";
import { formatStars } from "../utils/formatters";
import { Toast } from "./Toast";

interface ToolCardProps {
  tool: Tool;
  category: Category | undefined;
  setSearchQuery: (query: string) => void;
}

export function ToolCard({ tool, category, setSearchQuery }: ToolCardProps) {
  const cat: Pick<Category, "icon" | "name"> = category ?? {
    icon: "◉",
    name: tool.category,
  };
  const { reportMode } = useReport();
  const { showModalWithID } = useModal();
  const [toastVisible, setToastVisible] = useState(false);

  function handleReport(tool: Tool) {
    showModalWithID("report-tool", { toolId: tool.id });
  }

  // Handle removing the toast container afte ra certain timeout
  function handleTimedToast() {
    setToastVisible(!toastVisible);

    if (!toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    }
  }

  return (
    <>
      {toastVisible && tool.notRecommendedReason !== undefined && (
        <Toast
          innerText={tool.notRecommendedReason}
          onExit={() => setToastVisible(false)}
        />
      )}
      <article
        className={
          "card" +
          (tool.section === "featured" ? " featured" : "") +
          (tool.notRecommendedReason !== undefined ? " not-recommended" : "") // if there the key exists in the object
        }
        data-highlighted={reportMode}
        onClick={() =>
          reportMode
            ? handleReport(tool)
            : window.open(tool.url, "_blank", "noopener,noreferrer")
        }
      >
        <div className="card-header">
          <div className="card-title-wrap">
            <div className="card-category-icon" data-category={tool.category}>
              <span>{cat.icon}</span>
            </div>
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

          <div>
            {tool.section === "featured" && (
              <span className="featured-badge">Featured</span>
            )}
            {tool.section === "editors-pick" && (
              <span className="editors-badge">Editor's Pick</span>
            )}
            {tool.flag === "new" && (
              <span className="flag-badge flag-new" title="Brand new project">
                New
              </span>
            )}
            {tool.flag === "abandoned" && (
              <span
                className="flag-badge flag-abandoned"
                title="This project is no longer maintained"
              >
                Abandoned
              </span>
            )}
            {tool.notRecommendedReason !== undefined && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleTimedToast();
                }}
                title={tool.notRecommendedReason}
              >
                <svg className="feather-alert-circle" aria-hidden="true">
                  <use href="/icons-sprite.svg#exclamation-mark" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <p className="card-desc">{tool.description}</p>

        <ul className="card-tags">
          {tool.tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                className="tag"
                aria-label={`Filter tools by ${tag.replace(/-/g, " ")}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery(tag);
                }}
              >
                #{tag}
              </button>
            </li>
          ))}
        </ul>

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
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              className="gh-link"
              title={`View ${tool.name} repository on GitHub`}
              aria-label={`View ${tool.name} repository on GitHub`}
            >
              <GitHubIcon />
              {tool.license ?? "SRC"}
            </a>
          ) : (
            <span className="web-only">WEB_ONLY</span>
          )}
        </div>
      </article>
    </>
  );
}
