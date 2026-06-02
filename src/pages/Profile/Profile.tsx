import { Header, Information, GridPosts } from './components';
import { Footer, StatusBar } from '@/components/common';
import styles from './Profile.module.scss';

const Profile: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.wifi}>
      <StatusBar />
    </div>
    <div className={styles.content}>
      <Header />
      <Information /> <GridPosts />
    </div>

    {/* <TestCard title="Likes" count={10} />; */}
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Profile;
