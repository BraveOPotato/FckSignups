import { useEffect, useState } from "react";
import { SubmitToolModal } from "./SubmitToolModal";

interface HeaderProps {
  toolCount: number;
  categoryCount: number;
}

export function Header({ toolCount, categoryCount }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/BraveOPotato/FckSignups")
      .then((data) => data.json())
      .then((json) => setStarsCount(json.stargazers_count));
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="stars-button-container">
          <a href="https://github.com/BraveOPotato/FckSignups">
            <button className="submit-tool-button">
              {starsCount}
              <svg
                className="star-svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            </button>
          </a>
        </div>
        <div className="header-grid">
          <div className="brand-block">
            <h1>
              <span className="fck glitch" data-text="F*CK">
                F*CK
              </span>
              <span className="signups">Signups</span>
            </h1>
            <div className="tagline-block">
              <p className="tagline-main">
                Open Source Tools. No Signups. Right in your browser
              </p>
              <p className="tagline-sub">
                A curated collection of open-source tools you can use instantly
                in your browser. no accounts, no emails, no tracking. Just tools
                that work.
              </p>
            </div>
          </div>

          <div className="header-stats">
            <button
              className="submit-tool-button"
              onClick={() => setModalOpen(true)}
            >
              SUBMIT A TOOL
            </button>
            <div className="stat-row">
              {String(toolCount).padStart(3, "0")} TOOLS LOADED
            </div>
            <div className="stat-row">
              {String(categoryCount).padStart(3, "0")} CATEGORIES
            </div>
          </div>
        </div>
      </header>

      <SubmitToolModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
