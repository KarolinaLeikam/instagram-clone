import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { type ContextUserFriend } from '@/types/index';
import { ApiError } from '@/utils/classError';
import API from '@/utils/api';
import { useAuth } from './AuthContext';

interface ContextType {
  userFriend: ContextUserFriend | null;
  setUserFriend: Dispatch<SetStateAction<ContextUserFriend | null>>;
  loading: boolean;
  logout: () => void;
  fetchUserFriend: () => Promise<void>;
}

const initial: ContextType = {
  userFriend: null,
  setUserFriend: () => {},
  loading: false,
  logout: () => {},
  fetchUserFriend: () => Promise.resolve(),
};
const GetUserInfo = createContext<ContextType>(initial);

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

export const GetUserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userFriend, setUserFriend] = useState<ContextUserFriend | null>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const { user } = useAuth();

  const whatIsUser = username || user?.username;

  const fetchUserFriend = useCallback(async () => {
    if (!whatIsUser) {
      setUserFriend(null);
      return;
    }
    setLoading(true);
    try {
      const response = await API.getUsernameInfo(whatIsUser);
      setUserFriend(response);
    } catch (err) {
      const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
      console.error(message);
    } finally {
      setLoading(false);
    }
  }, [whatIsUser]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchUserFriend();
  }, [fetchUserFriend]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUserFriend(null);
  }, []);

  const value = useMemo(
    () => ({
      userFriend,
      setUserFriend,
      loading,
      logout,
      fetchUserFriend,
    }),
    [userFriend, loading, logout, fetchUserFriend]
  );

  return <GetUserInfo.Provider value={value}>{children}</GetUserInfo.Provider>;
};

export const useGetFriend = () => {
  const context = useContext(GetUserInfo);
  return context || { userFriend: null, loading: false };
};
