import { STORAGE_KEYS } from '../constants/constants';

export const storageService = {
  get(): string {
    return localStorage.getItem(STORAGE_KEYS.pokemonSearch) || '';
  },
  set(value: string): void {
    localStorage.setItem(STORAGE_KEYS.pokemonSearch, value);
  },
};
