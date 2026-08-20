import HeaderFeed from '@/pages/Feed/components/HeaderFeed/HeaderFeed';
import Footer from '@/components/common/Footer/Footer';
import StatusBar from '@/components/common/StatusBar/StatusBar';
import PostFriend from '@/components/common/PostFriend/PostFriend';
import StoriesHeader from '@/pages/Feed/components/StoriesHeader/StoriesHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import styles from './Feed.module.scss';

const Feed = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className={styles.page}>
      <StatusBar />
      <div className={styles.content}>
        <button type="button" onClick={handleLogout}>
          Exit
        </button>
        <HeaderFeed />
        <StoriesHeader />
        <div className={styles.postsContainer}></div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Feed;
