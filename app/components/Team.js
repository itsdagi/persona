'use client';
import { useReveal } from '../hooks';
import { team } from '../data';
import styles from './Team.module.css';

export default function Team() {
  const [ref, vis] = useReveal();
  return (
    <section id="team" className="section">
      <div className="container" ref={ref}>
        <div className={`section-header ${vis ? 'visible' : ''} reveal`}>
          <span className="label">Our Team</span>
          <h2>The People Behind the Vision</h2>
          <p>A multidisciplinary team of architects, designers, and strategists committed to design excellence.</p>
        </div>
        <div className={`${styles.grid} stagger ${vis ? 'visible' : ''}`}>
          {team.map(m => (
            <div key={m.id} className={styles.card}>
              <div className={styles.avatar} style={{ background: m.gradient }}>
                {m.initials}
              </div>
              <h3>{m.name}</h3>
              <span className={styles.role}>{m.role}</span>
              <p className={styles.bio}>{m.bio}</p>
              <div className={styles.socials}>
                <a href="#" className={styles.social} aria-label="LinkedIn">in</a>
                <a href="#" className={styles.social} aria-label="Twitter">𝕏</a>
                <a href="#" className={styles.social} aria-label="Dribbble">◉</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
