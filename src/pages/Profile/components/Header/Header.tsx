import { useAuth } from '@/context/AuthContext';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { LockIcon, MenuBurgerIcon } from '@/assets/Icons/HeaderIcons';
import {
  PlusAltIcon,
  AngleLeftIcon,
  MenuDotsIcon,
} from '@/assets/Icons/GeneralIcons';
import { useState } from 'react';
import AddPhoto from '@/components/modal/AddPhoto/AddPhoto';
import styles from './Header.module.scss';

const Header = () => {
  const { user } = useAuth();

  const { username } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const pathYourProfile = location.pathname === '/profile';

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nameContainer}>
          {pathYourProfile ? (
            <LockIcon />
          ) : (
            <AngleLeftIcon onClick={() => navigate('/main')} />
          )}
          <h1>{!pathYourProfile ? username : user?.username}</h1>
          {pathYourProfile && <span className={styles.buttonNumber}>9+</span>}
        </div>
        <div className={styles.menuContainer}>
          {pathYourProfile && (
            <>
              <PlusAltIcon onClick={() => setIsModalOpen(true)} />
              <MenuBurgerIcon />
              <AddPhoto
                isOpen={isModalOpen}
                onMyClose={() => setIsModalOpen(false)}
              />
            </>
          )}
          {!pathYourProfile && (
            <>
              <MenuDotsIcon />
              <AddPhoto
                isOpen={isModalOpen}
                onMyClose={() => setIsModalOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
