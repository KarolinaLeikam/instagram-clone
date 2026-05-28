import styles from './TestCard.module.scss';

interface TestCardProps {
  title: string;
  count: number;
}

const TestCard: React.FC<TestCardProps> = ({ title, count }) => (
  <div className={styles.card}>
    <h2>{title}</h2>
    <p>{count}</p>
  </div>
);

export default TestCard;
