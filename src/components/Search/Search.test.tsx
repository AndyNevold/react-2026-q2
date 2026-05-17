import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './Search';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders input and button', () => {
    const onSearch = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={onSearch} />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText('Enter Pokemon name')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows term from localStorage', () => {
    localStorage.setItem('pokemon-search', 'pikachu');
    const onSearch = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={onSearch} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    expect(input).toHaveValue('pikachu');
  });

  it('calls onSearch with value on button click', async () => {
    const onSearch = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={onSearch} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    await userEvent.clear(input);
    await userEvent.type(input, '  bulbasaur  ');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
  });
});
