import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { usePokemonStore } from '../../store/usePokemonStore';
import { SelectedBar } from './SelectedBar';
import userEvent from '@testing-library/user-event';
import { downloadPokemonsAsCSV } from '../../utils/csvExport';
import { mockApiResponse } from '../../test-utils/mockData';

vi.mock('../../utils/csvExport', () => ({
  downloadPokemonsAsCSV: vi.fn(),
}));

describe('SelectedBar', () => {
  it('does not show when no items selected', () => {
    usePokemonStore.setState({ selectedIds: [], items: [] });

    render(<SelectedBar />);

    expect(screen.queryByText('Selected:')).not.toBeInTheDocument();
  });

  it('shows when items are selected', () => {
    usePokemonStore.setState({
      selectedIds: ['1'],
      items: [{ name: 'pikachu', url: 'url' }],
    });

    render(<SelectedBar />);

    expect(screen.getByText('Selected: 1 item')).toBeInTheDocument();
  });

  it('shows plural "items" when more than one', () => {
    usePokemonStore.setState({
      selectedIds: ['1', '2'],
      items: [
        { name: 'pikachu', url: 'url' },
        { name: 'bulbasaur', url: 'url' },
      ],
    });

    render(<SelectedBar />);

    expect(screen.getByText('Selected: 2 items')).toBeInTheDocument();
  });

  it('has "Unselect all" button', () => {
    usePokemonStore.setState({ selectedIds: ['1'], items: [] });

    render(<SelectedBar />);

    expect(screen.getByText('Unselect all')).toBeInTheDocument();
  });

  it('has "Download" button', () => {
    usePokemonStore.setState({ selectedIds: ['1'], items: [] });

    render(<SelectedBar />);

    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('calls download when Download button is clicked', async () => {
    const user = userEvent.setup();
    const mockItems = mockApiResponse.results;

    usePokemonStore.setState({
      selectedIds: ['25', '1'],
      items: mockItems,
    });

    render(<SelectedBar />);

    const downloadButton = screen.getByText('Download');
    await user.click(downloadButton);

    expect(downloadPokemonsAsCSV).toHaveBeenCalled();
  });

  it('calls clearSelected when Unselect all button is clicked', async () => {
    const user = userEvent.setup();

    const mockClearSelected = vi.fn();

    usePokemonStore.setState({
      selectedIds: ['1'],
      items: [],
      clearSelected: mockClearSelected,
    });

    render(<SelectedBar />);

    const unselectButton = screen.getByText('Unselect all');
    await user.click(unselectButton);

    expect(mockClearSelected).toHaveBeenCalled();
  });
});
