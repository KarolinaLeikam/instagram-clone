import {
  useCallback,
  useMemo,
  useContext,
  createContext,
  type ReactNode,
  useState,
} from 'react';
import API from '@/utils/api';
import { ApiError } from '@/utils/classError';
import { type PostType } from '@/types';
import { useAuth } from './AuthContext';

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

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
        const response = await API.getGridPosts(usernameToFetch);
        setPosts(response);
      } catch (err) {
        const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
        console.log(message);
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      allPostsFetch,
      posts,
    }),
    [allPostsFetch, posts]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
