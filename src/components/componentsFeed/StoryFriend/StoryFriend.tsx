import AvatarImg from '@/assets/PostFriendImg/Friend.avif';
import styles from './StoryFriend.module.scss';

const StoryFriend = () => (
  <div className={styles.layout}>
    <div className={styles.circle}>
      <img src={AvatarImg} alt="" />
    </div>
    <p>FriendName</p>
  </div>
);

export default StoryFriend;
