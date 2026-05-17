import { useState, useEffect, type ReactNode } from 'react';
import { fetchPokemonDetails } from '../api/api';
import { Loader } from '../components/Loader/Loader';
import type { PokemonDetails } from '../types/types';

interface DetailsPageProps {
  id: string;
  onClose: () => void;
}

export function DetailsPage({ id, onClose }: DetailsPageProps): ReactNode {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        setIsLoading(true);
        const data = await fetchPokemonDetails(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        setDetails(data);
      } catch {
        setError('Failed to load details');
      } finally {
        setIsLoading(false);
      }
    }
    loadDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="details-panel">
        <Loader />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="details-panel">
        <p>{error || 'No details available'}</p>
        <button onClick={onClose} className="details-panel__close">
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="details-panel">
      <button onClick={onClose} className="details-panel__close">
        ✕
      </button>
      <h2>{details.name}</h2>
      <img
        src={details.sprites.front_default}
        alt={details.name}
        className="details-panel__image"
      />
      <h3>Types</h3>
      <ul>
        {details.types.map((t) => (
          <li key={t.slot}>{t.type.name}</li>
        ))}
      </ul>
      <h3>Abilities</h3>
      <ul>
        {details.abilities.map((a) => (
          <li key={a.slot}>{a.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}
