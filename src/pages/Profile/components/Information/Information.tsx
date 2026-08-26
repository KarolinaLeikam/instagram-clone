import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetFriend } from '@/context/GetUserInfo';
import { useAuth } from '@/context/AuthContext';
import { Avatar, Button } from '@/components/ui';
import { UserAddIcon } from '@/assets/Icons/GeneralIcons';

import {
  AllFollowers,
  NameProfile,
  ProfileNavBar,
  Stories,
} from './components';

import styles from './Information.module.scss';

const Information = () => {
  const { username } = useParams();
  const location = useLocation();
  const pathYourProfile = location.pathname === '/profile';
  const { userFriend, fetchUserFriend } = useGetFriend();
  const { user } = useAuth();
  const [follow, setFollow] = useState<boolean>(
    userFriend?.isFollowing ?? false
  );

  const whatIsUser = username || user?.username;
  console.log(whatIsUser);
  useEffect(() => {
    if (userFriend) {
      setFollow(userFriend.isFollowing);
    }
  }, [userFriend]);
  const handleToggleFollow = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const method = follow ? 'DELETE' : 'POST';

    try {
      const response = await fetch(
        `http://localhost:4000/users/${whatIsUser}/follow`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setFollow(result);
        fetchUserFriend();
      }
    } catch (err) {
      console.log(err);
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
            <Link to="/edit" className={styles.buttonRedactor}>
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
