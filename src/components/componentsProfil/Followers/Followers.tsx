import styles from './Followers.module.scss';

interface FollowersProps {
  number: number | string;
  nameColumn: string;
}

const Followers = ({ number, nameColumn }: FollowersProps) => (
  <div className={styles.container}>
    <p className={styles.number}>{number}</p>
    <p>{nameColumn}</p>
  </div>
);
export default Followers;
