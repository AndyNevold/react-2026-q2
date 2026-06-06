import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { createTestWrapper } from '../../test-utils/test-wrapper';

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

const TestWrapper = createTestWrapper({});

describe('CardList', () => {
  it('renders cards', () => {
    render(
      <TestWrapper>
        <CardList items={mockItems} isLoading={false} {...defaultProps} />
      </TestWrapper>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('show loader', () => {
    render(
      <TestWrapper>
        <CardList items={[]} isLoading={true} {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('shows empty message', () => {
    render(
      <TestWrapper>
        <CardList items={[]} isLoading={false} {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
});
