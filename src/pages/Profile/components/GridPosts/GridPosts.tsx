import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from '@/context/GetAllPosts';
import Picture from './components/Post/Picture';
import styles from './GridPosts.module.scss';

const GridPosts = () => {
  const { username } = useParams();
  const { allPostsFetch, posts } = usePosts();

  useEffect(() => {
    allPostsFetch(username);
  }, [username, allPostsFetch]);

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <Picture post={post} key={post.id} />
      ))}
    </div>
  );
};
export default GridPosts;
