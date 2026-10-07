import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const useProfileUsername = () => {
  const { username } = useParams();
  const { user } = useAuth();

  return username || user?.username;
};

export default useProfileUsername;
