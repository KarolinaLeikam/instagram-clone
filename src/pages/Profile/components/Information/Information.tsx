import { Avatar, Button } from '@/components/ui';
import { UserAddIcon } from '@/assets/Icons/GeneralIcons';

import { Link } from 'react-router-dom';
import {
  AllFollowers,
  NameProfile,
  ProfileNavBar,
  Stories,
} from './components';
import styles from './Information.module.scss';

const Information = () => (
  <div className={styles.container}>
    <div className={styles.containerAvatar}>
      <Avatar />
      <AllFollowers />
    </div>
    <NameProfile />
    <div className={styles.buttons}>
      <Link to="/edit" className={styles.buttonRedactor}>
        Edit profile
      </Link>

      <Button className={styles.buttonSubcribe}>
        <UserAddIcon />
      </Button>
    </div>
    <Stories />
    <ProfileNavBar />
  </div>
);

export default Information;
