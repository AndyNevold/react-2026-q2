import { Component, type ReactNode } from 'react';
import type { CardProps, CardState } from '../../types/types';
import { fetchPokemonDetails } from '../../api/api';
import { Loader } from '../Loader/Loader';

export class Card extends Component<CardProps, CardState> {
  state: CardState = { types: null, isLoading: true };

  async componentDidMount(): Promise<void> {
    try {
      const details = await fetchPokemonDetails(this.props.item.url);
      const types = details.types
        .map((ability) => ability.type.name)
        .join(', ');
      this.setState({ types, isLoading: false });
    } catch {
      this.setState({ types: 'Unknown', isLoading: false });
    }
  }

  render(): ReactNode {
    const { item } = this.props;
    const { types, isLoading } = this.state;

    return (
      <div className="card">
        <span className="card__name">{item.name}</span>
        <span className="card__description">
          {isLoading ? <Loader /> : types}
        </span>
      </div>
    );
  }
}
