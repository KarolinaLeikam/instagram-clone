import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ContextUserFriend {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isMe: boolean;
}

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

export const GetUserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userFriend, setUserFriend] = useState<ContextUserFriend | null>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const { user } = useAuth();

  const whatIsUser = username || user?.username;
  console.log(whatIsUser);

  const fetchUserFriend = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token || !whatIsUser) {
      setLoading(false);
      setUserFriend(null);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/users/${whatIsUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const result = await response.json();
      setUserFriend(result);
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFriend();
  }, [whatIsUser]);

  const logout = () => {
    localStorage.removeItem('token');
    setUserFriend(null);
    console.log('logout1');
  };

  const value = useMemo(
    () => ({
      userFriend,
      setUserFriend,
      loading,
      logout,
      fetchUserFriend,
    }),
    [userFriend, loading]
  );

  return <GetUserInfo.Provider value={value}>{children}</GetUserInfo.Provider>;
};

export const useGetFriend = () => {
  const context = useContext(GetUserInfo);
  console.log(context);
  return context || { userFriend: null, loading: false };
};
