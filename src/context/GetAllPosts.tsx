import {
  useCallback,
  useMemo,
  useContext,
  createContext,
  type ReactNode,
  useState,
} from 'react';
import API from '@/utils/api';
import { ApiError } from '@/utils/error/classError';
import { type PostType } from '@/types';
import { useAuth } from './AuthContext';
import { useGetAllPostsQuery } from '@/utils/rtkApi';

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

  const { data, error, isLoading } = useGetAllPostsQuery();

  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  const allPostsFetch = useCallback(
    async (username?: string) => {
      const usernameToFetch = username || user?.username;
      if (!usernameToFetch) return;
      try {
        const response = await API.getGridPosts(usernameToFetch);
        setPosts(response);
      } catch (err) {
        const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
        console.error(message);
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
