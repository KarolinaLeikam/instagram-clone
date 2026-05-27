import LockImg from '../../assets/HeaderImg/fi-rr-lock.png';
import PlusImg from '../../assets/HeaderImg/Plus.png';
import MenuImg from '../../assets/HeaderImg/fi-rr-menu-burger.png';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nameContainer}>
          <img src={LockImg} alt="LockImg" />
          <h2>Monldentifiant</h2>
          <span className={styles.buttonNumber}>9+</span>
        </div>
        <div className={styles.menuContainer}>
          
          <img src={PlusImg} alt="PlusImg" />
          <img src={MenuImg} alt="MenuImg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
