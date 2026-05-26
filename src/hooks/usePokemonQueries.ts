import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemonList,
  fetchPokemonByName,
  fetchPokemonDetails,
} from '../api/api';
import type { ApiResponse, PokemonDetails } from '../types/types';

interface UsePokemonListParams {
  limit: number;
  offset: number;
}

export function usePokemonList({ limit, offset }: UsePokemonListParams) {
  return useQuery<ApiResponse>({
    queryKey: ['pokemon-list', limit, offset],

    queryFn: () => fetchPokemonList(limit, offset),
  });
}

export function usePokemonByName(name: string) {
  return useQuery<ApiResponse>({
    queryKey: ['pokemon-search', name],

    queryFn: () => fetchPokemonByName(name),

    enabled: name.trim().length > 0,
  });
}

export function usePokemonDetails(url: string) {
  return useQuery<PokemonDetails>({
    queryKey: ['pokemon-details', url],

    queryFn: () => fetchPokemonDetails(url),
  });
}
