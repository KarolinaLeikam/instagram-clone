import FriendFoto from '@/assets/Images/Post.jpg';

import {
  BookMarkIcon,
  CommentIcon,
  HeartIcon,
  PlaneIcon,
} from '@/assets/Icons/InterectionIcons';
import { MenuDotsIcon } from '@/assets/Icons/GeneralIcons';
import styles from './PostFriend.module.scss';

const PostFriend = () => (
  <div className={styles.container}>
    <div className={styles.containerHeader}>
      <div className={styles.containerAvatarName}>
        <img className={styles.friendAvatar} src={FriendFoto} alt="" />
        <h3>FriendName</h3>
      </div>
      <MenuDotsIcon />
      {/* <img src={MenuDotsImg} alt="" /> */}
    </div>
    <img className={styles.post} src={FriendFoto} alt="" />
    <div className={styles.dots}>
      <div className={styles.active} />
      <div />
      <div />
    </div>
    <div className={styles.bottomPost}>
      <div className={styles.containerLikes}>
        <HeartIcon />
        <CommentIcon />
        <PlaneIcon />
      </div>
      <BookMarkIcon className={styles.bookmark} />
    </div>
    <h3 className={styles.likes}>33 Likes</h3>
    <div className={styles.text}>
      <h3>FriendName</h3>
      <p>hello world</p>
    </div>
  </div>
);

export default PostFriend;
