import { useCallback, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { CardListProps } from '../../types/types.ts';
import { Loader } from '../Loader/Loader.tsx';
import { Card } from '../Card/Card.tsx';

export function CardList({
  items,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onItemClick,
}: CardListProps): ReactNode {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['pokemon-list'] });
    queryClient.invalidateQueries({ queryKey: ['pokemon-search'] });
  };

  const renderItems = useCallback((): ReactNode => {
    return items.map((item) => (
      <Card key={item.name} item={item} onClick={onItemClick} />
    ));
  }, [items, onItemClick]);

  if (isLoading) {
    return (
      <div className="card-list">
        <Loader />
      </div>
    );
  }

  return (
    <div className="card-list">
      {items.length === 0 ? <div>No items found</div> : renderItems()}

      {(totalPages > 1 || items.length > 0) && (
        <div className="pagination">
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onPageChange(page - 1);
            }}
            disabled={page <= 1}
            className="pagination__button"
          >
            Previous
          </button>

          <span className="pagination__info">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onPageChange(page + 1);
            }}
            disabled={page >= totalPages}
            className="pagination__button"
          >
            Next
          </button>

          <button
            onClick={handleRefresh}
            className="pagination__button pagination__button--refresh"
          >
            ⟳ Refresh
          </button>
        </div>
      )}
    </div>
  );
}
