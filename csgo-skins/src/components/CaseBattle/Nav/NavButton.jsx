'use client';

import styles from '../CaseBattle.module.css';

export default function NavButton({ DisplayText, Active, onPress, children }) {
  return (
    <button
      className={`${styles.NavButton} ${Active ? styles.NavButtonActive : ''}`}
      onClick={onPress}
    >
      {children}
      {DisplayText && <span>{DisplayText}</span>}
    </button>
  );
}
