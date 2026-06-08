import { Link } from 'react-router-dom';
import { AngleLeftIcon } from '@/assets/Icons/GeneralIcons';
import styles from './HeaderPublication.module.scss';

const HeaderPublication = () => (
  <div className={styles.container}>
    <Link to="/profile">
      <AngleLeftIcon />
    </Link>
    <div className={styles.layoutText}>
      <p>MonIdentifiant</p>
      <h2>Publications</h2>
    </div>
  </div>
);

export default HeaderPublication;
