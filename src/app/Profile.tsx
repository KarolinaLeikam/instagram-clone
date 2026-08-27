import { GetAllPosts } from '@/context/GetAllPosts';
import { GetUserInfoProvider } from '@/context/GetUserInfo';

const Profile = () => (
  <GetUserInfoProvider>
    <GetAllPosts>
      <Profile />
    </GetAllPosts>
  </GetUserInfoProvider>
);

export default Profile;
