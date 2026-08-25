import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AngleLeftIcon } from '@/assets/Icons/GeneralIcons';
import styles from './HeaderPublication.module.scss';

const HeaderPublication = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <Link to="/profile">
        <AngleLeftIcon />
      </Link>
      <div className={styles.layoutText}>
        <p>{user?.username}</p>
        <h2>Publications</h2>
      </div>
    </div>
  );
};

export default HeaderPublication;
