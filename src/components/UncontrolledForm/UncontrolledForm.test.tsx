import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncontrolledForm } from './UncontrolledForm';
import { useFormStore } from '../../store/formStore';

describe('UncontrolledForm', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    useFormStore.setState({ submissions: [] });
  });

  it('renders all form fields', () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    expect(screen.getByText('Name *')).toBeInTheDocument();
    expect(screen.getByText('Age *')).toBeInTheDocument();
    expect(screen.getByText('Email *')).toBeInTheDocument();
    expect(screen.getByText('Gender *')).toBeInTheDocument();
    expect(screen.getByText('Password *')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password *')).toBeInTheDocument();
    expect(screen.getByText('Country *')).toBeInTheDocument();
    expect(
      screen.getByText('Profile Image * (PNG/JPEG, max 2MB)')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I accept the Terms and Conditions/)
    ).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please select gender/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/You must accept Terms and Conditions/i)
      ).toBeInTheDocument();
    });
  });

  it('validates name first letter uppercase', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    await userEvent.type(nameInput, 'john');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/First letter must be uppercase/i)
      ).toBeInTheDocument();
    });
  });

  it('validates password match', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmInput = screen.getByLabelText(/Confirm Password/i);

    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmInput, 'different');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('shows password strength indicator', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const passwordInput = screen.getByLabelText(/^Password/i);

    await userEvent.type(passwordInput, 'weak');
    expect(screen.getByText(/Weak password/i)).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongP@ss1');
    expect(screen.getByText(/Strong password/i)).toBeInTheDocument();
  });

  it('validates country is selected', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const { container } = render(<UncontrolledForm onClose={mockOnClose} />);

    // Заполняем обязательные поля
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'John');

    const ageInput = screen.getByRole('spinbutton', { name: /age/i });
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '25');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'john@example.com');

    // Радио-кнопка
    const maleRadio = container.querySelector(
      'input[value="male"]'
    ) as HTMLElement;
    if (maleRadio) {
      await userEvent.click(maleRadio);
    }

    // Пароли
    const passwordInput = screen.getByLabelText(/^Password/i);
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongP@ss1');

    const confirmInput = screen.getByLabelText(/Confirm Password/i);
    await userEvent.clear(confirmInput);
    await userEvent.type(confirmInput, 'StrongP@ss1');

    // Страна
    const countrySelect = screen.getByRole('combobox', { name: /country/i });
    await userEvent.selectOptions(countrySelect, 'United States');

    // Чекбокс
    const termsCheckbox = screen.getByRole('checkbox');
    await userEvent.click(termsCheckbox);

    // Проверяем, что все поля заполнены
    expect(nameInput).toHaveValue('John');
    expect(ageInput).toHaveValue(25);
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('StrongP@ss1');
    expect(confirmInput).toHaveValue('StrongP@ss1');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 2000 }
    );
  });
});
