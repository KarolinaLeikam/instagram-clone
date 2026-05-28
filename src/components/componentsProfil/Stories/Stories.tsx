import PlusImg from '@/assets/BlackPlus.png';
import styles from './Stories.module.scss';
const Stories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerCenter}>
        {' '}
        <button className={styles.circle}>
          <img className={styles.img} src={PlusImg} alt="" />
        </button>
        <p>Hello</p>
      </div>
    </div>
  );
};
export default Stories;
