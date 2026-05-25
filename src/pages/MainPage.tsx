import { useState, useCallback, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from '../components/CardList/CardList';
import { Search } from '../components/Search/Search';
import { ErrorButton } from '../components/ErrorButton/ErrorButton';
import { DetailsPage } from './DetailsPage';
import { fetchPokemonByName, fetchPokemonList } from '../api/api';
import type { Pokemon } from '../types/types';
import { Toast } from '../components/Toast/Toast';
import { POKEMON_CONFIG } from '../constants/constants';
import { usePokemonStore } from '../store/usePokemonStore';

export function MainPage(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const detailsId = searchParams.get('details');

  const [items, setItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const setStoreItems = usePokemonStore((state) => state.setItems);

  const totalPages = Math.ceil(totalCount / POKEMON_CONFIG.limit);

  const loadData = useCallback(
    async (term: string, pageNum: number): Promise<void> => {
      try {
        setIsLoading(true);
        let data;
        if (term) {
          data = await fetchPokemonByName(term);
        } else {
          const offset = (pageNum - 1) * POKEMON_CONFIG.limit;
          data = await fetchPokemonList(POKEMON_CONFIG.limit, offset);
        }

        setStoreItems(data.results);
        setItems(data.results);
        setTotalCount(data.count);
      } catch (err) {
        setToastMessage(err instanceof Error ? err.message : 'Unknown error');
        setItems([]);
        setStoreItems([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setStoreItems]
  );

  const handleSearch = useCallback(
    (term: string): void => {
      if (term === currentSearchTerm && items.length > 0) {
        return;
      }

      setCurrentSearchTerm(term);
      setSearchParams(term ? { page: '1' } : {});
      loadData(term, 1);
    },
    [currentSearchTerm, items.length, loadData, setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number): void => {
      const params: Record<string, string> = { page: String(newPage) };
      if (detailsId) params.details = detailsId;
      setSearchParams(params);
      loadData(currentSearchTerm, newPage);
    },
    [currentSearchTerm, detailsId, loadData, setSearchParams]
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
