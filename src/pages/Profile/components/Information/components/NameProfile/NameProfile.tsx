import useProfileUsername from '@/hooks/useProfileUsername';
import { useGetUserInfoQuery } from '@/redux/slices/userInfoSlice';

const NameProfile = () => {
  const currentProfile = useProfileUsername();

  const { data: user, isLoading } = useGetUserInfoQuery(currentProfile ?? '', {
    skip: !currentProfile,
  });

  if (isLoading) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div>
      <h3>{user?.name}</h3>
      <p>{user?.bio}</p>
    </div>
  );
};

export default NameProfile;
