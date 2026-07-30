import { Link } from 'react-router-dom';
import styles from './Post.module.scss';

const Post = ({ post }) => (
  <Link to="/post" className={styles.post}>
    <img
      className={styles.img}
      src={`http://localhost:4000${post.cover}`}
      alt=""
    />
  </Link>
);

export default Post;
