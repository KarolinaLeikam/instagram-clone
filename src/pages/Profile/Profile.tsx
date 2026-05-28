import Header from '@/components/componentsProfil/Header/Header';
import Information from '@/components/componentsProfil/Information/Information';
import GridPosts from '@/components/componentsProfil/GridPosts/GridPosts';
import Footer from '@/components/generalcomponents/Footer/Footer';
import StatusBar from '@/components/generalcomponents/StatusBar/StatusBar';
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
