import GridImg from '@/assets/SwitchImg/Grid.png';
import PictureImg from '@/assets/SwitchImg/Picture.png';
import PlayImg from '@/assets/SwitchImg/Play.png';
import styles from './SwitchImage.module.scss';

const SwitchImage = () => {
  return (
    <div className={styles.switch}>
      <img src={GridImg} alt="" />
      <img src={PictureImg} alt="" />
      <img src={PlayImg} alt="" />
    </div>
  );
};
export default SwitchImage;
