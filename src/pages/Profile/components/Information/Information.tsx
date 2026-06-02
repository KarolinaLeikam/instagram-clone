import { Avatar, Button } from '@/components/ui';
import { UserAddIcon } from '@/assets/Icons/GeneralIcons';
import {
  AllFollowers,
  NameProfile,
  ProfileNavBar,
  Stories,
} from './components';
import styles from './Information.module.scss';

const Information: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.containerAvatar}>
      <Avatar />
      <AllFollowers />
    </div>
    <NameProfile />
    <div className={styles.buttons}>
      <Button className={styles.buttonRedactor}>Modifier le profil</Button>
      <Button className={styles.buttonSubcribe}>
        <UserAddIcon />
      </Button>
    </div>
    <Stories />
    <ProfileNavBar />
  </div>
);

export default Information;
