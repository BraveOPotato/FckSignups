import s from "./Toast.module.css";

interface ToastProps {
  innerText: string;
  onExit: () => void;
}

export function Toast({ innerText, onExit }: ToastProps) {
  return (
    <div className={s.toastContainer}>
      <p>{innerText}</p>
      <button type="button" onClick={onExit} className={s.closeToastButton}>
        <svg aria-hidden="true">
          <use href="/icons-sprite.svg#x-mark" />
        </svg>
      </button>
    </div>
  );
}
