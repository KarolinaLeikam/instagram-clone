import Avatar from '@/components/generalcomponents/Avatar/Avatar';
import AllFollowers from '@/components/componentsProfil/AllFollowers/AllFollowers';
import NameProfile from '@/components/componentsProfil/NameProfile/NameProfile';
import Button from '@/components/generalcomponents/Button/Button';
import Stories from '@/components/componentsProfil/Stories/Stories';
import SwitchImage from '@/components/componentsProfil/SwitchImage/SwitchImage';
import styles from './Information.module.scss';
import SubcribeImg from '@/assets/Subcribe.png';
const Information: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerAvatar}>
        <Avatar />
        <AllFollowers />
      </div>

      <NameProfile />
      <div className={styles.buttons}>
        {' '}
        <Button className={styles.buttonRedactor}>Modifier le profil</Button>
        <Button className={styles.buttonSubcribe}>
          <img src={SubcribeImg} alt="" />
        </Button>
      </div>

      <Stories />
      <SwitchImage />
    </div>
  );
};

export default Information;
