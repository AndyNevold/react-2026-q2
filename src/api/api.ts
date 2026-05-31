import axios from 'axios';
import type { ApiResponse, PokemonDetails } from '../types/types';
import { API_CONFIG } from '../constants/constants';

export async function fetchPokemonList(
  limit: number,
  offset: number
): Promise<ApiResponse> {
  const response = await axios.get<ApiResponse>(
    `${API_CONFIG.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
}

export async function fetchPokemonByName(name: string): Promise<ApiResponse> {
  const response = await axios.get<PokemonDetails>(
    `${API_CONFIG.baseUrl}/pokemon/${name.toLowerCase()}`
  );
  const details = response.data;
  return {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        name: details.name,
        url: `${API_CONFIG.baseUrl}/pokemon/${details.id}`,
      },
    ],
  };
}

export async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails> {
  const response = await axios.get<PokemonDetails>(url);
  return response.data;
}
