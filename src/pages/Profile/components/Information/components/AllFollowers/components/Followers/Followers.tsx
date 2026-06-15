import styles from './Followers.module.scss';

interface FollowersProps {
  number: number | string;
  nameColumn: string;
}

const Followers = ({ number, nameColumn }: FollowersProps) => (
  <div className={styles.container}>
    <h2 className={styles.number}>{number}</h2>
    <p>{nameColumn}</p>
  </div>
);
export default Followers;
