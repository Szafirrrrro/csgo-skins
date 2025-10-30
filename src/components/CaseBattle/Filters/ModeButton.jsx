'use client';

import { useState } from 'react';
import styles from '../CaseBattle.module.css';

export default function ModeButton({ DisplayText, onPress, children, Color }) 
{   
    const [Active, SetActive] = useState(false)

  return (
    <button
      className={styles.ModeButton}
      // expose the channels as a CSS var so CSS can use it on :hover
      style={{
        '--btn-color': Color,               // "r, g, b"
        color: `rgb(${Color})`,
      }}
      onClick={() => SetActive(!Active)}
      data-active={Active ? 'true' : 'false'}
    >
      {children}
      {DisplayText && <span>{DisplayText}</span>}
    </button>
  );
}
