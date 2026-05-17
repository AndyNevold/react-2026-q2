import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';

vi.mock('../Card/Card', () => ({
  Card: ({
    item,
    onClick,
  }: {
    item: { name: string };
    onClick: (item: { name: string }) => void;
  }) => (
    <div data-testid="card" onClick={() => onClick(item)}>
      {item.name}
    </div>
  ),
}));

const mockItems = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

const defaultProps = {
  page: 1,
  totalPages: 1,
  onPageChange: vi.fn(),
  onItemClick: vi.fn(),
};

describe('CardList', () => {
  it('renders cards', () => {
    render(<CardList items={mockItems} isLoading={false} {...defaultProps} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('show loader', () => {
    render(<CardList items={[]} isLoading={true} {...defaultProps} />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('shows empty message', () => {
    render(<CardList items={[]} isLoading={false} {...defaultProps} />);

    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
});
