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
import { ApiError } from '@/utils/classError';
import API from '@/utils/api';

interface UserType {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
}
interface ContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  loading: boolean;
  logout: () => void;
}

const initial: ContextType = {
  user: null,
  setUser: () => {},
  loading: false,
  logout: () => {},
};

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

const AuthContext = createContext<ContextType>(initial);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.authMe();
        setUser(response.user);
      } catch (err) {
        const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
        console.log(message);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    console.log('logout1');
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
