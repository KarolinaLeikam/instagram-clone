import {
  GridIcon,
  SmallPictureIcon,
  PlayIcon,
} from '@/assets/Icons/ProfileNavBarIcons';
import styles from './ProfileNavBar.module.scss';

const ProfileNavBar = () => (
  <div className={styles.switch}>
    <GridIcon />
    <SmallPictureIcon />
    <PlayIcon />
  </div>
);
export default ProfileNavBar;
