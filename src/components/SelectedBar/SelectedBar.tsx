import { usePokemonStore } from '../../store/usePokemonStore';
import './SelectedBar.css';

export function SelectedBar() {
  const selectedIds = usePokemonStore((state) => state.selectedIds);
  const clearSelected = usePokemonStore((state) => state.clearSelected);

  const count = selectedIds.length;

  if (count === 0) {
    return null;
  }

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
          <button className="selected-bar__button selected-bar__button--download">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
