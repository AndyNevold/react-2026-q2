import { type ReactNode } from 'react';
import { usePokemonDetails } from '../hooks/usePokemonQueries';
import { Loader } from '../components/Loader/Loader';

interface DetailsPageProps {
  id: string;
  onClose: () => void;
}

export function DetailsPage({ id, onClose }: DetailsPageProps): ReactNode {
  const { data: details, isLoading, error } = usePokemonDetails(id);

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
        <p>
          {error instanceof Error ? error.message : 'Failed to load details'}
        </p>
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
