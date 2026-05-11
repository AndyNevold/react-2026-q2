import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import { storageService } from '../../services/storage';

vi.mock('../../services/storage', () => ({
  storageService: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    vi.mocked(storageService.get).mockReturnValue('');
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    expect(
      screen.getByPlaceholderText('Enter Pokemon name')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows term from localStorage', () => {
    vi.mocked(storageService.get).mockReturnValue('pikachu');
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    expect(input).toHaveValue('pikachu');
  });

  it('updates input value', async () => {
    vi.mocked(storageService.get).mockReturnValue('');
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    await userEvent.type(input, 'text');

    expect(input).toHaveValue('text');
  });

  it('calls onSearch with trimmed', async () => {
    vi.mocked(storageService.get).mockReturnValue('');
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter Pokemon name');
    await userEvent.type(input, '  bulbasaur  ');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
    expect(storageService.set).toHaveBeenCalledWith('bulbasaur');
  });
});
