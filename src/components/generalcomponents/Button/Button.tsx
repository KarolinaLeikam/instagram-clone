import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  type = 'button',
  children,
  className = '',
  ...rest
}: ButtonProps) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className={`${styles.button} ${className}`} {...rest}>
    {children}
  </button>
);
export default Button;
