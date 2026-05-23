import { create } from 'zustand';
import type { Pokemon } from '../types/types';

interface PokemonStore {
  selectedIds: string[];
  items: Pokemon[];
  toggleSelected: (id: string) => void;
  clearSelected: () => void;
  setItems: (items: Pokemon[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedIds: [],
  items: [],
  toggleSelected: (id) =>
    set((state) => {
      if (state.selectedIds.includes(id)) {
        return { selectedIds: state.selectedIds.filter((i) => i !== id) };
      } else {
        return { selectedIds: [...state.selectedIds, id] };
      }
    }),

  clearSelected: () => set({ selectedIds: [] }),

  setItems: (items) => set({ items }),
}));
