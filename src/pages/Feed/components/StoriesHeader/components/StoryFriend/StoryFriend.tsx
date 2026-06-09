import AvatarImg from '@/assets/Images/Post.jpg';
import styles from './StoryFriend.module.scss';

interface StoryFriendProps {
  onClick?: () => void;
}

const StoryFriend = ({ onClick }: StoryFriendProps) => (
  <div className={styles.layout} onClick={onClick}>
    <div className={styles.circle}>
      <img src={AvatarImg} alt="" />
    </div>
    <p>FriendName</p>
  </div>
);

export default StoryFriend;
