import { HeartIcon, PlaneIcon } from '@/assets/Icons/InterectionIcons';
import { PlusAltIcon } from '@/assets/Icons/GeneralIcons';
import styles from './HeaderFeed.module.scss';

const HeaderFeed = () => (
  <div className={styles.container}>
    <div className={styles.layoutIcons}>
      <PlusAltIcon />
      <HeartIcon />
      <PlaneIcon />
    </div>
  </div>
);

export default HeaderFeed;
