import { describe, it, expect, beforeEach } from 'vitest';
import { usePokemonStore } from './usePokemonStore';
import { mockApiResponse } from '../test-utils/mockData';

describe('usePokemonStore', () => {
  beforeEach(() => {
    usePokemonStore.setState({
      selectedIds: [],
      items: [],
    });
  });

  it('initial state: empty arrays', () => {
    const state = usePokemonStore.getState();
    expect(state.selectedIds).toEqual([]);
    expect(state.items).toEqual([]);
  });

  it('toggleSelected: adds id when not present', () => {
    const { toggleSelected } = usePokemonStore.getState();

    toggleSelected('1');

    const { selectedIds } = usePokemonStore.getState();
    expect(selectedIds).toEqual(['1']);
  });

  it('toggleSelected: removes id when present', () => {
    const { toggleSelected } = usePokemonStore.getState();

    toggleSelected('1');
    toggleSelected('1');

    const { selectedIds } = usePokemonStore.getState();
    expect(selectedIds).toEqual([]);
  });

  it('clearSelected: clears all selected ids', () => {
    const { toggleSelected, clearSelected } = usePokemonStore.getState();

    toggleSelected('1');
    toggleSelected('2');
    clearSelected();

    const { selectedIds } = usePokemonStore.getState();
    expect(selectedIds).toEqual([]);
  });

  it('setItems: saves pokemon list', () => {
    const { setItems } = usePokemonStore.getState();
    const mockItems = mockApiResponse.results;

    setItems(mockItems);

    const { items } = usePokemonStore.getState();
    expect(items).toEqual(mockItems);
  });

  it('toggleSelected: adds multiple ids', () => {
    const { toggleSelected } = usePokemonStore.getState();

    toggleSelected('1');
    toggleSelected('2');

    const { selectedIds } = usePokemonStore.getState();
    expect(selectedIds).toEqual(['1', '2']);
  });
});
