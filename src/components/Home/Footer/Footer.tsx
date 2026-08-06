import { ExternalIcon } from "../../../constants/icons";
import { useModal } from "../../../hooks/useModal";
import s from "./Footer.module.css";

export function Footer() {
  const { showModalWithID } = useModal();

  return (
    <footer className={s.footer}>
      <div className={s.footerGrid}>
        <div className={s.footerCol}>
          <h3>About</h3>
          <p>
            NoSignups (formerly FckSignups) is a curated directory of tools that
            respect your time. No signups, no spam, no dark patterns.
          </p>
        </div>
        <div className={s.footerCol}>
          <h3>Contribute</h3>
          <div className={s.contributeButtons}>
            <button
              className={s.footerBtn}
              onClick={() => showModalWithID("submit-tool")}
            >
              Submit a tool
            </button>
            <a
              href="https://github.com/BraveOPotato/FckSignups/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report an issue <ExternalIcon />
            </a>
          </div>
        </div>
        <div className={s.footerCol}>
          <h3>Legal</h3>
          <p>
            All tools are independently verified. We don&apos;t track you. We
            don&apos;t sell data. We don&apos;t care about your email.
          </p>
        </div>
      </div>
      <div className={s.footerBottom}>
        <p>
          © 2026 NOSIGNUPS /// CURATED WITH SPITE ///{" "}
          <a
            href="https://github.com/BraveOPotato/FckSignups"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
        </p>
      </div>
    </footer>
  );
}
