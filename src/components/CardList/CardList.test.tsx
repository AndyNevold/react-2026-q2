import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';

vi.mock('../Card/Card', () => ({
  Card: ({ item }: { item: { name: string } }) => (
    <div data-testid="card">{item.name}</div>
  ),
}));

const mockItems = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

describe('CardList', () => {
  it('renders cards', () => {
    render(<CardList items={mockItems} isLoading={false} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('show loader', () => {
    render(<CardList items={[]} isLoading={true} />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('shows empty message', () => {
    render(<CardList items={[]} isLoading={false} />);

    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
});
