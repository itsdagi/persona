'use client';
import { useState } from 'react';
import { useReveal } from '../hooks';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Persona didn\'t just design our headquarters — they created a living symbol of what our company aspires to be. The spatial intelligence in that building is extraordinary.',
    name: 'Adia Mensah',
    role: 'CEO, Meridian Capital',
    project: 'Axiom HQ, Dubai',
    initial: 'A',
  },
  {
    id: 2,
    quote: 'Working with Nahom and the Persona team was a transformative experience. They listened deeply and responded with architecture that felt inevitable — like it had always been meant to be there.',
    name: 'Tobias Larsen',
    role: 'Director, Larsen Foundation',
    project: 'Locus Institute, London',
    initial: 'T',
  },
  {
    id: 3,
    quote: 'The Mesa Cultural Center has become the beating heart of our neighborhood. Persona understood our community\'s soul and built it in concrete and glass.',
    name: 'Fatima Osei',
    role: 'Cultural Director, Nairobi Arts Board',
    project: 'Mesa Cultural Center, Nairobi',
    initial: 'F',
  },
  {
    id: 4,
    quote: 'The level of detail in Persona\'s 3D visualizations is unmatched. Before a single foundation was poured, we could walk through the building and feel its atmosphere.',
    name: 'Ravi Krishnan',
    role: 'Principal, Strata Developments',
    project: 'Strata Hotel, Singapore',
    initial: 'R',
  },
];

export default function Testimonials() {
  const [ref] = useReveal();
  const [active, setActive] = useState(0);

  const activeT = TESTIMONIALS[active];

  return (
    <section className={`section ${styles.testimonials}`} id="testimonials" ref={ref}>
      <div className="container">
        <div className="section-header centered reveal">
          <div className="label">Client Voices</div>
          <h2>
            Built on<br />
            <span className="gradient-text">Trust & Vision</span>
          </h2>
        </div>

        <div className={`${styles.inner} reveal`}>
          {/* Main testimonial */}
          <div className={styles.mainCard}>
            <div className={styles.quoteIcon} aria-hidden="true">"</div>
            <blockquote className={styles.quote}>{activeT.quote}</blockquote>
            <div className={styles.author}>
              <div className={styles.authorAvatar}>{activeT.initial}</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{activeT.name}</span>
                <span className={styles.authorRole}>{activeT.role}</span>
                <span className={styles.authorProject}>{activeT.project}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                className={`${styles.testimonialBtn} ${i === active ? styles.testimonialActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Read testimonial from ${t.name}`}
                aria-pressed={i === active}
              >
                <div className={styles.btnAvatar}>{t.initial}</div>
                <div className={styles.btnInfo}>
                  <span className={styles.btnName}>{t.name}</span>
                  <span className={styles.btnProject}>{t.project}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Star rating */}
        <div className={`${styles.rating} reveal`} aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span className={styles.ratingText}>4.98 / 5.0 from 80+ reviews</span>
        </div>
      </div>
    </section>
  );
}
