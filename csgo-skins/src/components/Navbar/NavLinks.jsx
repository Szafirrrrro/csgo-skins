'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import styles from './Navbar.module.css';

export default function NavLinks({ links = [] }) {
  const pathname = usePathname(); // e.g. '/case-battle'

  return (
    <nav className={styles.centerNav}>
      {links.map(({ DisplayText, Link: hrefPart }) => {
        const href = hrefPart ? `/${hrefPart}` : '/';
        const isActive = pathname === href;

        return (
          <NextLink
            key={DisplayText}
            href={href}
            className={`${styles.centerLink} ${isActive ? styles.centerLinkActive : ''}`}
          >
            {DisplayText}
          </NextLink>
        );
      })}
    </nav>
  );
}
