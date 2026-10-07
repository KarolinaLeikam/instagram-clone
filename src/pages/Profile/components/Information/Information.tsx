import { Link, useLocation } from 'react-router-dom';
import useProfileUsername from '@/hooks/useProfileUsername';
import routes from '@/utils/router';
import { Avatar, Button } from '@/components/ui';
import { UserAddIcon } from '@/assets/Icons/GeneralIcons';
import {
  useGetUserInfoQuery,
  useFollowUserMutation,
} from '@/redux/slices/userInfoSlice';
import {
  AllFollowers,
  NameProfile,
  ProfileNavBar,
  Stories,
} from './components';

import styles from './Information.module.scss';

const Information = () => {

  const location = useLocation();
  const pathYourProfile = location.pathname === routes.profileOwn;

  const whatIsUser = useProfileUsername();
  const { data: userData } = useGetUserInfoQuery(whatIsUser ?? '', {
    skip: !whatIsUser,
  });
  const userFollow = userData?.isFollowing;
  const [followUser] = useFollowUserMutation();

  const handleToggleFollow = async () => {
    const method = userFollow ? 'DELETE' : 'POST';
    console.log(method);
    try {
      await followUser({
        method,
        username: whatIsUser,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  console.log(userFollow);

  console.log(whatIsUser);
  return (
    <div className={styles.container}>
      <div className={styles.containerAvatar}>
        <Avatar />
        <AllFollowers />
      </div>
      <NameProfile />
      <div className={styles.buttons}>
        {pathYourProfile && (
          <div>
            <Link to={routes.edit} className={styles.buttonRedactor}>
              Edit profile
            </Link>
            <Button className={styles.buttonSubcribe}>
              <UserAddIcon />
            </Button>
          </div>
        )}
        {!pathYourProfile && (
          <div>
            <Button onClick={handleToggleFollow}>
              {userFollow ? 'Unfollow' : 'Follow'}
            </Button>

            <Button>Message</Button>
          </div>
        )}
      </div>
      <Stories />
      <ProfileNavBar />
    </div>
  );
};

export default Information;
