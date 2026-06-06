import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders loading indicator', () => {
    render(<Loader />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders three dots', () => {
    render(<Loader />);
    const dots = document.querySelectorAll('.card__loader-dot');
    expect(dots).toHaveLength(3);
  });
});
