import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton', () => {
  it('renders the trigger button', () => {
    render(<ErrorButton />);

    expect(
      screen.getByRole('button', { name: 'Trigger Error' })
    ).toBeInTheDocument();
  });
});
