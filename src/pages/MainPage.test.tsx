import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from './MainPage';
import { createTestWrapper } from '../test-utils/test-wrapper';

vi.mock('../api/api', () => ({
  fetchPokemonList: vi.fn(),
  fetchPokemonByName: vi.fn(),
}));

vi.mock('../components/Card/Card', () => ({
  Card: ({
    item,
    onClick,
  }: {
    item: { name: string };
    onClick: (item: { name: string }) => void;
  }) => (
    <div data-testid="card" onClick={() => onClick(item)}>
      {item.name}
    </div>
  ),
}));

import { fetchPokemonList, fetchPokemonByName } from '../api/api';
import { mockApiResponse } from '../test-utils/mockData';

const TestWrapper = createTestWrapper({});

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('loads pokemon list', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue(mockApiResponse);

    render(
      <TestWrapper>
        <MainPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('search pokemon by name', async () => {
    vi.mocked(fetchPokemonByName).mockResolvedValue(mockApiResponse);

    render(
      <TestWrapper>
        <MainPage />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    const user = userEvent.setup();
    await user.type(input, 'bulbasaur');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('shows toast on error', async () => {
    vi.mocked(fetchPokemonByName).mockRejectedValue(new Error('Network error'));

    render(
      <TestWrapper>
        <MainPage />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    const user = userEvent.setup();
    await user.type(input, 'unknown');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('closes details panel when clicking on results section', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue(mockApiResponse);

    const TestWrapperWithDetails = createTestWrapper({
      initialEntries: ['/?page=1&details=1'],
    });

    render(
      <TestWrapperWithDetails>
        <MainPage />
      </TestWrapperWithDetails>
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const resultsSection = screen
      .getByText('bulbasaur')
      .closest('.app__results-section');
    if (resultsSection) {
      const user = userEvent.setup();
      await user.click(resultsSection);
    }

    expect(screen.queryByText('✕')).not.toBeInTheDocument();
  });
});
