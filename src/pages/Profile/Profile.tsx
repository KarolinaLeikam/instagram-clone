import TestCard from '@/components/TestCard/TestCard';
import Header from '@/components/componentsProfil/Header/Header';
import Information from '@/components/componentsProfil/Information/Information';
import styles from './Profile.module.scss';
import GridPosts from '@/components/componentsProfil/GridPosts/GridPosts';
import Footer from '@/components/generalcomponents/Footer/Footer';
import StatusBar from '@/components/generalcomponents/StatusBar/StatusBar';

const Profile: React.FC = () => {
  return (
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
};

export default Profile;
