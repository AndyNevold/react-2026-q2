import type { ReactNode } from 'react';

export function AboutPage(): ReactNode {
  return (
    <div className="about">
      <h1>About</h1>
      <p>Pokemon Search App</p>
      <p>
        Created as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS School React Course
        </a>
      </p>
    </div>
  );
}
