import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Card } from './Card';
import type { PokemonDetails } from '../../types/types';
import { fetchPokemonDetails } from '../../api/api';
import { createTestWrapper } from '../../test-utils/test-wrapper';

vi.mock('../../api/api', () => ({
  fetchPokemonDetails: vi.fn(),
}));

const mockItem = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

const mockOnClick = vi.fn();
const TestWrapper = createTestWrapper({});

describe('Card', () => {
  it('renders pokemon name', async () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      types: [
        { slot: 1, type: { name: 'grass' } },
        { slot: 2, type: { name: 'poison' } },
      ],
    } as PokemonDetails);

    render(
      <TestWrapper>
        <Card item={mockItem} onClick={mockOnClick} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('shows details after successful fetch', async () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      types: [
        { slot: 1, type: { name: 'grass' } },
        { slot: 2, type: { name: 'poison' } },
      ],
    } as PokemonDetails);

    render(
      <TestWrapper>
        <Card item={mockItem} onClick={mockOnClick} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('grass, poison')).toBeInTheDocument();
    });
  });
});
