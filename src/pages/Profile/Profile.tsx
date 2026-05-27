import TestCard from '../../components/TestCard/TestCard';
import Header from '../../components/Header/Header';
import Information from '../../components/Information/Information';
import styles from './Profile.module.scss';
import GridPosts from '../../components/GridPosts/GridPosts';
import Footer from '../../components/Footer/Footer';

const Profile: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wifi}></div>
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
