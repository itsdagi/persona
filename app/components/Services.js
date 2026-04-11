'use client';
import { useReveal } from '../hooks';
import styles from './Services.module.css';

const SERVICES = [
  {
    num: '01',
    title: 'Architectural Design',
    desc: 'From master planning to detailed construction documentation. We craft buildings that stand as timeless statements of ambition and craft.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="8" y="16" width="32" height="26" rx="1"/>
        <path d="M8 16L24 6l16 10"/>
        <line x1="18" y1="42" x2="18" y2="28"/><line x1="30" y1="42" x2="30" y2="28"/>
        <rect x="20" y="28" width="8" height="14"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: '3D Visualization',
    desc: 'Photo-real renderings and immersive walkthroughs that transform architectural intent into compelling visual narratives.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="6" y="10" width="36" height="28" rx="2"/>
        <circle cx="24" cy="24" r="8"/>
        <circle cx="24" cy="24" r="3"/>
        <line x1="6" y1="38" x2="42" y2="38"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Interior Design',
    desc: 'Curated interiors that speak the same language as the architecture — materiality, proportion, and the poetry of lived space.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="8" y="12" width="32" height="28" rx="1"/>
        <line x1="8" y1="22" x2="40" y2="22"/>
        <path d="M14 32 Q24 24 34 32"/>
        <line x1="24" y1="12" x2="24" y2="40"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Urban Concepts',
    desc: 'District-scale thinking that shapes the built environment, public realm, and the invisible systems that make cities thrive.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="6" y="24" width="10" height="18"/><rect x="20" y="16" width="10" height="26"/>
        <rect x="34" y="20" width="10" height="22"/>
        <line x1="4" y1="42" x2="44" y2="42"/>
        <line x1="4" y1="18" x2="44" y2="18" strokeDasharray="3 3"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Fabrication & Craft',
    desc: 'Custom elements, materials, and bespoke fabrication that bring singular design moments from concept to tangible reality.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M24 8L38 18v12L24 40 10 30V18L24 8z"/>
        <path d="M24 8v32M10 18l14 10M38 18L24 28"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Consultancy & Review',
    desc: 'Expert architectural reviews, feasibility studies, and design critique that sharpen your project before it breaks ground.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="24" cy="24" r="16"/>
        <line x1="24" y1="16" x2="24" y2="24"/>
        <line x1="24" y1="24" x2="32" y2="28"/>
        <circle cx="24" cy="24" r="2" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function Services() {
  const [ref] = useReveal();

  return (
    <section className={`section ${styles.services}`} id="services" ref={ref}>
      {/* Background accent */}
      <div className={styles.bg} aria-hidden="true" />

      <div className="container">
        <div className={`section-header ${styles.header} reveal`}>
          <div className="label">What We Do</div>
          <h2>
            Services Built for<br />
            <span className="gradient-text">Extraordinary Work</span>
          </h2>
          <p>A full spectrum of architectural and design services, delivered with uncompromising attention to craft.</p>
        </div>

        <div className={`${styles.grid} stagger`}>
          {SERVICES.map((s) => (
            <div key={s.num} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>{s.icon}</div>
                <span className={styles.num}>{s.num}</span>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.cardLine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
