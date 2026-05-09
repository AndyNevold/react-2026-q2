import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Card } from './Card';
import type { PokemonDetails } from '../../types/types';
import { fetchPokemonDetails } from '../../api/api';

vi.mock('../../api/api', () => ({
  fetchPokemonDetails: vi.fn(),
}));

const mockItem = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

describe('Card', () => {
  it('renders pokemon name', () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      types: [
        { slot: 1, type: { name: 'grass' } },
        { slot: 2, type: { name: 'poison' } },
      ],
    } as PokemonDetails);

    render(<Card item={mockItem} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('shows details after successful fetch', async () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      types: [
        { slot: 1, type: { name: 'grass' } },
        { slot: 2, type: { name: 'poison' } },
      ],
    } as PokemonDetails);

    render(<Card item={mockItem} />);

    await waitFor(() => {
      expect(screen.getByText('grass, poison')).toBeInTheDocument();
    });
  });

  it('shows Unknown when API fails', async () => {
    vi.mocked(fetchPokemonDetails).mockRejectedValue(
      new Error('Network error')
    );

    render(<Card item={mockItem} />);

    await waitFor(() => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });
});
