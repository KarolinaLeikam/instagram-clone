import { useGetGridPostsQuery } from '@/redux/slices/postsSlice';
import useProfileUsername from '@/hooks/useProfileUsername';
import Picture from './components/Post/Picture';
import styles from './GridPosts.module.scss';

const GridPosts = () => {
  const currentProfile = useProfileUsername();

  const { data: posts = [] } = useGetGridPostsQuery(currentProfile, {
    skip: !currentProfile,
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
