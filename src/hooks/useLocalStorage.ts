import { useState } from 'react';

function getInitialValue(key: string, initialValue: string): string {
  return localStorage.getItem(key) || initialValue;
}

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() =>
    getInitialValue(key, initialValue)
  );

  const setValue = (value: string): void => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  const getValue = (): string => {
    return localStorage.getItem(key) || initialValue;
  };

  return { storedValue, setValue, getValue };
}
