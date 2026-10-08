import { Link } from 'react-router-dom';
import { useAuthMeQuery } from '@/redux/slices/authSlice';
import routes from '@/utils/router';
import { AngleLeftIcon } from '@/assets/Icons/GeneralIcons';
import styles from './HeaderPublication.module.scss';

const HeaderPublication = () => {
  const { data: user } = useAuthMeQuery();
  return (
    <div className={styles.container}>
      <Link to={routes.profileOwn}>
        <AngleLeftIcon />
      </Link>
      <div className={styles.layoutText}>
        <p>{user?.user.username}</p>
        <h2>Publications</h2>
      </div>
    </div>
  );
};

export default HeaderPublication;
