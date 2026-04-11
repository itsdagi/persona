'use client';
import styles from './LogoLines.module.css';

export default function LogoLines() {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 200 240" className={styles.svg}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Diamond Shape - Architectural Wireframe */}
        <path
          className={styles.mainPath}
          d="M100,20 L180,100 L100,180 L20,100 Z"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
        />

        {/* Internal Structure Lines */}
        <path className={styles.line} d="M100,20 L100,180" />
        <path className={styles.line} d="M20,100 L180,100" />
        <path className={styles.line} d="M60,60 L140,140" />
        <path className={styles.line} d="M140,60 L60,140" />

        {/* Connecting Accents */}
        <circle cx="100" cy="20" r="2" fill="var(--accent)" className={styles.dot} />
        <circle cx="180" cy="100" r="2" fill="var(--accent)" className={styles.dot} />
        <circle cx="100" cy="180" r="2" fill="var(--accent)" className={styles.dot} />
        <circle cx="20" cy="100" r="2" fill="var(--accent)" className={styles.dot} />
        <circle cx="100" cy="100" r="3" fill="var(--gold)" className={styles.centerDot} />

        {/* Vertical Axis Extension */}
        <line x1="100" y1="180" x2="100" y2="220" stroke="var(--border-h)" strokeWidth="1" strokeDasharray="4,4" />
        <text x="100" y="235" textAnchor="middle" className={styles.text}>NAHOM STUDIO // ARCH-OS</text>
      </svg>

      {/* Decorative Grid Lines Overlay */}
      <div className={styles.overlay}>
        <div className={styles.scanLine} />
      </div>
    </div>
  );
}
