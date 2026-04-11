'use client';
import { useParams } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { blogs } from '../../data';
import styles from './page.module.css';

export default function BlogPost() {
  const { id } = useParams();
  const blogId = parseInt(id, 10);
  const blog = blogs.find(b => b.id === blogId) || blogs[0];

  return (
    <>
      <Nav isHome={false} />
      <article className={styles.article}>
        {/* cool hero */}
        <div className={styles.hero}>
          <div className={`${styles.heroBg} ${styles['bg' + blog.bg]}`} />
          <div className={`container ${styles.heroInner}`}>
            <span className={styles.tag}>{blog.category}</span>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.meta}>
              <div className={styles.author}>
                <div className={styles.avatar}>NT</div>
                <span>Nahom Tassew</span>
              </div>
              <span>{blog.date} · {blog.readTime}</span>
            </div>
          </div>
        </div>
        <div className={`container ${styles.content}`}>
          <p className={styles.lead}>{blog.excerpt}</p>
          <div className={styles.bodyText}>
            <h2>The Vision</h2>
            <p>Architecture is an inherently optimistic act. We build because we believe in the future. In this project, we aimed to address the fundamental human need for shelter, while elevating the experience to something poetic.</p>
            <p>Our process began with deep research into the historical and cultural context of the site. Every line drawn was a response to the existing topography, the prevailing winds, and the path of the sun. The resulting structure is not merely an object in the landscape, but a natural extension of it.</p>
            <blockquote>
              "Good architecture should let nature in, not shut it out."
            </blockquote>
            <h2>Execution and Materiality</h2>
            <p>We selected materials that would age gracefully, developing an authentic patina over time. Raw concrete, sustainably sourced timber, and expanses of high-performance glass blend to create a dialogue between weight and weightlessness.</p>
            <p>The journey from concept to completion is rarely linear, but through rigorous prototyping and close collaboration with exceptional artisans, the final form emerged exactly as envisioned.</p>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
