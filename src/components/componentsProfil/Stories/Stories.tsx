import PlusImg from '@/assets/BlackPlus.png';
import styles from './Stories.module.scss';

const Stories = () => (
  <div className={styles.container}>
    <div className={styles.containerCenter}>
      {' '}
      <button type="button" className={styles.circle} aria-label="Add story">
        <img className={styles.img} src={PlusImg} alt="" />
      </button>
      <p>Hello</p>
    </div>
  </div>
);
export default Stories;
