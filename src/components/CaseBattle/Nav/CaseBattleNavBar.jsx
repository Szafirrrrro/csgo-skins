'use client';

import NewBattleButton from './NewBattleButton';
import NavButtonsContainer from './NavButtonsContainer';

import styles from '../CaseBattle.module.css';

export default function CaseBattleNavbar() 
{
  return (
    <div className={styles.panel}>
        <NavButtonsContainer/>
        <NewBattleButton/>
    </div>
  );
}
