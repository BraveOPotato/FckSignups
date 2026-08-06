import { useState } from "react";
import { ChatIcon } from "../../../constants/icons";
import { useModal } from "../../../hooks/useModal";
import { useReport } from "../../../hooks/useReport";
import { Toast } from "../../Shared/Feedback/Toast/Toast";
import s from "./ReportFloatingWidget.module.css";

export function ReportFloatingWidget() {
  const { reportMode, setReportMode } = useReport();
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {reportMode && (
        <Toast
          innerText="Select an entry to report"
          onExit={() => setReportMode(false)}
        />
      )}

      <div className={s.wrapper}>
        <FeedbackButton clicked={clicked} setClicked={setClicked} />
        {clicked && <FeedbackMenu />}
      </div>
    </>
  );
}

function FeedbackButton({
  clicked,
  setClicked,
}: {
  clicked: boolean;
  setClicked: (clickedStatus: boolean) => void;
}) {
  const label = "Report or suggest a tool";

  return (
    <button
      onClick={() => setClicked(!clicked)}
      className={`${s.button} submit-tool-button`}
      aria-label={label}
      title={label}
      aria-haspopup="menu"
      aria-expanded={clicked}
      data-sticky={clicked}
    >
      <ChatIcon />
    </button>
  );
}

function FeedbackMenu() {
  const { reportMode, setReportMode } = useReport();
  const { showModalWithID } = useModal();

  return (
    <ul className={s.menu} role="menu">
      <li role="none">
        <button
          type="button"
          role="menuitem"
          className={`${s.menuItem} submit-tool-button`}
          data-sticky={reportMode}
          onClick={() => setReportMode(!reportMode)}
        >
          REPORT AN ENTRY
        </button>
      </li>
      <li role="none">
        <button
          type="button"
          role="menuitem"
          className={`${s.menuItem} submit-tool-button`}
          onClick={() => showModalWithID("suggest-tool")}
        >
          SUGGEST A TOOL FOR US TO MAKE
        </button>
      </li>
    </ul>
  );
}
