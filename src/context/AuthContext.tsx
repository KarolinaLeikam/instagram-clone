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
import { type UserType } from '@/types';
import { ApiError } from '@/utils/error/classError';
import API from '@/utils/api';

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
        console.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
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
