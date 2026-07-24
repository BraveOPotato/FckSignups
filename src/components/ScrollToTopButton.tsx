import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;
    let lastVisibleState = false;

    function updateVisibility() {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const clientHeight = document.documentElement.clientHeight;
      const viewportHeight = window.innerHeight || clientHeight || 0;
      const threshold = Math.max(2000, viewportHeight * 0.1);
      const nextVisible = scrollTop > threshold;

      if (nextVisible !== lastVisibleState) {
        lastVisibleState = nextVisible;
        setIsVisible(nextVisible);
      }

      frameId = null;
    }

    function handleScroll() {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateVisibility);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="scroll-to-top-button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg aria-hidden="true">
        <use href="/icons-sprite.svg#arrow-up" />
      </svg>
    </button>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
