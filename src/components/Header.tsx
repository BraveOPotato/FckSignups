import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FALLBACK_REPO_STARS } from "../constants/fallbackData";
import { REPO_URL } from "../constants/global";
import { useModal } from "../hooks/useModal";

interface HeaderProps {
  toolCount: number;
  categoryCount: number;
  setSearchQuery: (query: string) => void;
}

export function Header({
  toolCount,
  categoryCount,
  setSearchQuery,
}: HeaderProps) {
  const { showModalWithID } = useModal();
  const [starsCount, setStarsCount] = useState("????");

  useEffect(() => {
    setRepoStars(setStarsCount);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="stars-button-container">
          <a
            href="https://github.com/BraveOPotato/FckSignups"
            target="_blank"
            rel="noopener noreferrer"
            className="submit-tool-button stars-button"
            aria-label={`GitHub repository, current stars: ${starsCount}`}
          >
            {starsCount}
            <svg className="star-svg" aria-hidden="true">
              <use href="/icons-sprite.svg#solid-star" />
            </svg>
          </a>
        </div>
        <div className="header-grid">
          <div className="brand-block">
            <h1
              style={{ cursor: "pointer" }}
              onClick={() => setSearchQuery("")}
            >
              <span className="fck glitch" data-text="NO">
                NO
              </span>
              <span className="signups">Signups</span>
              <span className="dotnet">.net</span>
            </h1>
            <h2 className="formerly-fcksignups">(formerly FckSignups.com)</h2>
            <div className="tagline-block">
              <p className="tagline-main">
                Open Source Tools. No Signups. Right in your browser
              </p>
              <p className="tagline-sub">
                Ever tried to use a simple tool, and it had the audacity to ask
                for a signup? Ever rolled your eyes at signup screens? If yes,
                this should help you out! An reviewed-list of no-signup tools
                that work instantly in your browser. Now say it with me: no
                signups!
              </p>
            </div>
          </div>

          <div className="header-stats">
            <button
              className="submit-tool-button"
              onClick={() => showModalWithID("submit-tool")}
            >
              SUBMIT A TOOL
            </button>

            <div className="stats">
              <div className="stat-row">
                <span className="white">
                  {String(toolCount).padStart(3, "0")}
                </span>{" "}
                TOOLS LOADED
              </div>
              •
              <div className="stat-row">
                <span className="white">
                  {String(categoryCount).padStart(3, "0")}
                </span>{" "}
                CATEGORIES
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

interface RepoData {
  stargazers_count: number;
}

async function fetchRepoData(): Promise<RepoData | null> {
  try {
    const response = await fetch(REPO_URL);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: RepoData = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch repo's data: ${error}`);
    return null;
  }
}

async function setRepoStars(setStarsCount: Dispatch<SetStateAction<string>>) {
  const repo = await fetchRepoData();
  const repoStars = repo?.stargazers_count?.toString() || FALLBACK_REPO_STARS;
  setStarsCount(repoStars);
}
