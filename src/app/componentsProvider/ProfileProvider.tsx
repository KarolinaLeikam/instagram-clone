import { GetAllPosts } from '@/context/GetAllPosts';
import { GetUserInfoProvider } from '@/context/GetUserInfo';
import Profile from '@/pages/Profile/Profile';

const ProfileProvider = () => (
  <GetUserInfoProvider>
    <GetAllPosts>
      <Profile />
    </GetAllPosts>
  </GetUserInfoProvider>
);

export default ProfileProvider;
