import type { ReactNode } from 'react';

export function Loader(): ReactNode {
  return (
    <span className="card__loader" aria-label="Loading">
      <span className="card__loader-dot" />
      <span className="card__loader-dot" />
      <span className="card__loader-dot" />
    </span>
  );
}
