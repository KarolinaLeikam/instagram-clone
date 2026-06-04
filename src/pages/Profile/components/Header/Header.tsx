import { LockIcon, MenuBurgerIcon } from '@/assets/Icons/HeaderIcons';
import { PlusAltIcon } from '@/assets/Icons/GeneralIcons';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <div className={styles.header}>
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <LockIcon />
        <h1>Monldentifiant</h1>
        <span className={styles.buttonNumber}>9+</span>
      </div>
      <div className={styles.menuContainer}>
        <PlusAltIcon />
        <MenuBurgerIcon />
      </div>
    </div>
  </div>
);

export default Header;
