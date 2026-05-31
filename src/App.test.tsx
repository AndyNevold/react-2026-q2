import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { createTestWrapper } from './test-utils/test-wrapper';

const TestWrapper = createTestWrapper({});

describe('App', () => {
  it('renders navigation and home page', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter Pokemon name')
    ).toBeInTheDocument();
  });

  it('renders about page on /about route', () => {
    const TestWrapperAbout = createTestWrapper({ initialEntries: ['/about'] });

    render(
      <TestWrapperAbout>
        <App />
      </TestWrapperAbout>
    );

    const aboutElements = screen.getAllByText('About');
    expect(aboutElements).toHaveLength(2);
    expect(screen.getByText('Pokemon Search App')).toBeInTheDocument();
  });

  it('renders 404 page on unknown route', () => {
    const TestWrapper404 = createTestWrapper({ initialEntries: ['/unknown'] });

    render(
      <TestWrapper404>
        <App />
      </TestWrapper404>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
