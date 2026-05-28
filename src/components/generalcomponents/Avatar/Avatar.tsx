import AvatarImg from '@/assets/Avatar.jpg';
import PlusImg from '@/assets/PlusBlue.png';
import styles from './Avatar.module.scss';

const Avatar = (props) => {
  const { className = '', size = 80 } = props;
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <img className={styles.photo} src={AvatarImg} alt="" />

      <div className={styles.borderPlus}>
        <img className={styles.plus} src={PlusImg} alt="" />
      </div>
    </div>
  );
};
export default Avatar;
