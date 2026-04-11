'use client';
import { useState } from 'react';
import { useReveal } from '../hooks';
import styles from './Contact.module.css';

const SERVICE_OPTIONS = [
  'Architectural Design',
  '3D Visualization',
  'Interior Design',
  'Urban Concepts',
  'Fabrication & Craft',
  'Consultancy',
];

const BUDGET_OPTIONS = [
  'Under $50K',
  '$50K – $200K',
  '$200K – $1M',
  '$1M – $5M',
  '$5M+',
];

export default function Contact() {
  const [ref] = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', timeline: '', message: '', siteStatus: '' });
  const [selectedService, setSelectedService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedSite, setSelectedSite] = useState('');
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  return (
    <section className={`section ${styles.contact}`} id="contact" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left */}
          <div className={`${styles.left} reveal-left`}>
            <div className="label">Get in Touch</div>
            <h2 className={styles.heading}>
              Start Your<br />
              <span className="gradient-text">Next Project</span>
            </h2>
            <p className={styles.subtext}>
              Tell us about your vision. We'll get back to you within one business day
              to explore how Persona can bring it to life.
            </p>

            <div className={styles.contactItems}>
              <ContactItem
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.62 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>}
                label="Phone"
                value="+251 91 234 5678"
                href="tel:+251912345678"
              />
              <ContactItem
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                label="Email"
                value="hello@personastudio.com"
                href="mailto:hello@personastudio.com"
              />
              <ContactItem
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                label="Studio"
                value="Addis Ababa, Ethiopia"
              />
            </div>

            {/* Map placeholder */}
            <div className={styles.mapPlaceholder}>
              <StudioMap />
            </div>
          </div>

          {/* Right – Form */}
          <div className={`${styles.right} reveal-right`}>
            {sent ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Message Received</h3>
                <p>Thank you for reaching out. Nahom's team will be in touch within one business day.</p>
                <button className="btn btn-secondary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formHeader}>
                  <h3>Project Inquiry</h3>
                  <div className={styles.stepIndicator}>Step {step} of 2</div>
                </div>

                {step === 1 && (
                  <div className={styles.stepContent}>
                    <div className="form-group">
                      <label>Service Type *</label>
                      <div className={styles.chipGroup}>
                        {SERVICE_OPTIONS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`${styles.chip} ${selectedService === s ? styles.chipActive : ''}`}
                            onClick={() => { setSelectedService(s); setForm({...form, service: s}); }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Estimated Budget</label>
                      <div className={styles.chipGroup}>
                        {BUDGET_OPTIONS.map((b) => (
                          <button
                            key={b}
                            type="button"
                            className={`${styles.chip} ${selectedBudget === b ? styles.chipActive : ''}`}
                            onClick={() => { setSelectedBudget(b); setForm({...form, budget: b}); }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Site / Land Status</label>
                      <div className={styles.chipGroup}>
                        {['Land Acquired', 'Looking for Land', 'Undecided'].map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`${styles.chip} ${selectedSite === s ? styles.chipActive : ''}`}
                            onClick={() => { setSelectedSite(s); setForm({...form, siteStatus: s}); }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className={`btn btn-secondary ${styles.nextBtn}`} 
                      onClick={() => setStep(2)}
                      disabled={!selectedService}
                    >
                      Next Step →
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className={styles.stepContent}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name">Full Name *</label>
                        <input id="contact-name" name="name" type="text" required className="form-input" placeholder="Your name" value={form.name} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact-email">Email *</label>
                        <input id="contact-email" name="email" type="email" required className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-phone">Phone Number (Optional)</label>
                        <input id="contact-phone" name="phone" type="tel" className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact-timeline">Target Delivery</label>
                        <select id="contact-timeline" name="timeline" className="form-input" value={form.timeline} onChange={handleChange}>
                          <option value="" disabled>Select timeline...</option>
                          <option value="ASAP">ASAP</option>
                          <option value="1-3 Months">1-3 Months</option>
                          <option value="3-6 Months">3-6 Months</option>
                          <option value="6-12 Months">6-12 Months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">Project Brief *</label>
                      <textarea id="contact-message" name="message" required className="form-input" placeholder="Describe your project, vision, and key goals..." value={form.message} onChange={handleChange} />
                    </div>

                    <div className={styles.stepActions}>
                      <button type="button" className={`btn btn-ghost ${styles.backBtn}`} onClick={() => setStep(1)}>
                        ← Back
                      </button>
                      <button type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} disabled={sending || !form.name || !form.email || !form.message}>
                        {sending ? (
                          <>
                            <span className={styles.spinner} aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className={styles.btnText}>Send Inquiry</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.btnIcon}>
                              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className={styles.contactItem}>
      <div className={styles.contactItemIcon}>{icon}</div>
      <div>
        <span className={styles.contactItemLabel}>{label}</span>
        <span className={styles.contactItemValue}>{value}</span>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function StudioMap() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.mapSvg} aria-label="Studio location map" role="img">
      {/* Grid */}
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <line key={`h${i}`} x1="0" y1={i*22} x2="400" y2={i*22} stroke="rgba(255,101,36,0.06)" strokeWidth="0.5"/>
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(
        <line key={`v${i}`} x1={i*34} y1="0" x2={i*34} y2="200" stroke="rgba(255,101,36,0.06)" strokeWidth="0.5"/>
      ))}

      {/* Road network */}
      <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,101,36,0.12)" strokeWidth="2"/>
      <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,101,36,0.12)" strokeWidth="2"/>
      <line x1="0" y1="60" x2="400" y2="140" stroke="rgba(255,101,36,0.06)" strokeWidth="1"/>

      {/* Building blocks */}
      {[[50,40,60,40],[150,30,50,30],[260,50,70,40],[310,20,60,30],[80,130,50,40],[180,130,60,35],[290,140,70,30],[80,40,40,25]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} fill="rgba(255,101,36,0.04)" stroke="rgba(255,101,36,0.1)" strokeWidth="0.5" rx="1"/>
      ))}

      {/* Studio marker */}
      <circle cx="200" cy="100" r="20" fill="rgba(255,101,36,0.15)" stroke="rgba(255,101,36,0.4)" strokeWidth="1"/>
      <circle cx="200" cy="100" r="6" fill="var(--accent)"/>
      <circle cx="200" cy="100" r="3" fill="#0a0a0c"/>
      {/* Pulse rings */}
      <circle cx="200" cy="100" r="30" stroke="rgba(255,101,36,0.2)" strokeWidth="1" fill="none">
        <animate attributeName="r" from="10" to="40" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
      </circle>

      <text x="215" y="95" fill="rgba(255,101,36,0.7)" fontSize="8" fontFamily="monospace">PERSONA STUDIO</text>
      <text x="215" y="106" fill="rgba(255,101,36,0.4)" fontSize="6.5" fontFamily="monospace">Addis Ababa, ET</text>
    </svg>
  );
}
