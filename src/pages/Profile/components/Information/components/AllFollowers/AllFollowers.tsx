import useProfileUsername from '@/hooks/useProfileUsername';
import { useGetUserInfoQuery } from '@/redux/slices/userInfoSlice';
import Followers from './components/Followers/Followers';
import styles from './AllFollowers.module.scss';

const AllFollowers = () => {
  const whatIsUser = useProfileUsername();
  const { data: userData } = useGetUserInfoQuery(whatIsUser ?? '', {
    skip: !whatIsUser,
  });

  return (
    <div className={styles.container}>
      <Followers nameColumn="Posts" number={userData?.postsCount} />
      <Followers nameColumn="Followers" number={userData?.followersCount} />
      <Followers nameColumn="Following" number={userData?.followingCount} />
    </div>
  );
};
export default AllFollowers;
