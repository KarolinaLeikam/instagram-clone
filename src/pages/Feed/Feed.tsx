import HeaderFeed from '@/pages/Feed/components/HeaderFeed/HeaderFeed';

import Footer from '@/components/common/Footer/Footer';
import StatusBar from '@/components/common/StatusBar/StatusBar';
import PostFriend from '@/pages/Feed/components/PostFriend/PostFriend';
import StoriesHeader from '@/pages/Feed/components/StoriesHeader/StoriesHeader';
import styles from './Feed.module.scss';

const Feed: React.FC = () => (
  <div className={styles.container}>
    <StatusBar />
    <HeaderFeed />
    <StoriesHeader />
    <PostFriend />
    <Footer />
  </div>
);

export default Feed;
