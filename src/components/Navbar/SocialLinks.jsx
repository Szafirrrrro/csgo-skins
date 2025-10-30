'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';

const socials = [
  { label: 'Discord', href: '#', glyph: '💬' },
  { label: 'Facebook', href: '#', glyph: 'f' },
  { label: 'Instagram', href: '#', glyph: '◎' },
  { label: 'X', href: '#', glyph: '×' },
];

export default function SocialLinks() {
  return (
    <div className={styles.socialWrap}>
      {socials.map((s) => (
        <Link key={s.label} href={s.href} className={styles.pillIcon} aria-label={s.label}>
          <span className={styles.iconGlyph}>{s.glyph}</span>
        </Link>
      ))}
    </div>
  );
}
