import { useState, useEffect } from 'react';
import Post from './components/Post/Post';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/GetAllPosts';
import styles from './GridPosts.module.scss';

const GridPosts = () => {
  const { user } = useAuth();
  const { allPostsFetch, posts } = usePosts();

  useEffect(() => {
    if (!user.username) return;

    allPostsFetch();
  }, [user.username]);

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
export default GridPosts;
