'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';
import UserActions from './UserActions';

export default function Navbar() 
{
  return (
    <header>
      <div className={styles.inner}>

        {/* Left: Brand + Social */}
        <div className={styles.left}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandLeft}>CASE</span>
            <span className={styles.brandDot}></span>
            <span className={styles.brandRight}>DROP</span>
          </Link>

          <SocialLinks />
        </div>

        {/* Center: Main navigation */}
        <NavLinks
          links={[
            { DisplayText: 'Skrzynki',    Link: '' },
            { DisplayText: 'Case Battle', Link: 'case-battle' },
            { DisplayText: 'Upgrader',   Link: 'upgrader' }
          ]}
          active="Skrzynki"
        />

        {/* Right: User actions */}
        <UserActions balanceLabel="0.76zł" keys={0} />
      </div>
    </header>
  );
}
