import { Component, type ChangeEvent, type ReactNode } from 'react';
import { storageService } from '../../services/storage';
import type { SearchProps, SearchState } from '../../types/types';

export class Search extends Component<SearchProps, SearchState> {
  savedTerm = storageService.get() || '';
  state = { inputValue: this.savedTerm };

  componentDidMount(): void {
    const { onSearch } = this.props;
    const { inputValue } = this.state;
    onSearch(inputValue.trim());
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearchClick = (): void => {
    const { onSearch } = this.props;
    const { inputValue } = this.state;
    const inputValueTrim = inputValue.trim();

    const savedTerm = storageService.get() || '';

    if (inputValueTrim !== savedTerm) {
      storageService.set(inputValueTrim);
    }

    onSearch(inputValueTrim);
  };

  render(): ReactNode {
    const { inputValue } = this.state;

    return (
      <div className="search">
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputChange}
          placeholder="Enter Pokemon name"
          className="search__input"
        />
        <button onClick={this.handleSearchClick} className="search__button">
          Search
        </button>
      </div>
    );
  }
}
