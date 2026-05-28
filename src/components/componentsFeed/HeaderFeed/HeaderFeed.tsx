import React from 'react';
import HeartImg from '@/assets/StatusBarImg/Heart.png';
import PlusSmallImg from '@/assets/StatusBarImg/PlusSmall.png';
import PaperImg from '@/assets/StatusBarImg/Paper.png';
import styles from './HeaderFeed.module.scss';
export default function HeaderFeed() {
  return (
    <div className={styles.container}>
      <div className={styles.layoutIcons}>
        {' '}
        <img src={PlusSmallImg} alt="" />
        <img src={HeartImg} alt="" />
        <img src={PaperImg} alt="" />
      </div>
    </div>
  );
}
