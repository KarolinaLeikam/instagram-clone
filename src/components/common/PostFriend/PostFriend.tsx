import { useAuth } from '@/context/AuthContext';
import {
  BookMarkIcon,
  CommentIcon,
  HeartIcon,
  PlaneIcon,
} from '@/assets/Icons/InterectionIcons';
import { useLocation } from 'react-router-dom';
import { MenuDotsIcon } from '@/assets/Icons/GeneralIcons';
import { useState } from 'react';
import type { PostType } from '@/context/GetAllPosts';
import MenuPhoto from '../../modal/MenuPhoto/MenuPhoto';
import styles from './PostFriend.module.scss';

const PostFriend = ({ post }: { post: PostType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const location = useLocation();
  const isHideImage = location.pathname === '/main';
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerAvatarName}>
          <img
            className={styles.friendAvatar}
            src={`http://localhost:4000${user.avatarUrl}`}
            alt=""
          />
          <h3>{user.username}</h3>
        </div>
        <MenuDotsIcon onClick={() => setModalOpen(true)} />
        <MenuPhoto
          post={post}
          isOpen={modalOpen}
          onMyClose={() => setModalOpen(false)}
        />
        {/* <img src={MenuDotsImg} alt="" /> */}
      </div>
      {!isHideImage && (
        <img
          className={styles.post}
          src={`http://localhost:4000${post.cover}`}
          alt=""
        />
      )}

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
        <h3>{user.username}</h3>
        <p>hello world</p>
      </div>
    </div>
  );
};

export default PostFriend;
