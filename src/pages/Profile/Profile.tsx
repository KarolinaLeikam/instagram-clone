import { Header, Information, GridPosts } from './components';
import { Footer, StatusBar } from '@/components/common';
import styles from './Profile.module.scss';

const Profile: React.FC = () => (
  <div className={styles.page}>
    <StatusBar />
    <div className={styles.content}>
      <Header />
      <Information />
      <GridPosts />
    </div>
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Profile;
