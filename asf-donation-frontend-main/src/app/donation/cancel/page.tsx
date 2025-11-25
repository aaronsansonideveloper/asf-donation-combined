import Link from 'next/link';
import styles from './page.module.css';

export default function DonationCancelPage() {
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
              d="M27 27L45 45M45 27L27 45"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.iconCross}
            />
          </svg>
        </span>

        <p className={styles.eyebrow}>Donation cancelled</p>
        <h1 className={styles.title}>We saved your spot</h1>
        <p className={styles.bodyText}>
          Looks like the donation was cancelled / failed before completion. Nothing was charged, and
          you can restart the process whenever you are ready. If you ran into issues, let us know
          and we will help.
        </p>
      </section>
    </main>
  );
}
