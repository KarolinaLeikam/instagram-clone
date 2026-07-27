import styles from './AuthInput.module.scss';

const AuthInput = ({ register, name, rules, error, ...props }) => {
  return (
    <div className={styles.layout}>
      <input className={styles.input} {...register(name, rules)} {...props} />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default AuthInput;
