'use client';

import ModeButton from './ModeButton';
import { useState } from 'react';
import Dropdown from './Dropdown';

import styles from '../CaseBattle.module.css';

export default function CaseBattleFilters() 
{
  const [selected, setSelected] = useState(0);

  const Modes = 
  [
    { Text: 'Standardowy',             Child: '😂', Color: 'var(--color-primary)' }, 
    { Text: 'Underdog',           Child: '😂', Color: 'var(--color-gold)' }, 
    { Text: 'Shared',                     Child: '😂', Color: 'var(--color-green)' } 
  ];

  return (
    <div className={styles.FiltersPanel}>

      <div className={styles.section}>

        <div className={styles.ModesBackground}>
          {Modes.map((item, key) => (
            <ModeButton
              key={key}
              DisplayText={item.Text}
              Color={item.Color}
            >
            {item.Child}
            </ModeButton>
          ))}
        </div>

        <Dropdown
  Color="59, 130, 246"
  options={[
    { value: 'all', label: 'Wszystkie rodzaje' },
    { value: 'type1', label: 'Typ 1' },
    { value: 'type2', label: 'Typ 2' },
  ]}
  value="all"
  onChange={(v) => console.log(v)}
/>


      </div>

      <div className={styles.section}>

      </div>
      
    </div>
  );
}
