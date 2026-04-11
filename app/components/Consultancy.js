'use client';
import { useState } from 'react';
import { useReveal } from '../hooks';
import { useApp } from '../context/AppContext';
import styles from './Consultancy.module.css';

const features = [
  { icon: '🏗️', title: 'Architectural Design', desc: 'Full-service design from concept sketches to construction documents.' },
  { icon: '🎨', title: 'Interior Design', desc: 'Space planning, material selection, and furniture specification.' },
  { icon: '📐', title: 'Technical Drawings', desc: 'Detailed floor plans, sections, elevations, and 3D models.' },
  { icon: '🌿', title: 'Sustainable Consulting', desc: 'Green building strategies, energy modeling, and LEED guidance.' },
];

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function Consultancy() {
  const [ref, vis] = useReveal();
  const { addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Consultation request submitted!');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const calDays = [];
  for (let i = 0; i < 35; i++) {
    const d = i - 1;
    if (d < 0) calDays.push({ num: '', disabled: true });
    else if (d < 30) calDays.push({ num: d + 1, disabled: d < 3, today: d === 3 });
    else calDays.push({ num: '', disabled: true });
  }

  return (
    <section id="consultancy" className={`section ${styles.section}`}>
      <div className={styles.orb} />
      <div className="container" ref={ref}>
        <div className={`section-header ${vis ? 'visible' : ''} reveal`}>
          <span className="label">Consultancy</span>
          <h2>Book a Consultation</h2>
          <p>Ready to bring your vision to life? Let&apos;s start a conversation about your project.</p>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.info} ${vis ? 'visible' : ''} reveal`}>
            <h3>What We Offer</h3>
            <p>From initial concept exploration to full project delivery, our consultancy services are tailored to your needs and budget.</p>
            <div className={styles.features}>
              {features.map((f, i) => (
                <div key={i} className={styles.feature}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.calendar}>
              <div className={styles.calHeader}>
                <button className="btn-icon">‹</button>
                <span>April 2025</span>
                <button className="btn-icon">›</button>
              </div>
              <div className={styles.calGrid}>
                {days.map(d => <div key={d} className={styles.calLabel}>{d}</div>)}
                {calDays.map((d, i) => (
                  <div key={i} className={`${styles.calDay} ${d.disabled ? styles.calDisabled : ''} ${d.today ? styles.calToday : ''}`}>
                    {d.num}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`${styles.formWrap} ${vis ? 'visible' : ''} reveal`} style={{ transitionDelay: '.15s' }}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Request Submitted!</h3>
                <p>We&apos;ll review your project details and respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Request Details</h3>
                <div className="form-row">
                  <div className="form-group"><label>Name</label><input className="form-input" placeholder="Your name" required /></div>
                  <div className="form-group"><label>Email</label><input className="form-input" type="email" placeholder="your@email.com" required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Type</label>
                    <select className="form-input" required>
                      <option value="">Select type...</option>
                      <option>Residential</option><option>Commercial</option><option>Interior</option><option>Urban Design</option><option>Renovation</option><option>Consultation Only</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select className="form-input">
                      <option value="">Select range...</option>
                      <option>$5,000 - $15,000</option><option>$15,000 - $50,000</option><option>$50,000 - $100,000</option><option>$100,000+</option>
                    </select>
                  </div>
                </div>
                <div className="form-group"><label>Location</label><input className="form-input" placeholder="Project location" /></div>
                <div className="form-group"><label>Message</label><textarea className="form-input" placeholder="Tell us about your project..." required /></div>
                <div className="form-group">
                  <label>Attachments (optional)</label>
                  <div className={styles.upload}>
                    <div className={styles.uploadIcon}>📎</div>
                    <div className={styles.uploadText}>Drop files here or click to upload<br /><small>PDF, JPG, PNG up to 10MB</small></div>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
                <button type="submit" className="btn btn-p" style={{ width: '100%', justifyContent: 'center' }}>Book Consultation →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
