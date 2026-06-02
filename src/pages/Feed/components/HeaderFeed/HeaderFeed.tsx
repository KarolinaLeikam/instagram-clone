import { HeartIcon, PlaneIcon } from '@/assets/Icons/InterectionIcons';
import { PlusIcon } from '@/assets/Icons/GeneralIcons';
import styles from './HeaderFeed.module.scss';

const HeaderFeed = () => (
  <div className={styles.container}>
    <div className={styles.layoutIcons}>
      <PlusIcon />
      <HeartIcon />
      <PlaneIcon />
    </div>
  </div>
);

export default HeaderFeed;
