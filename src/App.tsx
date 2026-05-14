import { useState, useCallback, type ReactNode } from 'react';
import { CardList } from './components/CardList/CardList';
import './App.css';
import { Search } from './components/Search/Search';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { fetchPokemonByName, fetchPokemonList } from './api/api';
import type { Pokemon } from './types/types';
import { Toast } from './components/Toast/Toast';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

export function App(): ReactNode {
  const [items, setItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (term: string): Promise<void> => {
      if (term === currentSearchTerm && items.length > 0) {
        return;
      }

      setIsLoading(true);
      setCurrentSearchTerm(term);

      try {
        let data;

        if (term) {
          data = await fetchPokemonByName(term);
        } else {
          data = await fetchPokemonList(20, 0);
        }

        setItems(data.results);
      } catch (err) {
        setToastMessage(err instanceof Error ? err.message : 'Unknown error');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentSearchTerm, items.length]
  );

  const handleCloseToast = useCallback((): void => {
    setToastMessage(null);
  }, []);

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
      <ErrorBoundary>
        <div className="app">
          <section className="app__search-section">
            <Search onSearch={handleSearch} />
          </section>

          <section className="app__results-section">
            <CardList items={items} isLoading={isLoading} />
          </section>

          <ErrorButton />
        </div>
      </ErrorBoundary>
    </>
  );
}

export default App;
