import HomeImg from '@/assets/FooterImg/Home.png';
import PlayImg from '@/assets/FooterImg/Play.png';
import SearchImg from '@/assets/FooterImg/Search.png';
import ShopImg from '@/assets/FooterImg/Shop.png';
import AvatarImg from '@/assets/Avatar.jpg';
import styles from './Footer.module.scss';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.contentImg}>
      <img src={HomeImg} alt="" />
      <img src={PlayImg} alt="" />
      <img src={SearchImg} alt="" />
      <img src={ShopImg} alt="" />
      <div className={styles.circle}>
        <img className={styles.AvatarImg} src={AvatarImg} alt="" />
      </div>
    </div>
  </div>
);
export default Footer;
