import styles from "./Followers.module.scss"

const Followers = ({ number, nameColumn }) => {
  return (
    <div className={styles.container}>
      <p className={styles.number}>{number}</p>
      <p>{nameColumn}</p>
    </div>
  );
};
export default Followers;
