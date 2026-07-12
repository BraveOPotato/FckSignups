import type { Tool, Category } from "../types";
import { ExternalIcon, GitHubIcon, StarIcon } from "../constants/icons";
import { formatStars } from "../utils/formatters";
import { useReport } from "../hooks/useReport";
import { useModal } from "../hooks/useModal";
import { Toast } from "./Toast";
import { useState } from "react";

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
          {tool.featured && <span className="featured-badge">Featured</span>}
          {tool.notRecommendedReason !== undefined && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleTimedToast();
              }}
              title={tool.notRecommendedReason}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-alert-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          )}
        </div>

        <p className="card-desc">{tool.description}</p>

        <div className="card-tags">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery(tag);
              }}
            >
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
              onClick={(e) => e.stopPropagation()}
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
    </>
  );
}
