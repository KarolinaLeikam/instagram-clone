import { useAuth } from '@/context/AuthContext';
import { LockIcon, MenuBurgerIcon } from '@/assets/Icons/HeaderIcons';
import { PlusAltIcon } from '@/assets/Icons/GeneralIcons';
import { useState } from 'react';
import AddPhoto from '@/components/modal/AddPhoto/AddPhoto';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nameContainer}>
          <LockIcon />
          <h1>{user.username}</h1>
          <span className={styles.buttonNumber}>9+</span>
        </div>
        <div className={styles.menuContainer}>
          <PlusAltIcon onClick={() => setIsModalOpen(true)} />
          <MenuBurgerIcon />
          <AddPhoto
            isOpen={isModalOpen}
            onMyClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
