'use client';

import NavButton from './NavButton';
import { useState } from 'react';
import styles from '../CaseBattle.module.css';

export default function NavButtonsContainer() {
  const [selected, setSelected] = useState(0);

  const buttons = 
  [
    { Text: 'Aktywne bitwy',             Child: '😂' }, 
    { Text: 'Codzienne najlepsze bitwy', Child: '😂' }, 
    { Text: 'Bitwy',                     Child: '😂' } 
  ];

  return (
    <div className={styles.NavButtonsContainer}>
      {buttons.map((item, key) => (
        <NavButton
          key={key}
          DisplayText={item.Text}
          Active={selected === key}
          onPress={() => setSelected(key)}
        >
        {item.Child}
        </NavButton>
      ))}
    </div>
  );
}
