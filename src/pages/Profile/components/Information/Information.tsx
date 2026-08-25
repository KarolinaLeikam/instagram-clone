import { Link, useLocation } from 'react-router-dom';
import { Avatar, Button } from '@/components/ui';
import { UserAddIcon } from '@/assets/Icons/GeneralIcons';

import {
  AllFollowers,
  NameProfile,
  ProfileNavBar,
  Stories,
} from './components';

import styles from './Information.module.scss';

const Information = () => {
  const location = useLocation();
  const pathYourProfile = location.pathname === '/profile';
  return (
    <div className={styles.container}>
      <div className={styles.containerAvatar}>
        <Avatar />
        <AllFollowers />
      </div>
      <NameProfile />
      <div className={styles.buttons}>
        {pathYourProfile && (
          <div>
            <Link to="/edit" className={styles.buttonRedactor}>
              Edit profile
            </Link>
            <Button className={styles.buttonSubcribe}>
              <UserAddIcon />
            </Button>
          </div>
        )}
        {!pathYourProfile && (
          <div>
            <Button>Follow</Button>
            <Button>Message</Button>
          </div>
        )}
      </div>
      <Stories />
      <ProfileNavBar />
    </div>
  );
};

export default Information;
