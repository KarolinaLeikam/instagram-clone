import AvatarImg from '@/assets/Images/Avatar.jpg';
import { PlusSmallIcon } from '@/assets/Icons/GeneralIcons';
import { useAuth } from '@/context/AuthContext';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  size?: number;
}

const Avatar = ({ className = '', size = 80 }: AvatarProps) => {
  const { user } = useAuth();
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };
  console.log(user?.avatarUrl);
  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <img
        className={styles.photo}
        src={
          user?.avatarUrl ? `http://localhost:4000${user.avatarUrl}` : AvatarImg
        }
        alt=""
      />

      <div className={styles.borderPlus}>
        <PlusSmallIcon className={styles.plus} />
      </div>
    </div>
  );
};
export default Avatar;
