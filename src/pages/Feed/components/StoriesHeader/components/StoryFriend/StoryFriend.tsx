import AvatarImg from '@/assets/Images/Post.jpg';
import styles from './StoryFriend.module.scss';

interface StoryFriendProps {
  onClick?: () => void;
}

const StoryFriend = ({ onClick }: StoryFriendProps) => (
  <button type="button" className={styles.layout} onClick={onClick}>
    <div className={styles.circle}>
      <img src={AvatarImg} alt="" />
    </div>
    <p>FriendName</p>
  </button>
);

export default StoryFriend;
