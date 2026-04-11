'use client';
import { useApp } from '../context/AppContext';
import styles from './Toasts.module.css';

export default function Toasts() {
  const { toasts } = useApp();
  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <div key={t.id} className={styles.toast}>{t.msg}</div>
      ))}
    </div>
  );
}
