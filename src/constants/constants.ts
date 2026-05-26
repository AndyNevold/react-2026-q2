export const API_CONFIG = {
  baseUrl: 'https://pokeapi.co/api/v2',
};

export const STORAGE_KEYS = {
  pokemonSearch: 'pokemon-search',
};

export const POKEMON_CONFIG = {
  limit: 10,
};

export const STALE_TIME =
  Number(import.meta.env.VITE_QUERY_STALE_TIME) || 1000 * 60 * 5;
