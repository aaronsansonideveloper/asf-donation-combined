import Link from 'next/link';
import styles from './page.module.css';

export default function DonationSuccessPage() {
  return (
    <main className={styles.page}>
      <section className={styles.statusCard}>
        <span className={styles.statusIcon} aria-hidden="true">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="36" cy="36" r="35" strokeWidth="2" className={styles.iconRing} />
            <path
              d="M24 37.5L32 45.5L48.5 28.5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.iconCheck}
            />
          </svg>
        </span>

        <p className={styles.eyebrow}>Donation confirmed</p>
        <h1 className={styles.title}>Thank you for your generosity</h1>
        <p className={styles.bodyText}>
          We successfully received your donation. Your support helps us continue the programs and
          services that matter most to our community. 
        </p>
      </section>
    </main>
  );
}
