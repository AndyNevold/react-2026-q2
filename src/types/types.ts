import type { ReactNode } from 'react';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    slot: number;
    ability: {
      name: string;
    };
  }>;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface AppState {
  items: Pokemon[];
  isLoading: boolean;
  currentSearchTerm: string;
  toastMessage: string | null;
}

export interface SearchProps {
  onSearch: (term: string) => void;
}

export interface SearchState {
  inputValue: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface CardListProps {
  items: Pokemon[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemClick: (item: Pokemon) => void;
  onClick?: () => void;
}

export interface CardProps {
  item: Pokemon;
  onClick: (item: Pokemon) => void;
}

export interface CardState {
  types: string | null;
  isLoading: boolean;
}

export interface ToastProps {
  message: string;
  onClose: () => void;
}
