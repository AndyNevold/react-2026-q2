import { useState, useEffect, type ReactNode } from 'react';
import type { CardProps } from '../../types/types';
import { fetchPokemonDetails } from '../../api/api';
import { Loader } from '../Loader/Loader';

export function Card({ item, onClick }: CardProps): ReactNode {
  const [types, setTypes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="card" onClick={() => onClick(item)}>
      <span className="card__name">{item.name}</span>
      <span className="card__description">
        {isLoading ? <Loader /> : types}
      </span>
    </div>
  );
}
