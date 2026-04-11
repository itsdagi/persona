'use client';
import Link from 'next/link';
import { useReveal } from '../hooks';
import styles from './About.module.css';

const VALUES = [
  { icon: '◈', title: 'Precision', desc: 'Every line, form, and proportion is deliberate—serving both beauty and function.' },
  { icon: '◇', title: 'Innovation', desc: 'We push beyond convention, embracing emerging technology and material science.' },
  { icon: '○', title: 'Context', desc: 'Architecture must speak to its site, its culture, and its community.' },
  { icon: '△', title: 'Longevity', desc: 'We design for the decades ahead, not just the moment of completion.' },
];

export default function About() {
  const [ref] = useReveal();

  return (
    <section className={`section ${styles.about}`} id="about" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left */}
          <div className={`${styles.left} reveal-left`}>
            <div className="label">About Persona</div>
            <h2 className={styles.heading}>
              Architecture as<br />
              <span className="gradient-text">Living Art</span>
            </h2>
            <p className={styles.intro}>
              Founded by Nahom — a visionary architect and creative director — Persona Studio
              is redefining what it means to design spaces in the 21st century.
            </p>
            <p>
              We work at the intersection of architecture, technology, and storytelling. From
              intimate residential sanctuaries to grand civic structures, every project begins with
              a singular question: <em>What story does this space need to tell?</em>
            </p>

            <div className={styles.ceoCard}>
              <div className={styles.ceoAvatar}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="50" cy="38" r="18" stroke="rgba(255,101,36,0.5)" strokeWidth="1.5"/>
                  <path d="M20 90 C20 70 80 70 80 90" stroke="rgba(255,101,36,0.5)" strokeWidth="1.5"/>
                  <circle cx="50" cy="38" r="12" fill="rgba(255,101,36,0.1)" stroke="rgba(255,101,36,0.3)" strokeWidth="1"/>
                </svg>
              </div>
              <div className={styles.ceoInfo}>
                <span className={styles.ceoName}>Nahom</span>
                <span className={styles.ceoRole}>Founder & CEO</span>
                <p className={styles.ceoQuote}>
                  "Space is the canvas. Light is the medium. Human experience is the masterpiece."
                </p>
              </div>
            </div>

            <Link href="/#contact" className="btn btn-secondary" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
              Work with Nahom
            </Link>
          </div>

          {/* Right */}
          <div className={`${styles.right} reveal-right`}>
            {/* Visual element */}
            <div className={styles.visual}>
              <AboutVisual />
              <div className={styles.visualBadge}>
                <span className={styles.badgeYear}>2013</span>
                <span className={styles.badgeLabel}>Est.</span>
              </div>
            </div>

            {/* Values */}
            <div className={`${styles.values} stagger`}>
              {VALUES.map((v) => (
                <div key={v.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <div>
                    <h4 className={styles.valueTitle}>{v.title}</h4>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutVisual() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg} aria-hidden="true">
      {/* Grid */}
      {[0,1,2,3,4].map(i => (
        <line key={`h${i}`} x1="40" y1={60+i*42} x2="360" y2={60+i*42} stroke="rgba(255,101,36,0.06)" strokeWidth="1"/>
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`v${i}`} x1={40+i*46} y1="40" x2={40+i*46} y2="280" stroke="rgba(255,101,36,0.06)" strokeWidth="1"/>
      ))}

      {/* Building outline */}
      <rect x="120" y="80" width="80" height="180" fill="rgba(255,101,36,0.04)" stroke="rgba(255,101,36,0.4)" strokeWidth="1.5"/>
      <rect x="160" y="50" width="40" height="30" fill="rgba(255,101,36,0.06)" stroke="rgba(255,101,36,0.3)" strokeWidth="1"/>
      <rect x="200" y="120" width="60" height="140" fill="rgba(255,101,36,0.03)" stroke="rgba(255,101,36,0.25)" strokeWidth="1.5"/>

      {/* Windows */}
      {[0,1,2,3,4].map(r => [0,1,2].map(c => (
        <rect key={`w${r}${c}`} x={128+c*24} y={95+r*30} width="14" height="18" fill={`rgba(255,101,36,${0.03 + Math.random() * 0.15})`} rx="1"/>
      )))}

      {/* Dimension lines */}
      <line x1="100" y1="80" x2="100" y2="260" stroke="rgba(255,101,36,0.3)" strokeWidth="0.5" strokeDasharray="3 3"/>
      <line x1="96" y1="80" x2="104" y2="80" stroke="rgba(255,101,36,0.5)" strokeWidth="1"/>
      <line x1="96" y1="260" x2="104" y2="260" stroke="rgba(255,101,36,0.5)" strokeWidth="1"/>
      <text x="90" y="175" fill="rgba(255,101,36,0.4)" fontSize="8" textAnchor="middle" transform="rotate(-90,90,175)" fontFamily="monospace">180m</text>

      {/* Corner bracket */}
      <path d="M40 40 L60 40 L60 60" stroke="rgba(255,101,36,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M360 40 L340 40 L340 60" stroke="rgba(255,101,36,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M40 280 L60 280 L60 260" stroke="rgba(255,101,36,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M360 280 L340 280 L340 260" stroke="rgba(255,101,36,0.6)" strokeWidth="1.5" fill="none"/>

      {/* Label */}
      <text x="200" y="290" fill="rgba(255,101,36,0.3)" fontSize="7" textAnchor="middle" fontFamily="monospace">PERSONA — OBSIDIAN TOWER — SECTION A-A</text>

      {/* Glow center */}
      <circle cx="200" cy="170" r="60" fill="url(#glow)" opacity="0.3"/>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,101,36,0.15)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
    </svg>
  );
}
