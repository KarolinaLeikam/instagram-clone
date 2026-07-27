import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Footer, StatusBar } from '@/components/common';
import PostFriend from '@/components/common/PostFriend/PostFriend';
import HeaderPublication from './components/HeaderPublication/HeaderPublication';
import { usePosts } from '@/context/GetAllPosts';
import styles from './Post.module.scss';

const Post = () => {
  const { user } = useAuth();
  const { allPostsFetch, posts } = usePosts();

  useEffect(() => {
    if (!user.username) return;

    allPostsFetch();
  }, [user.username]);

  return (
    <div className={styles.page}>
      <StatusBar />
      <HeaderPublication />
      <div className={styles.content}>
        {posts.map((post) => (
          <PostFriend post={post} key={post.id} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Post;
