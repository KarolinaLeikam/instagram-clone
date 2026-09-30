import { useGetFriend } from '@/context/GetUserInfo';
import Followers from './components/Followers/Followers';
import styles from './AllFollowers.module.scss';

const AllFollowers = () => {
  const { userFriend } = useGetFriend();
  if (!userFriend) return null;

  return (
    <div className={styles.container}>
      <Followers nameColumn="Posts" number={userFriend.postsCount} />
      <Followers nameColumn="Followers" number={userFriend.followersCount} />
      <Followers nameColumn="Following" number={userFriend.followingCount} />
    </div>
  );
};
export default AllFollowers;
