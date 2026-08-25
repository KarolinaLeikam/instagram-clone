import { useAuth } from '@/context/AuthContext';
import { useGetFriend } from '@/context/GetUserInfo';
import { useParams } from 'react-router-dom';

const NameProfile = () => {
  const { user } = useAuth();
  const { userFriend, loading } = useGetFriend();
  const { username } = useParams();

  console.log(user);
  console.log(userFriend);

  console.log(username);
  if (loading) {
    return <div>Загрузка профиля...</div>;
  }
  console.log(loading);
  const currentProfile = username ? userFriend : user;

  return (
    <div>
      <h3>{currentProfile?.name}</h3>
      <p>{currentProfile?.bio}</p>
    </div>
  );
};

export default NameProfile;
