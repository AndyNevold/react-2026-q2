import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import {
  fetchPokemonList,
  fetchPokemonByName,
  fetchPokemonDetails,
} from './api';
import {
  mockApiResponse,
  mockBulbasaurDetails,
  mockPokemonDetails,
} from '../test-utils/mockData';

vi.mock('axios');

describe('api', () => {
  describe('fetchPokemonList', () => {
    it('fetches pokemon list', async () => {
      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse });

      const result = await fetchPokemonList(20, 0);

      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
      expect(result).toEqual(mockApiResponse);
      expect(result.results).toHaveLength(2);
    });

    it('throws on network error', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));

      await expect(fetchPokemonList(20, 0)).rejects.toThrow('Network Error');
    });
  });

  describe('fetchPokemonByName', () => {
    it('fetches pokemon by name', async () => {
      vi.mocked(axios.get).mockResolvedValue({ data: mockPokemonDetails });

      const result = await fetchPokemonByName('pikachu');

      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('pikachu');
    });

    it('not found', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Not found'));

      await expect(fetchPokemonByName('unknown')).rejects.toThrow('Not found');
    });
  });

  describe('fetchPokemonDetails', () => {
    it('fetches pokemon details by url', async () => {
      vi.mocked(axios.get).mockResolvedValue({ data: mockBulbasaurDetails });

      const result = await fetchPokemonDetails(
        'https://pokeapi.co/api/v2/pokemon/1/'
      );

      expect(result.types).toHaveLength(2);
    });
  });
});
