import { Link } from 'react-router-dom';
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
      <Link to="/">
        <HomeIcon />
      </Link>
      <PlayAltIcon />
      <SearchIcon />
      <ShopBagIcon />
      <Link to="/profile">
        <div className={styles.circle}>
          <img className={styles.AvatarImg} src={AvatarImg} alt="" />
        </div>
      </Link>
    </div>
  </div>
);
export default Footer;
