import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetFriend } from '@/context/GetUserInfo';
import { useAuth } from '@/context/AuthContext';
import API from '@/utils/api';
import { ApiError } from '@/utils/classError';
import routes from '@/utils/router';
import { Avatar, Button } from '@/components/ui';
import { UserAddIcon } from '@/assets/Icons/GeneralIcons';

import {
  AllFollowers,
  NameProfile,
  ProfileNavBar,
  Stories,
} from './components';

import styles from './Information.module.scss';

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

const Information = () => {
  const { username } = useParams();
  const location = useLocation();
  const pathYourProfile = location.pathname === routes.profileOwn;
  const { userFriend, fetchUserFriend } = useGetFriend();
  const { user } = useAuth();
  const [follow, setFollow] = useState<boolean>(
    userFriend?.isFollowing ?? false
  );

  const whatIsUser = username || user?.username;

  useEffect(() => {
    if (userFriend) {
      // eslint-disable-next-line
      setFollow(userFriend.isFollowing);
    }
  }, [userFriend]);

  const handleToggleFollow = async () => {
    const method = follow ? 'DELETE' : 'POST';

    try {
      const response = await API.followUser(method, whatIsUser);
      setFollow(response.isFollowing);
      fetchUserFriend();
    } catch (err) {
      const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
      console.error(message);
    }
  };

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
              {follow ? 'Unfollow' : 'Follow'}
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
