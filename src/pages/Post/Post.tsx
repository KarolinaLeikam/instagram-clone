import React from 'react';
import { Footer, StatusBar } from '@/components/common';
import PostFriend from '@/components/common/PostFriend/PostFriend';
import HeaderPublication from './components/HeaderPublication/HeaderPublication';
import styles from './Post.module.scss';

const Post = () => (
  <div className={styles.page}>
    <StatusBar />
    <HeaderPublication />
    <div className={styles.content}>
      <PostFriend />
      <PostFriend />
    </div>
    <Footer />
  </div>
);

export default Post;
