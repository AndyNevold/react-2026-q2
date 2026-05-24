import { describe, it, expect, vi } from 'vitest';
import { downloadPokemonsAsCSV } from './csvExport';
import { mockApiResponse } from '../test-utils/mockData';

describe('downloadPokemonsAsCSV', () => {
  it('nothing happens when no pokemons selected', async () => {
    const mockFetch = vi.fn();

    await downloadPokemonsAsCSV([], mockFetch);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches details for each pokemon', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ types: [] });
    const pokemons = mockApiResponse.results;

    await downloadPokemonsAsCSV(pokemons, mockFetch);

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
