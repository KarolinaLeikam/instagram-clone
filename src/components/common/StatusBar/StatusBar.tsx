import {
  WifiIcon,
  BatteryIcon,
  CellularIcon,
} from '@/assets/Icons/StatusBarIcons';
import styles from './StatusBar.module.scss';

const StatusBar = () => (
  <div className={styles.container}>
    <div className={styles.layoutIcons}>
      <CellularIcon />
      <BatteryIcon />
      <WifiIcon />
    </div>
  </div>
);
export default StatusBar;
