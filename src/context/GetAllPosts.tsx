import {
  useCallback,
  useMemo,
  useContext,
  createContext,
  type ReactNode,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

export interface PostType {
  id: string;
  cover: string;
  likeCound: number;
  commentCount: number;
  caption: string;
}

interface ContextType {
  allPostsFetch: (username?: string) => Promise<void>;
  posts: PostType[];
}

const initial: ContextType = {
  allPostsFetch: () => Promise.resolve(),
  posts: [],
};
const PostsContext = createContext<ContextType>(initial);

export const GetAllPosts = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);

  const allPostsFetch = useCallback(
    async (username?: string) => {
      const usernameToFetch = username || user?.username;
      if (!usernameToFetch) return;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await fetch(
          `http://localhost:4000/users/${usernameToFetch}/posts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    [user?.username]
  );

  const value = useMemo(
    () => ({
      allPostsFetch,
      posts,
    }),
    [allPostsFetch, posts]
  );

  console.log(posts);
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
