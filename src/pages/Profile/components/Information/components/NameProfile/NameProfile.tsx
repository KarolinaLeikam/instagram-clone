import { useAuth } from '@/context/AuthContext';
import { useGetFriend } from '@/context/GetUserInfo';
import { useParams } from 'react-router-dom';

const NameProfile = () => {
  const { user } = useAuth();
  const { userFriend, loading } = useGetFriend();
  const { username } = useParams();

  if (loading) {
    return <div>Загрузка профиля...</div>;
  }

  const currentProfile = username ? userFriend : user;

  return (
    <div>
      <h3>{currentProfile?.name}</h3>
      <p>{currentProfile?.bio}</p>
    </div>
  );
};

export default NameProfile;
