import {
  useState,
  useCallback,
  type ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from '../components/CardList/CardList';
import { Search } from '../components/Search/Search';
import { ErrorButton } from '../components/ErrorButton/ErrorButton';
import { DetailsPage } from './DetailsPage';
import { Toast } from '../components/Toast/Toast';
import { POKEMON_CONFIG } from '../constants/constants';
import { usePokemonStore } from '../store/usePokemonStore';
import { usePokemonList, usePokemonByName } from '../hooks/usePokemonQueries';
import type { Pokemon } from '../types/types';

export function MainPage(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const detailsId = searchParams.get('details');

  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setStoreItems = usePokemonStore((state) => state.setItems);

  const offset = (page - 1) * POKEMON_CONFIG.limit;

  const searchQuery = usePokemonByName(currentSearchTerm);
  const listQuery = usePokemonList({
    limit: POKEMON_CONFIG.limit,
    offset: offset,
  });

  const isSearching = currentSearchTerm.trim().length > 0;

  const { data, isLoading, error } = isSearching ? searchQuery : listQuery;

  const items = useMemo(() => data?.results || [], [data?.results]);

  useEffect(() => {
    setStoreItems(items);
  }, [items, setStoreItems]);

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    if (toastMessage !== errorMessage) {
      setToastMessage(errorMessage);
    }
  }

  const handleSearch = useCallback(
    (term: string): void => {
      setCurrentSearchTerm(term);
      setSearchParams(term ? { page: '1' } : {});
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number): void => {
      const params: Record<string, string> = { page: String(newPage) };
      if (detailsId) params.details = detailsId;
      setSearchParams(params);
      if (currentSearchTerm) {
        setCurrentSearchTerm('');
      }
    },
    [currentSearchTerm, detailsId, setSearchParams]
  );

  const handleItemClick = useCallback(
    (item: Pokemon): void => {
      const id = item.url.split('/').filter(Boolean).pop();
      if (id) {
        const params: Record<string, string> = {
          page: String(page),
          details: id,
        };
        setSearchParams(params);
      }
    },
    [setSearchParams, page]
  );

  const handleCloseDetails = useCallback((): void => {
    const params: Record<string, string> = {};
    if (page > 1) params.page = String(page);
    setSearchParams(params);
  }, [setSearchParams, page]);

  const handleCloseToast = useCallback((): void => {
    setToastMessage(null);
  }, []);

  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / POKEMON_CONFIG.limit);

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
      <section className="app__search-section">
        <Search onSearch={handleSearch} />
      </section>

      <div className={detailsId ? 'app__master-detail' : ''}>
        <section
          className="app__results-section"
          onClick={() => detailsId && handleCloseDetails()}
        >
          <CardList
            items={items}
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onItemClick={handleItemClick}
          />
        </section>

        {detailsId && (
          <DetailsPage id={detailsId} onClose={handleCloseDetails} />
        )}
      </div>

      <ErrorButton />
    </>
  );
}
