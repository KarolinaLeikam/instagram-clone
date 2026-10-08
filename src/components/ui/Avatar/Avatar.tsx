import { PlusSmallIcon } from '@/assets/Icons/GeneralIcons';
import useProfileUsername from '@/hooks/useProfileUsername';
import { useGetUserInfoQuery } from '@/redux/slices/userInfoSlice';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  size?: number;
}

const Avatar = ({ className = '', size = 80 }: AvatarProps) => {
  const currentProfile = useProfileUsername();
  const { data: userData } = useGetUserInfoQuery(currentProfile ?? '', {
    skip: !currentProfile,
  });

  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <img
        className={styles.photo}
        src={`http://localhost:4000${userData?.avatarUrl}`}
        alt=""
      />

      <div className={styles.borderPlus}>
        <PlusSmallIcon className={styles.plus} />
      </div>
    </div>
  );
};
export default Avatar;
