import HeaderFeed from '@/pages/Feed/components/HeaderFeed/HeaderFeed';

import Footer from '@/components/common/Footer/Footer';
import StatusBar from '@/components/common/StatusBar/StatusBar';
import PostFriend from '@/components/common/PostFriend/PostFriend';
import StoriesHeader from '@/pages/Feed/components/StoriesHeader/StoriesHeader';
import styles from './Feed.module.scss';

const Feed: React.FC = () => (
  <div className={styles.page}>
    <StatusBar />
    <div className={styles.content}>
      <HeaderFeed />
      <StoriesHeader />
      <div className={styles.postsContainer}>
        <PostFriend />
        <PostFriend />
      </div>
    </div>
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Feed;
