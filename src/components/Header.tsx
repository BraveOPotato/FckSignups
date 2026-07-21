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
            <svg className="star-svg" viewBox="0 0 576 512" fill="currentColor">
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
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
