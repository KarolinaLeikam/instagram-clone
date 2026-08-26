import { useAuth } from '@/context/AuthContext';

const NameProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
};

export default NameProfile;
