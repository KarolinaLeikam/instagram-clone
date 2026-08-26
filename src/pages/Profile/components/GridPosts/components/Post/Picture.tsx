import { Link } from 'react-router-dom';
import styles from './Picture.module.scss';

const Picture = ({ post }) => (
  <Link to="/post" className={styles.post} state={{ selectedPostId: post.id }}>
    <img
      className={styles.img}
      src={`http://localhost:4000${post.cover}`}
      alt=""
    /> 
  </Link>
);

export default Picture;
