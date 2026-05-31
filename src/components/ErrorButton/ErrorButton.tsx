import { useState, type ReactNode } from 'react';

export function ErrorButton(): ReactNode {
  const [throwError, setThrowError] = useState(false);

  const handleClick = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Simulated error for testing');
  }

  return (
    <button onClick={handleClick} className="error-button">
      Trigger Error
    </button>
  );
}
