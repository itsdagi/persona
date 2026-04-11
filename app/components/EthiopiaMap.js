'use client';
import styles from './EthiopiaMap.module.css';

export default function EthiopiaMap() {
  return (
    <div className={styles.mapContainer}>
      {/* Animated grid background */}
      <div className={styles.gridBg} />

      {/* Glow effects */}
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      {/* Scan line */}
      <div className={styles.scanLine} />

      {/* SVG Map of Ethiopia - More accurate geological outline */}
      <svg viewBox="0 0 1000 1000" className={styles.mapSvg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ethGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,212,255,0.25)" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.08)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.15)" />
          </linearGradient>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,212,255,0.6)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0.15)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bigGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ethiopia outline - Highly accurate border path */}
        <path
          className={styles.ethOutline}
          d="M333.6,0 L374.5,39.3 L414.0,18.9 L430.3,37.0 L476.5,38.1 L535.1,72.8 L552.5,102.7 L582.4,130.5 L610.1,181.3 L633.1,209.4 L609.4,247.7 L586.6,288.3 L591.9,312.2 L592.9,338.5 L630.6,340.0 L646.8,333.9 L661.7,349.3 L647.0,380.0 L671.9,427.7 L696.7,469.4 L722.4,500.3 L942.7,603.0 L999.3,602.5 L809.0,862.3 L721.2,866.2 L661.0,927.2 L617.8,928.8 L599.4,956.1 L553.3,956.1 L526.1,927.0 L464.6,963.2 L444.7,999.3 L399.7,992.5 L384.8,982.5 L369.0,984.8 L347.8,984.0 L262.5,910.4 L215.6,910.4 L192.6,881.9 L192.6,833.3 L157.6,818.8 L117.8,724.6 L87.1,704.5 L75.3,669.9 L41.1,627.7 L0.0,621.5 L22.9,572.2 L58.7,570.1 L68.7,543.6 L67.8,465.8 L87.7,375.3 L119.6,351.0 L126.4,315.6 L155.3,249.5 L195.9,206.6 L223.3,121.3 L234.1,47.0 L312.5,65.1 Z"
          fill="url(#ethGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="1.2"
          filter="url(#glow)"
        />

        {/* Internal detail lines like topographic contours - adjusted for new shape */}
        <path className={styles.topoLine} d="M350,150 Q450,120 580,180 Q680,240 720,400" />
        <path className={styles.topoLine} d="M220,400 Q380,380 550,450 Q680,520 880,600" />
        <path className={styles.topoLine} d="M150,750 Q350,720 580,820 Q750,880 780,950" />

        {/* Region dots - adjusted for new scale */}
        {[
          [350, 450], [420, 220], [580, 550], [650, 320], [280, 350],
          [520, 750], [750, 520], [480, 150], [850, 620], [220, 680]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" className={styles.regionDot} style={{ animationDelay: `${i * 0.3}s` }} />
        ))}

        {/* Addis Ababa pin - main location - Precisely placed */}
        <g className={styles.pinGroup}>
          {/* Pulse rings */}
          <circle cx="393" cy="404" r="30" className={styles.pulse1} />
          <circle cx="393" cy="404" r="50" className={styles.pulse2} />
          <circle cx="393" cy="404" r="75" className={styles.pulse3} />

          {/* Center dot */}
          <circle cx="393" cy="404" r="8" fill="var(--accent)" filter="url(#bigGlow)" className={styles.pinCenter} />
          <circle cx="393" cy="404" r="4" fill="#fff" />
        </g>

        {/* Label */}
        <g className={styles.labelGroup}>
          <line x1="400" y1="395" x2="600" y2="280" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />
          <rect x="600" y="260" width="180" height="40" rx="4" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.25)" strokeWidth="0.8" />
          <text x="690" y="284" textAnchor="middle" className={styles.labelText}>STUDIO HQ: ADDIS ABABA</text>
          <text x="690" y="293" textAnchor="middle" className={styles.labelSubtext}>HUB NODE 01 // 9.01° N, 38.75° E</text>
        </g>

        {/* Corner brackets - HUD style - adjusted for 1000x1000 */}
        <path d="M50,50 L50,20 L80,20" className={styles.hudCorner} />
        <path d="M920,20 L950,20 L950,50" className={styles.hudCorner} />
        <path d="M50,950 L50,980 L80,980" className={styles.hudCorner} />
        <path d="M920,980 L950,980 L950,950" className={styles.hudCorner} />

        {/* HUD text */}
        <text x="90" y="40" className={styles.hudText}>EST. ARCHITECTURAL OS // v2.4</text>
        <text x="910" y="40" textAnchor="end" className={styles.hudText}>BRANCH: ADDIS ABABA / ACTIVE</text>
        <text x="90" y="970" className={styles.hudText}>PROJECT CAPACITY: SUSTAINED</text>
        <text x="910" y="970" textAnchor="end" className={styles.hudText}>GLOBAL UPLINK: OPTIMAL</text>
      </svg>

      {/* Country name overlay */}
      <div className={styles.countryLabel}>
        <span className={styles.countryName}>ETHIOPIA</span>
        <span className={styles.countrySubtext}>Studio Headquarters</span>
      </div>
    </div>
  );
}
