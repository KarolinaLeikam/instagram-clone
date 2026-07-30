import React from 'react';
import {
  UseFormRegister,
  FieldError,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';
import styles from './AuthInput.module.scss';

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  error?: FieldError;
}

const AuthInput = <TFieldValues extends FieldValues>({
  register,
  name,
  rules,
  error,
  ...props
}: InputProps<TFieldValues>) => (
  <div className={styles.layout}>
    <input className={styles.input} {...register(name, rules)} {...props} />
    {error && <p className={styles.error}>{error.message}</p>}
  </div>
);

export default AuthInput;
