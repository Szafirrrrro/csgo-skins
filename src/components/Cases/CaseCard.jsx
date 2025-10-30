'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './CaseCard.module.css';

export default function CaseCard({ data }) {
  if (!data) return null;

  const { name, displayName, banner, price } = data;
  const priceLabel = `${parseFloat(price).toFixed(2)}zł`;

  return (
    <Link href={`/cases/${name}`} className={styles.card} aria-label={`Open ${displayName}`}>
      <div className={styles.title}>{displayName}</div>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={banner} alt={displayName} />
      </div>
      <div className={styles.priceSlot}>
        <div className={styles.pricePill}>{priceLabel}</div>
      </div>
    </Link>
  );
}

CaseCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
};
