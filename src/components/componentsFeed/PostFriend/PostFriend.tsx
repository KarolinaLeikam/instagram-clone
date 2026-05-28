import BookMarkImg from '@/assets/PostFriendImg/BookMark.png';
import CommentImg from '@/assets/PostFriendImg/Comment.png';
import HeartImg from '@/assets/PostFriendImg/Heart.png';
import MenuDotsImg from '@/assets/PostFriendImg/MenuDots.png';
import PaperPlaneImg from '@/assets/PostFriendImg/PaperPlane.png';
import FriendFoto from '@/assets/PostFriendImg/Friend.avif';
import styles from './PostFriend.module.scss';

const PostFriend = () => (
  <div className={styles.container}>
    <div className={styles.containerHeader}>
      <div className={styles.containerAvatarName}>
        <img className={styles.friendAvatar} src={FriendFoto} alt="" />
        <p>FriendName</p>
      </div>
      <img src={MenuDotsImg} alt="" />
    </div>
    <img className={styles.post} src={FriendFoto} alt="" />
    <div className={styles.bottomPost}>
      <div className={styles.containerLikes}>
        <img src={HeartImg} alt="" />
        <img src={CommentImg} alt="" />
        <img src={PaperPlaneImg} alt="" />
      </div>

      <div className={styles.dots}>
        <div className={styles.active} />
        <div />
        <div />
      </div>
      <img src={BookMarkImg} alt="" />
    </div>
    <p>33 Likes</p>
    <div>
      <p>FriendName</p>
      <p>hello world</p>
    </div>
  </div>
);

export default PostFriend;
