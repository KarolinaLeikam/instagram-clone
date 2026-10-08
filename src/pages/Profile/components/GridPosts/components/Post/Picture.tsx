import { Link } from 'react-router-dom';
import routes from '@/utils/router';
import type { PostType } from '@/types';
import styles from './Picture.module.scss';

const Picture = ({ post }: { post: PostType }) => (
  <Link
    to={routes.post}
    className={styles.post}
    state={{ selectedPostId: post.id }}
  >
    <img
      className={styles.img}
      src={`http://localhost:4000${post.images[0]?.url}`}
      alt=""
    />
  </Link>
);

export default Picture;
