import HeaderFeed from '@/components/componentsFeed/HeaderFeed/HeaderFeed';

import Footer from '@/components/generalcomponents/Footer/Footer';
import StatusBar from '@/components/generalcomponents/StatusBar/StatusBar';
import PostFriend from '@/components/componentsFeed/PostFriend/PostFriend';
import StoriesHeader from '@/components/componentsFeed/StoriesHeader/StoriesHeader';
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
