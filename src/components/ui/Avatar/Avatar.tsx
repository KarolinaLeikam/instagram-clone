import AvatarImg from '@/assets/Images/Avatar.jpg';
import { PlusSmallIcon } from '@/assets/Icons/GeneralIcons';
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
        <PlusSmallIcon className={styles.plus} />
      </div>
    </div>
  );
};
export default Avatar;
