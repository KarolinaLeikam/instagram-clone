import {
  HomeIcon,
  PlayAltIcon,
  SearchIcon,
  ShopBagIcon,
} from '@/assets/Icons/FooterIcons';
import AvatarImg from '@/assets/Images/Avatar.jpg';
import styles from './Footer.module.scss';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.contentImg}>
      <HomeIcon />
      <PlayAltIcon />
      <SearchIcon />
      <ShopBagIcon />
      <div className={styles.circle}>
        <img className={styles.AvatarImg} src={AvatarImg} alt="" />
      </div>
    </div>
  </div>
);
export default Footer;
