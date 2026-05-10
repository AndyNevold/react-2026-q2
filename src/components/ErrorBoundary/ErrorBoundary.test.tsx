import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import userEvent from '@testing-library/user-event';

class BrokenComponent extends Component {
  render(): ReactNode {
    throw new Error('Test error');
    return null;
  }
}

describe('ErrorBoundary', () => {
  it('render content', () => {
    render(
      <ErrorBoundary>
        <div>content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders content when child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('click Try again', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('error from ErrorButton', async () => {
    const user = userEvent.setup();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Trigger Error' }));

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
