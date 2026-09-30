import { GetUserInfoProvider } from '@/context/GetUserInfo';
import Profile from '@/pages/Profile/Profile';

const ProfileProvider = () => (
  <GetUserInfoProvider>
    <Profile />
  </GetUserInfoProvider>
);

export default ProfileProvider;
