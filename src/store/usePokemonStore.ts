import { create } from 'zustand';

interface PokemonStore {
  selectedIds: string[];

  toggleSelected: (id: string) => void;
  clearSelected: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedIds: [],

  toggleSelected: (id) =>
    set((state) => {
      if (state.selectedIds.includes(id)) {
        return { selectedIds: state.selectedIds.filter((i) => i !== id) };
      } else {
        return { selectedIds: [...state.selectedIds, id] };
      }
    }),

  clearSelected: () => set({ selectedIds: [] }),
}));
