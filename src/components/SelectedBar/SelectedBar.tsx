import { fetchPokemonDetails } from '../../api/api';
import { usePokemonStore } from '../../store/usePokemonStore';
import { downloadPokemonsAsCSV } from '../../utils/csvExport';
import './SelectedBar.css';

export function SelectedBar() {
  const selectedIds = usePokemonStore((state) => state.selectedIds);
  const clearSelected = usePokemonStore((state) => state.clearSelected);
  const items = usePokemonStore((state) => state.items);

  const count = selectedIds.length;

  if (count === 0) {
    return null;
  }

  const handleDownload = async () => {
    const selectedPokemons = items.filter((item) => {
      const id = item.url.split('/').filter(Boolean).pop();
      return id && selectedIds.includes(id);
    });

    await downloadPokemonsAsCSV(selectedPokemons, fetchPokemonDetails);
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
