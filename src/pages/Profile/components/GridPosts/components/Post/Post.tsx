import { Link } from 'react-router-dom';
import PostImg from '@/assets/Images/Post.jpg';
import styles from './Post.module.scss';

const Post = () => (
  <Link to="/post">
    <div className={styles.post}>
      <img className={styles.img} src={PostImg} alt="" />
    </div>
  </Link>
);
export default Post;
