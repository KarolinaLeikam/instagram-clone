import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';

interface FormValues {
  username: string;
}

const Wrapper = ({ errorMessage }: { errorMessage?: string }) => {
  const { register } = useForm<FormValues>();

  return (
    <AuthInput
      register={register}
      name="username"
      placeholder="User Name"
      error={
        errorMessage ? { type: 'manual', message: errorMessage } : undefined
      }
    />
  );
};

describe('AuthInput', () => {
  it('рендерит инпут с placeholder', () => {
    render(<Wrapper />);

    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
  });

  it('не показывает текст ошибки, если ошибки нет', () => {
    render(<Wrapper />);

    expect(screen.queryByText(/обязательное/i)).not.toBeInTheDocument();
  });

  it('показывает текст ошибки, если error передан', () => {
    render(<Wrapper errorMessage="Обязательное поле" />);

    expect(screen.getByText('Обязательное поле')).toBeInTheDocument();
  });

  it('позволяет пользователю вводить текст', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByPlaceholderText('User Name');
    await user.type(input, 'karolina');

    expect(input).toHaveValue('karolina');
  });
});
