import { useLocation } from 'react-router-dom';
import routes from '@/utils/router';
import { Footer, StatusBar } from '@/components/common';
import { Header, Information, GridPosts } from './components';

import styles from './Profile.module.scss';

const Profile = () => {
  const location = useLocation();
  const pathYourProfile = location.pathname === routes.profileOwn;

  return (
    <div className={styles.page}>
      <StatusBar />
      <div className={styles.content}>
        <Header />
        <Information />
        <GridPosts />
      </div>
      {pathYourProfile && (
        <div className={styles.footer}>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Profile;
