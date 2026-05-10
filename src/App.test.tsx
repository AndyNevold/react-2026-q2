import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('./api/api', () => ({
  fetchPokemonList: vi.fn(),
  fetchPokemonByName: vi.fn(),
}));

vi.mock('./services/storage', () => ({
  storageService: {
    get: vi.fn(() => ''),
    set: vi.fn(),
  },
}));

vi.mock('./components/Card/Card', () => ({
  Card: ({ item }: { item: { name: string } }) => (
    <div data-testid="card">{item.name}</div>
  ),
}));

import { fetchPokemonList, fetchPokemonByName } from './api/api';
import { mockApiResponse } from './test-utils/mockData';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads pokemon list', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue(mockApiResponse);

    render(<App />);

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('search pokemon by name', async () => {
    vi.mocked(fetchPokemonByName).mockResolvedValue(mockApiResponse);

    render(<App />);

    const input = screen.getByPlaceholderText('Enter Pokemon name');

    const user = userEvent.setup();
    await user.type(input, 'bulbasaur');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('shows toast', async () => {
    vi.mocked(fetchPokemonByName).mockRejectedValue(new Error('Network error'));

    render(<App />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    await user.type(input, 'unknown');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('does not fetch again for the same term', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue(mockApiResponse);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(fetchPokemonList).toHaveBeenCalledTimes(1);
  });
});
