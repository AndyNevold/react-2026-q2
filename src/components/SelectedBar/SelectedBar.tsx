import { useQueryClient } from '@tanstack/react-query';
import { usePokemonStore } from '../../store/usePokemonStore';
import { downloadPokemonsAsCSV } from '../../utils/csvExport';
import './SelectedBar.css';
import { getIdFromUrl } from '../../utils/helpers';

export function SelectedBar() {
  const queryClient = useQueryClient();
  const selectedIds = usePokemonStore((state) => state.selectedIds);
  const clearSelected = usePokemonStore((state) => state.clearSelected);
  const items = usePokemonStore((state) => state.items);

  const count = selectedIds.length;

  if (count === 0) {
    return null;
  }

  const handleDownload = async () => {
    const selectedPokemons = items.filter((item) => {
      const id = getIdFromUrl(item.url);
      return id && selectedIds.includes(id);
    });

    await downloadPokemonsAsCSV(selectedPokemons, queryClient);
  };

  return (
    <div className="selected-bar">
      <div className="selected-bar__content">
        <span className="selected-bar__count">
          <span className="selected-bar__icon"></span>
          Selected: {count} item{count !== 1 ? 's' : ''}
        </span>
        <div className="selected-bar__buttons">
          <button
            onClick={clearSelected}
            className="selected-bar__button selected-bar__button--clear"
          >
            Unselect all
          </button>
          <button
            onClick={handleDownload}
            className="selected-bar__button selected-bar__button--download"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
