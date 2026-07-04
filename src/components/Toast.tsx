interface ToastProps {
  innerText: string;
  onExit: () => void;
}

export function Toast({ innerText, onExit }: ToastProps) {
  return (
    <>
      <div className="toast-container">
        <span>{innerText}</span>
        <svg
          onClick={onExit}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          style={{ minWidth: "1.6rem", maxWidth: "1.6rem" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </>
  );
}
