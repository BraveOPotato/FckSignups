import { useState } from "react";
import {
  ExternalIcon,
  GitHubIcon,
  StarIcon,
} from "../../../../constants/icons";
import { useModal } from "../../../../hooks/useModal";
import { useReport } from "../../../../hooks/useReport";
import type { Category, Tool } from "../../../../types";
import { formatStars } from "../../../../utils/formatters";
import { highlightMatches } from "../../../../utils/highlight";
import { Toast } from "../../../Shared/Feedback/Toast/Toast";
import s from "./ToolCard.module.css";

interface ToolCardProps {
  tool: Tool;
  category: Category | undefined;
  searchKeywords?: string[];
  setSearchQuery: (query: string) => void;
}

export function ToolCard({
  tool,
  category,
  searchKeywords = [],
  setSearchQuery,
}: ToolCardProps) {
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
        className={[
          s.card,
          tool.section === "featured" ? s.cardFeatured : "",
          tool.notRecommendedReason !== undefined ? s.cardNotRecommended : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-highlighted={reportMode}
        onClick={() =>
          reportMode
            ? handleReport(tool)
            : window.open(tool.url, "_blank", "noopener,noreferrer")
        }
      >
        <div className={s.cardHeader}>
          <div className={s.cardTitleWrap}>
            <div className={s.titleWrapper}>
              <div className={s.cardCategoryIcon} data-category={tool.category}>
                <span>{cat.icon}</span>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.cardTitle}
              >
                {highlightMatches(tool.name, searchKeywords)}
                <ExternalIcon />
              </a>
            </div>

            {tool.notRecommendedReason !== undefined && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleTimedToast();
                }}
                title={tool.notRecommendedReason}
              >
                <svg className={s.featherAlertCircle} aria-hidden="true">
                  <use href="/icons-sprite.svg#exclamation-mark" />
                </svg>
              </div>
            )}
          </div>

          <div className={s.toolBadges}>
            {tool.flag === "abandoned" && (
              <span
                className={`${s.flagBadge} ${s.flagAbandoned}`}
                title="This project is no longer maintained"
              >
                Abandoned
              </span>
            )}
            {tool.section === "editors-pick" && (
              <span className={s.editorsBadge}>Editor's Pick</span>
            )}
            {tool.section === "featured" && (
              <span className={s.featuredBadge}>Featured</span>
            )}
            {tool.flag === "new" && (
              <span
                className={`${s.flagBadge} ${s.flagNew}`}
                title="Brand new project"
              >
                New
              </span>
            )}
          </div>
        </div>

        <p className={s.cardDesc}>
          {highlightMatches(tool.description, searchKeywords)}
        </p>

        <ul className={s.cardTags}>
          {tool.tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                className={s.tag}
                aria-label={`Filter tools by ${tag.replace(/-/g, " ")}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery(tag);
                }}
              >
                #{highlightMatches(tag, searchKeywords)}
              </button>
            </li>
          ))}
        </ul>

        <div className={s.cardFooter}>
          <div className={s.footerLeft}>
            <span className={s.categoryPill}>
              {cat.icon} {cat.name}
            </span>
            {!!tool.stars && (
              <span className={s.stars}>
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
              className={s.ghLink}
              title={`View ${tool.name} repository on GitHub`}
              aria-label={`View ${tool.name} repository on GitHub`}
            >
              <GitHubIcon />
              {tool.license ?? "SRC"}
            </a>
          ) : (
            <span className={s.webOnly}>WEB_ONLY</span>
          )}
        </div>
      </article>
    </>
  );
}
