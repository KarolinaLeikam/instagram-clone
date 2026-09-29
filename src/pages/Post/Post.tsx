import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGetPostsByNameQuery } from '@/redux/slices/allPosts';
import { Footer, StatusBar } from '@/components/common';
import PostFriend from '@/components/common/PostFriend/PostFriend';
import HeaderPublication from './components/HeaderPublication/HeaderPublication';

import styles from './Post.module.scss';

const Post = () => {
  const { user } = useAuth();
  // Раньше был useEffect с ручной проверкой "if (!user?.username) return".
  // { skip: !user?.username } делает то же самое декларативно: запрос
  // просто не уйдёт, пока имя пользователя не подгрузилось из AuthContext.
  const { data: posts = [] } = useGetPostsByNameQuery(user?.username, {
    skip: !user?.username,
  });
  const location = useLocation();

  const selectedPostId: string = location.state?.selectedPostId;

  const postRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (selectedPostId && postRefs.current[selectedPostId]) {
      postRefs.current[selectedPostId].scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }, [posts, selectedPostId]);

  return (
    <div className={styles.page}>
      <StatusBar />
      <HeaderPublication />
      <div className={styles.content}>
        {posts.map((post) => (
          <div
            key={post.id}
            ref={(el) => {
              postRefs.current[post.id] = el;
            }}
          >
            <PostFriend post={post} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Post;
