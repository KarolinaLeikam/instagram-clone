import React from 'react';
import { useContext, createContext, ReactNode, useState } from 'react';
import { useAuth } from './AuthContext';

interface ContextType {
  allPostsFetch: () => Promise<void>;
  posts: PostType[];
}

const PostsContext = createContext<any>(null);

export interface PostType {
  id: string;
  cover: string;
  likeCound: number;
  commentCount: number;
}

export const GetAllPosts = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);

  async function allPostsFetch() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(
        `http://localhost:4000/users/${user.username}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PostsContext.Provider value={{ allPostsFetch, posts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
