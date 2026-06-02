import { LockIcon, MenuBurgerIcon } from '@/assets/Icons/HeaderIcons';
import { PlusIcon } from '@/assets/Icons/GeneralIcons';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <div className={styles.header}>
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <LockIcon />
        <h2>Monldentifiant</h2>
        <span className={styles.buttonNumber}>9+</span>
      </div>
      <div className={styles.menuContainer}>
        <PlusIcon />
        <MenuBurgerIcon />
      </div>
    </div>
  </div>
);

export default Header;
