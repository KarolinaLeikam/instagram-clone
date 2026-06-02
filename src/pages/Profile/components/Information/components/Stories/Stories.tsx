import { PlusIcon } from '@/assets/Icons/GeneralIcons';
import styles from './Stories.module.scss';

const Stories = () => (
  <div className={styles.container}>
    <div className={styles.containerCenter}>
      {' '}
      <button type="button" className={styles.circle} aria-label="Add story">
        <PlusIcon />
      </button>
      <p>Hello</p>
    </div>
  </div>
);
export default Stories;
