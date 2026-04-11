'use client';
import styles from './FloatingCta.module.css';

export default function FloatingCta() {
  return (
    <div className={styles.wrap}>
      <button className="btn btn-gold btn-sm" onClick={() => document.getElementById('consultancy')?.scrollIntoView({ behavior: 'smooth' })}>
        📐 Book Consultation
      </button>
    </div>
  );
}
