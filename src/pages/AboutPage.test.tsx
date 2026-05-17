import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders about information', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Pokemon Search App')).toBeInTheDocument();
    expect(screen.getByText('RS School React Course')).toBeInTheDocument();
  });
});
