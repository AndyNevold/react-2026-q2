import type { ApiResponse, PokemonDetails } from '../types/types';

export const mockApiResponse: ApiResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
};

export const mockPokemonDetails: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  sprites: { front_default: '' },
  types: [{ slot: 1, type: { name: 'electric' } }],
  abilities: [],
};

export const mockBulbasaurDetails: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  sprites: { front_default: '' },
  types: [
    { slot: 1, type: { name: 'grass' } },
    { slot: 2, type: { name: 'poison' } },
  ],
  abilities: [],
};
