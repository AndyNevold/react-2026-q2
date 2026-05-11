import { Component, type ReactNode } from 'react';

export class Loader extends Component {
  render(): ReactNode {
    return (
      <span className="card__loader" aria-label="Loading">
        <span className="card__loader-dot" />
        <span className="card__loader-dot" />
        <span className="card__loader-dot" />
      </span>
    );
  }
}
