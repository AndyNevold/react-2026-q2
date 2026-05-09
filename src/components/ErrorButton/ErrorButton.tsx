import { Component, type ReactNode } from 'react';

export class ErrorButton extends Component {
  state = { throwError: false };

  handleClick = (): void => {
    this.setState({ throwError: true });
  };

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('Simulated error for testing');
    }
    return (
      <button onClick={this.handleClick} className="error-button">
        Trigger Error
      </button>
    );
  }
}
