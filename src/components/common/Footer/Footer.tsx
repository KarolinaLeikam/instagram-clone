import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  HomeIcon,
  PlayAltIcon,
  SearchIcon,
  ShopBagIcon,
} from '@/assets/Icons/FooterIcons';

import styles from './Footer.module.scss';

const Footer = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.contentImg}>
        <Link to="/main">
          <HomeIcon />
        </Link>
        <PlayAltIcon />
        <SearchIcon />
        <ShopBagIcon />
        <Link to="/profile">
          <div className={styles.circle}>
            <img
              className={styles.AvatarImg}
              src={`http://localhost:4000${user.avatarUrl}`}
              alt=""
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
