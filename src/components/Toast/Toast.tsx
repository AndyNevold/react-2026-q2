import { Component, type ReactNode } from 'react';
import type { ToastProps } from '../../types/types';

export class Toast extends Component<ToastProps> {
  componentDidMount(): void {
    setTimeout(() => {
      this.props.onClose();
    }, 3000);
  }

  render(): ReactNode {
    const { message, onClose } = this.props;

    return (
      <div className="toast">
        <span className="toast__message">{message}</span>
        <button onClick={onClose} className="toast__close">
          ✕
        </button>
      </div>
    );
  }
}
