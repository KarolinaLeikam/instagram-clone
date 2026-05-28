import wifiImg from '@/assets/StatusBarImg/Wifi.png';
import BatteryImg from '@/assets/StatusBarImg/Battery.png';
import CellularImg from '@/assets/StatusBarImg/Cellular Connection.png';
import styles from './StatusBar.module.scss';

const StatusBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layoutIcons}>
        <img src={CellularImg} alt="" />
        <img src={wifiImg} alt="" />
        <img src={BatteryImg} alt="" />
      </div>
    </div>
  );
};
export default StatusBar;
