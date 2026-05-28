import Avatar from '@/components/generalcomponents/Avatar/Avatar';
import AllFollowers from '@/components/componentsProfil/AllFollowers/AllFollowers';
import NameProfile from '@/components/componentsProfil/NameProfile/NameProfile';
import Button from '@/components/generalcomponents/Button/Button';
import Stories from '@/components/componentsProfil/Stories/Stories';
import SwitchImage from '@/components/componentsProfil/SwitchImage/SwitchImage';
import SubcribeImg from '@/assets/Subcribe.png';
import styles from './Information.module.scss';

const Information: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.containerAvatar}>
      <Avatar />
      <AllFollowers />
    </div>
    <NameProfile name='123' />
    <div className={styles.buttons}>
      <Button className={styles.buttonRedactor}>Modifier le profil</Button>
      <Button className={styles.buttonSubcribe}>
        <img src={SubcribeImg} alt="" />
      </Button>
    </div>
    <Stories />
    <SwitchImage />
  </div>
);

export default Information;
