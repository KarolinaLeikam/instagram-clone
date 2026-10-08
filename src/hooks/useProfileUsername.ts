import { useParams } from 'react-router-dom';

import { useAuthMeQuery } from '@/redux/slices/authSlice';

const useProfileUsername = () => {
  const { username } = useParams();
  const { data: user } = useAuthMeQuery();

  return username || user?.user.username;
};

export default useProfileUsername;
