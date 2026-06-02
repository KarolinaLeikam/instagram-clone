import FriendFoto from '@/assets/Images/Post.jpg';

import {
  BookMarkIcon,
  CommentIcon,
  HeartIcon,
  PlaneIcon,
} from '@/assets/Icons/InterectionIcons';
import styles from './PostFriend.module.scss';

const PostFriend = () => (
  <div className={styles.container}>
    <div className={styles.containerHeader}>
      <div className={styles.containerAvatarName}>
        <img className={styles.friendAvatar} src={FriendFoto} alt="" />
        <p>FriendName</p>
      </div>
      {/* <img src={MenuDotsImg} alt="" /> */}
    </div>
    <img className={styles.post} src={FriendFoto} alt="" />
    <div className={styles.bottomPost}>
      <div className={styles.containerLikes}>
        <HeartIcon />
        <CommentIcon />
        <PlaneIcon />
      </div>

      <div className={styles.dots}>
        <div className={styles.active} />
        <div />
        <div />
      </div>
      <BookMarkIcon />
    </div>
    <p>33 Likes</p>
    <div>
      <p>FriendName</p>
      <p>hello world</p>
    </div>
  </div>
);

export default PostFriend;
