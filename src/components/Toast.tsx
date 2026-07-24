interface ToastProps {
  innerText: string;
  onExit: () => void;
}

export function Toast({ innerText, onExit }: ToastProps) {
  return (
    <>
      <div className="toast-container">
        <p>{innerText}</p>
        <button type="button" onClick={onExit} className="close-toast-button">
          <svg aria-hidden="true">
            <use href="/icons-sprite.svg#x-mark" />
          </svg>
        </button>
      </div>
    </>
  );
}
