import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { createTestWrapper } from '../../test-utils/test-wrapper';

const TestWrapper = createTestWrapper({});

describe('ThemeToggle', () => {
  it('renders button when context is provided', () => {
    render(
      <TestWrapper>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </TestWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('returns null when context is not provided', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows sun icon in dark mode', () => {
    render(
      <TestWrapper>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </TestWrapper>
    );

    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  it('toggles theme when clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </TestWrapper>
    );

    const button = screen.getByRole('button');

    expect(screen.getByText('🌙')).toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText('☀️')).toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
});
