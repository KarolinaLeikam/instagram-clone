import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGetGridPostsQuery } from '@/redux/slices/postsSlice';
import Picture from './components/Post/Picture';
import styles from './GridPosts.module.scss';

const GridPosts = () => {
  const { username } = useParams();
  const { user } = useAuth();

  const usernameToFetch = username || user?.username;

  const { data: posts = [] } = useGetGridPostsQuery(usernameToFetch, {
    skip: !usernameToFetch,
  });
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <Picture post={post} key={post.id} />
      ))}
    </div>
  );
};
export default GridPosts;
