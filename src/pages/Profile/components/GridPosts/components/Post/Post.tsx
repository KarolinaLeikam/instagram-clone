import PostImg from '@/assets/Images/Post.jpg';
import styles from './Post.module.scss';

const Post = () => (
  <div className={styles.post}>
    <img className={styles.img} src={PostImg} alt="" />
  </div>
);
export default Post;
