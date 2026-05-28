import AvatarImg from '@/assets/Avatar.jpg';
import PlusImg from '@/assets/PlusBlue.png';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  size?: number;
}

const Avatar = ({ className = '', size = 80 }: AvatarProps) => {
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
