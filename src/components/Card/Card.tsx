import { useState, useEffect, type ReactNode } from 'react';
import type { CardProps } from '../../types/types';
import { fetchPokemonDetails } from '../../api/api';
import { Loader } from '../Loader/Loader';
import { usePokemonStore } from '../../store/usePokemonStore';

export function Card({ item, onClick }: CardProps): ReactNode {
  const [types, setTypes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getIdFromUrl = (url: string): string => {
    return url.split('/').filter(Boolean).pop() || '';
  };

  const pokemonId = getIdFromUrl(item.url);

  const selectedIds = usePokemonStore((state) => state.selectedIds);
  const toggleSelected = usePokemonStore((state) => state.toggleSelected);

  const isSelected = selectedIds.includes(pokemonId);

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = () => {
    toggleSelected(pokemonId);
  };

  const handleCardClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onClick(item);
  };

  useEffect(() => {
    async function loadDetails() {
      try {
        const details = await fetchPokemonDetails(item.url);
        const typeNames = details.types
          .map((ability) => ability.type.name)
          .join(', ');
        setTypes(typeNames);
      } catch {
        setTypes('Unknown');
      } finally {
        setIsLoading(false);
      }
    }
    loadDetails();
  }, [item.url]);

  return (
    <div className="card" onClick={handleCardClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={handleCheckboxClick}
      />
      <span className="card__name">{item.name}</span>
      <span className="card__description">
        {isLoading ? <Loader /> : types}
      </span>
    </div>
  );
}
