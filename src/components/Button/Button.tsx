import styles from './Button.module.scss';

const Button = (props) => {
  const { type = 'button', children, className = '' } = props;
  return (
    <button className={`${styles.button} ${className}`} type={type}>
      {children}
    </button>
  );
};
export default Button;
