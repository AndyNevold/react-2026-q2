import { Component, type ReactNode } from 'react';
import type { CardListProps } from '../../types/types.ts';
import { Loader } from '../Loader/Loader.tsx';
import { Card } from '../Card/Card.tsx';

export class CardList extends Component<CardListProps> {
  getContent(): ReactNode {
    const { items, isLoading } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (items.length === 0) {
      return <div>No items found</div>;
    }

    return items.map((item) => <Card key={item.name} item={item} />);
  }

  render(): ReactNode {
    return <div className="card-list">{this.getContent()}</div>;
  }
}
