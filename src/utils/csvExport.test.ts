import { describe, it, expect, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { downloadPokemonsAsCSV } from './csvExport';
import { mockApiResponse } from '../test-utils/mockData';

describe('downloadPokemonsAsCSV', () => {
  it('nothing happens when no pokemons selected', async () => {
    const queryClient = new QueryClient();
    const mockFetchDetails = vi.fn();

    await downloadPokemonsAsCSV([], queryClient);

    expect(mockFetchDetails).not.toHaveBeenCalled();
  });

  it('fetches details for each pokemon', async () => {
    const queryClient = new QueryClient();
    const pokemons = mockApiResponse.results;

    vi.spyOn(queryClient, 'fetchQuery').mockResolvedValue({ types: [] });

    await downloadPokemonsAsCSV(pokemons, queryClient);

    expect(queryClient.fetchQuery).toHaveBeenCalledTimes(2);
  });
});
