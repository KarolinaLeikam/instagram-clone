import Followers from '@/components/componentsProfil/Followers/Followers';
import styles from './AllFollowers.module.scss';

const AllFollowers = () => (
  <div className={styles.container}>
    <Followers nameColumn="Publications" number={153} />
    <Followers nameColumn="Followers" number={209} />
    <Followers nameColumn="Suivi(e)s" number={109} />
  </div>
);
export default AllFollowers;
