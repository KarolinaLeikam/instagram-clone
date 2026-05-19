import styles from './TestCard.module.scss';

type TestCardProps = {
  title: string;
  count: number;
};

const TestCard: React.FC<TestCardProps> = ({ title, count }) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  );
};

export default TestCard;
