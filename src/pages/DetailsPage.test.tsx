import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DetailsPage } from './DetailsPage';
import { createTestWrapper } from '../test-utils/test-wrapper';

vi.mock('../api/api', () => ({
  fetchPokemonDetails: vi.fn(),
}));

import { fetchPokemonDetails } from '../api/api';
import { mockPokemonDetails } from '../test-utils/mockData';

const TestWrapper = createTestWrapper({});

describe('DetailsPage', () => {
  it('renders pokemon details', async () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue(mockPokemonDetails);

    render(
      <TestWrapper>
        <DetailsPage id="1" onClose={vi.fn()} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('renders close button', async () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue(mockPokemonDetails);

    render(
      <TestWrapper>
        <DetailsPage id="1" onClose={vi.fn()} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('✕')).toBeInTheDocument();
    });
  });
});
