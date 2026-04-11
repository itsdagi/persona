'use client';
import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.loader} role="status" aria-label="Loading Persona Studio">
      <div className={styles.inner}>
        <div className={styles.logoMark}>
          <img src="/logo.png" alt="Persona Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
        <span className={styles.label}>PERSONA STUDIO</span>
      </div>
    </div>
  );
}
