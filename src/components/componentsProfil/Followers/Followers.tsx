import styles from './Followers.module.scss';

const Followers = ({ number, nameColumn }) => (
  <div className={styles.container}>
    <p className={styles.number}>{number}</p>
    <p>{nameColumn}</p>
  </div>
);
export default Followers;
