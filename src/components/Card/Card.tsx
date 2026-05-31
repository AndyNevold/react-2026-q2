import { type ReactNode } from 'react';
import type { CardProps } from '../../types/types';
import { Loader } from '../Loader/Loader';
import { usePokemonStore } from '../../store/usePokemonStore';
import { usePokemonDetails } from '../../hooks/usePokemonQueries';
import { getIdFromUrl } from '../../utils/helpers';

export function Card({ item, onClick }: CardProps): ReactNode {
  const pokemonId = getIdFromUrl(item.url);

  const selectedIds = usePokemonStore((state) => state.selectedIds);
  const toggleSelected = usePokemonStore((state) => state.toggleSelected);
  const isSelected = selectedIds.includes(pokemonId);

  const { data: details, isLoading, error } = usePokemonDetails(pokemonId);

  let types: string | null = null;
  if (details) {
    types = details.types.map((ability) => ability.type.name).join(', ');
  } else if (error) {
    types = 'Unknown';
  }

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

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card__left">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={handleCheckboxClick}
        />
        <span className="card__name">{item.name}</span>
      </div>
      <div className="card__right">
        <span className="card__description">
          {isLoading ? <Loader /> : types}
        </span>
      </div>
    </div>
  );
}
