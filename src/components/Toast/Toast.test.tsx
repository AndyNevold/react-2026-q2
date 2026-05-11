import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the message', () => {
    const onClose = vi.fn();
    render(<Toast message="Something went wrong" onClose={onClose} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<Toast message="Error" onClose={onClose} />);

    await user.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose after 3 seconds', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Error" onClose={onClose} />);

    vi.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
