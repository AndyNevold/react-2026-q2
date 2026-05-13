import { useEffect, type ChangeEvent, type ReactNode } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../constants/constants';
import type { SearchProps } from '../../types/types';

export function Search({ onSearch }: SearchProps): ReactNode {
  const {
    storedValue: inputValue,
    setValue: setInputValue,
    getValue,
  } = useLocalStorage(STORAGE_KEYS.pokemonSearch, '');

  useEffect(() => {
    onSearch(inputValue.trim());
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = (): void => {
    const inputValueTrim = inputValue.trim();
    const savedTerm = getValue();

    if (inputValueTrim !== savedTerm) {
      setInputValue(inputValueTrim);
    }

    onSearch(inputValueTrim);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Pokemon name"
        className="search__input"
      />
      <button onClick={handleSearchClick} className="search__button">
        Search
      </button>
    </div>
  );
}
