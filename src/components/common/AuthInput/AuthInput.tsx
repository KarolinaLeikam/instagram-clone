import type {
  UseFormRegister,
  FieldError,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';
import styles from './AuthInput.module.scss';

interface PropsInput<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
}

const AuthInput = <T extends FieldValues>({
  register,
  name,
  rules = {},
  error = undefined,
  ...props
}: PropsInput<T>) => (
  <div className={styles.layout}>
    <input className={styles.input} {...register(name, rules)} {...props} />
    {error && <p className={styles.error}>{error.message}</p>}
  </div>
);

export default AuthInput;
