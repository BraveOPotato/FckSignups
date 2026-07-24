export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className}>
      <use href="/icons-sprite.svg#external-link" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg aria-hidden="true">
      <use href="/icons-sprite.svg#github" />
    </svg>
  );
}

export function StarIcon() {
  return (
    <svg aria-hidden="true">
      <use href="/icons-sprite.svg#sharp-star" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg aria-hidden="true">
      <use href="/icons-sprite.svg#comment-dots" />
    </svg>
  );
}
