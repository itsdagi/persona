'use client';
import { useReveal } from '../hooks';
import { testimonials } from '../data';
import styles from './Upwork.module.css';

const stats = [
  { num: '50+', label: 'Projects Completed' },
  { num: '100%', label: 'Job Success' },
  { num: '5.0', label: 'Client Rating' },
  { num: '$100K+', label: 'Total Earned' },
];

export default function Upwork() {
  const [ref, vis] = useReveal();
  return (
    <section id="upwork" className={`section ${styles.section}`}>
      <div className={styles.bgGlow} />
      <div className="container" ref={ref}>
        <div className={styles.content}>
          <div className={`${styles.info} ${vis ? 'visible' : ''} reveal`}>
            <div className={styles.badge}>
              <span className={styles.dot} />
              <span>Available on Upwork</span>
            </div>
            <h2>Freelance & Consulting</h2>
            <p>Beyond the studio, Nahom operates as a top-rated freelancer on Upwork — delivering architectural services to clients worldwide with a perfect satisfaction record.</p>
            <div className={styles.stats}>
              {stats.map((s, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <a href="https://upwork.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ marginTop: '1.5rem' }}>
              Hire Nahom on Upwork →
            </a>
          </div>
          <div className={`${styles.testimonials} ${vis ? 'visible' : ''} reveal`} style={{ transitionDelay: '.15s' }}>
            <h3>Client Testimonials</h3>
            {testimonials.map(t => (
              <div key={t.id} className={styles.tCard}>
                <p className={styles.tText}>{t.text}</p>
                <div className={styles.tAuthor}>
                  <div className={styles.tAvatar} style={{ background: t.gradient }}>{t.initials}</div>
                  <div className={styles.tInfo}>
                    <h4>{t.name}</h4>
                    <p>{t.company}</p>
                    <span className={styles.tStars}>{'★'.repeat(t.rating)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
