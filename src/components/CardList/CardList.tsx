import { useCallback, type ReactNode } from 'react';
import type { CardListProps } from '../../types/types.ts';
import { Loader } from '../Loader/Loader.tsx';
import { Card } from '../Card/Card.tsx';

export function CardList({ items, isLoading }: CardListProps): ReactNode {
  const renderItems = useCallback((): ReactNode => {
    return items.map((item) => <Card key={item.name} item={item} />);
  }, [items]);

  if (isLoading) {
    return (
      <div className="card-list">
        <Loader />
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="card-list">No items found</div>;
  }

  return <div className="card-list">{renderItems()}</div>;
}
