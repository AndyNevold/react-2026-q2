import { useEffect, type ReactNode } from 'react';
import type { ToastProps } from '../../types/types';

export function Toast({ message, onClose }: ToastProps): ReactNode {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <span className="toast__message">{message}</span>
      <button onClick={onClose} className="toast__close">
        ✕
      </button>
    </div>
  );
}
