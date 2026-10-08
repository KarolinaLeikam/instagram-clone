import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import Button from './Button';

const onClick = vi.fn();

describe(' Search component', () => {
  it('renders children with string hello', () => {
    render(
      <Button onClick={onClick} className="" type="button">
        <p>hello</p>
      </Button>
    );
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
  it('onClick works', async () => {
    const user = userEvent.setup();
    render(
      <Button onClick={onClick} className="" type="button">
        <p>hello</p>
      </Button>
    );
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });
  it('classname work', () => {
    render(
      <Button onClick={onClick} className="red" type="button">
        <p>hello</p>
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('red');
  });

  it('button have type', () => {
    render(
      <Button onClick={onClick} className="" type="button">
        <p>hello</p>
      </Button>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
