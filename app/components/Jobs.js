'use client';
import { useState } from 'react';
import { useReveal } from '../hooks';
import { useApp } from '../context/AppContext';
import { jobs } from '../data';
import styles from './Jobs.module.css';

export default function Jobs() {
  const [ref, vis] = useReveal();
  const [applyJob, setApplyJob] = useState(null);
  const { addToast } = useApp();

  const handleApply = (e) => {
    e.preventDefault();
    addToast(`Application for ${applyJob.title} submitted!`);
    setApplyJob(null);
  };

  return (
    <section id="jobs" className={`section ${styles.section}`}>
      <div className="container" ref={ref}>
        <div className={`section-header ${vis ? 'visible' : ''} reveal`}>
          <span className="label">Careers</span>
          <h2>Join Our Studio</h2>
          <p>We&apos;re building a team of passionate designers, technologists, and thinkers. Come shape the future of architecture with us.</p>
        </div>
        <div className={`${styles.grid} stagger ${vis ? 'visible' : ''}`}>
          {jobs.map(j => (
            <div key={j.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{j.title}</h3>
                  <p className={styles.dept}>{j.dept}</p>
                </div>
                <div className={styles.tags}>
                  <span className="tag">{j.type}</span>
                  <span className="tag tag-gold">{j.location}</span>
                </div>
              </div>
              <p className={styles.desc}>{j.desc}</p>
              <div className={styles.reqs}>
                <h4>Requirements</h4>
                <ul>{j.reqs.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
              <button className="btn btn-s btn-sm" onClick={() => setApplyJob(j)}>Apply Now →</button>
            </div>
          ))}
        </div>
      </div>

      {applyJob && (
        <div className={styles.overlay} onClick={() => setApplyJob(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setApplyJob(null)}>✕</button>
            <h3>Apply for {applyJob.title}</h3>
            <form onSubmit={handleApply}>
              <div className="form-row">
                <div className="form-group"><label>Full Name</label><input className="form-input" required placeholder="Your name" /></div>
                <div className="form-group"><label>Email</label><input className="form-input" type="email" required placeholder="your@email.com" /></div>
              </div>
              <div className="form-group"><label>Portfolio URL</label><input className="form-input" placeholder="https://..." /></div>
              <div className="form-group"><label>Cover Letter</label><textarea className="form-input" required placeholder="Tell us why you'd be a great fit..." /></div>
              <div className="form-group">
                <label>Resume (PDF)</label>
                <div className={styles.upload}><span>📎 Upload Resume</span><input type="file" accept=".pdf" /></div>
              </div>
              <button type="submit" className="btn btn-p" style={{ width: '100%', justifyContent: 'center' }}>Submit Application →</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
