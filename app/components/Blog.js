'use client';
import { useReveal } from '../hooks';
import Link from 'next/link';
import { blogs } from '../data';
import styles from './Blog.module.css';

const bgClass = { 1: styles.bg1, 2: styles.bg2, 3: styles.bg3, 4: styles.bg4 };

export default function Blog() {
  const [ref, vis] = useReveal();
  return (
    <section id="blog" className={`section ${styles.section}`}>
      <div className="container" ref={ref}>
        <div className={`section-header ${vis ? 'visible' : ''} reveal`}>
          <span className="label">Insights</span>
          <h2>Architecture Journal</h2>
          <p>Thoughts, research, and project breakdowns from the studio. Exploring ideas that shape the built environment.</p>
        </div>
        <div className={`${styles.grid} stagger ${vis ? 'visible' : ''}`}>
          {blogs.map(b => (
            <Link key={b.id} href={`/blog/${b.id}`} style={{ textDecoration: 'none' }}>
              <article className={styles.card}>
                <div className={styles.thumb}>
                  <div className={`${styles.thumbBg} ${bgClass[b.bg]}`} />
                </div>
                <div className={styles.body}>
                  <span className="tag">{b.category}</span>
                  <h3>{b.title}</h3>
                  <p>{b.excerpt}</p>
                  <div className={styles.meta}>
                    <div className={styles.author}>
                      <div className={styles.authorAvatar}>NT</div>
                      <span>Nahom Tassew</span>
                    </div>
                    <span>{b.date} · {b.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
