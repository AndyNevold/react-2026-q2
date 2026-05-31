import type { Pokemon, PokemonDetails } from '../types/types';
import type { QueryClient } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../api/api';
import { POKEMON_API_URL } from '../constants/constants';
import { getIdFromUrl } from './helpers';

export async function downloadPokemonsAsCSV(
  pokemons: Pokemon[],
  queryClient: QueryClient
) {
  if (pokemons.length === 0) return;

  const detailsPromises = pokemons.map(async (pokemon) => {
    const id = getIdFromUrl(pokemon.url);
    const url = `${POKEMON_API_URL}/${id}/`;

    try {
      const details = await queryClient.fetchQuery<PokemonDetails>({
        queryKey: ['pokemon-details', id],
        queryFn: () => fetchPokemonDetails(url),
      });

      return {
        name: pokemon.name,
        types: details.types.map((atr) => atr.type.name).join(', '),
        url: pokemon.url,
      };
    } catch {
      return {
        name: pokemon.name,
        types: 'Unknown',
        url: pokemon.url,
      };
    }
  });

  const items = await Promise.all(detailsPromises);

  const headers = ['Pokemon', 'Type(s)', 'URL'];
  const rows = items.map((item) => [item.name, item.types, item.url]);
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `${pokemons.length}_pokemons.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
