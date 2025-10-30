'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';

export default function UserActions({ balanceLabel, keys = 0 }) {
  return (
    <div className={styles.actionsWrap}>
      {/* Balance pill */}
      <div className={`${styles.pill} ${styles.pillBalance}`}>
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="wallet" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.walletIcon}><path fill="currentColor" d="M88 32C39.4 32 0 71.4 0 120V392c0 48.6 39.4 88 88 88H424c48.6 0 88-39.4 88-88V216c0-48.6-39.4-88-88-88H120c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c22.1 0 40 17.9 40 40V392c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V120c0-22.1 17.9-40 40-40H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H88zM384 336a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg>
        {/* <span className={styles.walletIcon} aria-hidden>🪙</span> */}
        <span className={styles.balanceText}>{balanceLabel}</span>
        <span className={styles.hexagon}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={styles.svgPlus}><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path></svg>
        </span>
        {/* <button className={styles.addBtn} aria-label="Add funds">+</button> */}
      </div>

      {/* Keys pill */}
      <div className={styles.pill}>
        <span className={styles.lockIcon} aria-hidden>🔒</span>
        <span className={styles.countText}>{keys}</span>
      </div>

      {/* Token/logo pill */}
      <Link href="#" className={styles.pillRound} aria-label="Token">
        <span className={styles.swirl}>🌀</span>
      </Link>

      {/* Settings pill */}
      <Link href="#" className={styles.pill} aria-label="Settings">
        <span className={styles.gearIcon}>⚙️</span>
      </Link>
    </div>
  );
}
