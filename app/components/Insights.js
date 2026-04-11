'use client';
import Link from 'next/link';
import { useReveal } from '../hooks';
import styles from './Insights.module.css';

const POSTS = [
  {
    id: 1,
    category: 'Design Thinking',
    title: 'The Architecture of Silence: Why the Best Buildings Know When to Disappear',
    excerpt: 'Great architecture doesn\'t shout. It creates conditions for human experience to emerge — and sometimes, the most powerful gesture is restraint.',
    date: 'Mar 28, 2025',
    readTime: '6 min read',
  },
  {
    id: 2,
    category: 'Technology',
    title: 'AI in the Design Studio: How Machine Intelligence is Reshaping Architectural Intuition',
    excerpt: 'We explore how generative AI tools are being integrated into architectural practice — not to replace creativity, but to accelerate the range of possibility.',
    date: 'Feb 14, 2025',
    readTime: '8 min read',
  },
  {
    id: 3,
    category: 'Urban Design',
    title: 'The 15-Minute City: Building Communities Where Everything is Walkable',
    excerpt: 'As cities restructure around human scale, architects are re-learning ancient lessons about proximity, density, and the quality of public space.',
    date: 'Jan 6, 2025',
    readTime: '5 min read',
  },
];

export default function Insights() {
  const [ref] = useReveal();

  return (
    <section className={`section ${styles.insights}`} id="insights" ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className="label">Insights</div>
            <h2 className="reveal-left">
              Ideas That<br />
              <span className="gradient-text">Shape Design</span>
            </h2>
          </div>
          <Link href="/blog" className={`btn btn-ghost btn-sm reveal-right`}>
            All Articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className={`${styles.grid} stagger`}>
          {POSTS.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className="tag">{post.category}</span>
                <div className={styles.cardMeta}>
                  <span>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardArrow} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
