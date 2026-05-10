import { Component, type ReactNode } from 'react';
import { CardList } from './components/CardList/CardList';
import './App.css';
import { Search } from './components/Search/Search';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { fetchPokemonByName, fetchPokemonList } from './api/api';
import type { AppState } from './types/types';
import { Toast } from './components/Toast/Toast';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

export class App extends Component<Record<string, never>, AppState> {
  state = {
    items: [],
    isLoading: false,
    currentSearchTerm: '',
    toastMessage: null,
  };

  handleSearch = async (term: string): Promise<void> => {
    const { currentSearchTerm, items } = this.state;

    if (term === currentSearchTerm && items.length > 0) {
      return;
    }

    this.setState({ isLoading: true, currentSearchTerm: term });

    try {
      let data;

      if (term) {
        data = await fetchPokemonByName(term);
      } else {
        data = await fetchPokemonList(20, 0);
      }

      this.setState({ items: data.results, isLoading: false });
    } catch (err) {
      this.setState({
        isLoading: false,
        toastMessage: err instanceof Error ? err.message : 'Unknown error',
        items: [],
      });
    }
  };

  render(): ReactNode {
    const { items, isLoading, toastMessage } = this.state;

    return (
      <>
        {toastMessage && (
          <Toast
            message={toastMessage}
            onClose={() => this.setState({ toastMessage: null })}
          />
        )}
        <ErrorBoundary>
          <div className="app">
            <section className="app__search-section">
              <Search onSearch={this.handleSearch} />
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
}

export default App;
