import Avatar from '../Avatar/Avatar';
import AllFollowers from '../AllFollowers/AllFollowers';
import NameProfile from '../NameProfile/NameProfile';
import Button from '../Button/Button';
import Stories from '../Stories/Stories';
import SwitchImage from '../SwitchImage/SwitchImage';
import styles from './Informatiom.module.scss';
import SubcribeImg from '../../assets/Subcribe.png';
const Information: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerAvatar}>
        <Avatar />
        <AllFollowers />
      </div>

      <NameProfile />
      <div className={styles.buttons}> <Button className={styles.buttonRedactor}>Modifier le profil</Button>
      <Button className={styles.buttonSubcribe}>
        <img src={SubcribeImg} alt="" />
      </Button></div>
     

      <Stories />
      <SwitchImage />
    </div>
  );
};

export default Information;
