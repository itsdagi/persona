'use client';
import { useState } from 'react';
import { useReveal } from '../hooks';
import styles from './Process.module.css';

const STEPS = [
  {
    num: '01',
    phase: 'Discovery',
    title: 'Concept Genesis',
    desc: 'We begin with deep listening — understanding your vision, site, culture, and aspirations through immersive briefs and site analysis.',
    detail: 'Site survey · Brief workshops · Contextual research · Stakeholder interviews',
    duration: '2–4 weeks',
  },
  {
    num: '02',
    phase: 'Development',
    title: 'Design Evolution',
    desc: 'From sketches to schematic drawings, we develop the architectural concept through iterative exploration and rigorous refinement.',
    detail: 'Schematic design · Massing studies · Material exploration · Client reviews',
    duration: '4–8 weeks',
  },
  {
    num: '03',
    phase: 'Visualization',
    title: 'Bring it to Life',
    desc: 'High-resolution 3D renders, virtual walkthroughs, and interactive presentations make abstract ideas tangible and compelling.',
    detail: '3D modeling · Photorealistic renders · Walkthrough animation · Presentation decks',
    duration: '2–6 weeks',
  },
  {
    num: '04',
    phase: 'Execution',
    title: 'Built Precision',
    desc: 'Construction documentation, contractor coordination, and on-site supervision ensure every detail is realized with absolute fidelity.',
    detail: 'Technical drawings · Tender documentation · Site supervision · Quality control',
    duration: 'Project duration',
  },
];

export default function Process() {
  const [ref] = useReveal();
  const [active, setActive] = useState(0);

  return (
    <section className={`section ${styles.process}`} id="process" ref={ref}>
      <div className="container">
        <div className="grid-2" style={{ gap: '5rem', alignItems: 'start' }}>
          {/* Left — labels */}
          <div className="reveal-left">
            <div className="label">Our Process</div>
            <h2>
              From Idea<br />to <span className="gradient-text">Icon</span>
            </h2>
            <p style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
              A rigorous, human-centred process that transforms raw vision
              into architecture that endures.
            </p>

            {/* Step nav */}
            <div className={styles.stepNav}>
              {STEPS.map((step, i) => (
                <button
                  key={step.num}
                  className={`${styles.stepBtn} ${active === i ? styles.stepActive : ''}`}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                  aria-controls={`process-panel-${i}`}
                >
                  <span className={styles.stepNum}>{step.num}</span>
                  <span className={styles.stepPhase}>{step.phase}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <svg className={styles.stepChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Right — detail panel */}
          <div className="reveal-right">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                id={`process-panel-${i}`}
                className={`${styles.panel} ${active === i ? styles.panelActive : ''}`}
                role="region"
                aria-label={step.title}
              >
                <div className={styles.panelTop}>
                  <span className={styles.panelNum}>{step.num}</span>
                  <div className={styles.panelDuration}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {step.duration}
                  </div>
                </div>

                <span className={styles.panelPhase}>{step.phase}</span>
                <h3 className={styles.panelTitle}>{step.title}</h3>
                <p className={styles.panelDesc}>{step.desc}</p>

                <div className={styles.panelDetail}>
                  <span className={styles.panelDetailLabel}>Deliverables</span>
                  <div className={styles.panelDetailItems}>
                    {step.detail.split('·').map((d) => (
                      <span key={d.trim()} className={styles.panelDetailItem}>{d.trim()}</span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={styles.panelViz}>
                  <ProcessViz step={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessViz({ step }) {
  const shapes = [
    // Step 1 – site grid
    <svg key="0" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3,4].map(r=>[0,1,2,3,4,5,6].map(c=>(
        <rect key={`${r}${c}`} x={10+c*42} y={10+r*22} width="38" height="18"
          fill="rgba(255,101,36,0.05)" stroke="rgba(255,101,36,0.2)" strokeWidth="0.5" rx="1"/>
      )))}
      <rect x="10" y="32" width="80" height="40" fill="rgba(255,101,36,0.12)" stroke="rgba(255,101,36,0.5)" strokeWidth="1" rx="1"/>
      <text x="50" y="57" fill="rgba(255,101,36,0.7)" fontSize="8" textAnchor="middle" fontFamily="monospace">SITE</text>
    </svg>,
    // Step 2 – schematic
    <svg key="1" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="100" height="65" fill="rgba(255,101,36,0.06)" stroke="rgba(255,101,36,0.4)" strokeWidth="1.5"/>
      <rect x="140" y="55" width="60" height="50" fill="rgba(255,101,36,0.04)" stroke="rgba(255,101,36,0.3)" strokeWidth="1"/>
      <line x1="100" y1="10" x2="100" y2="40" stroke="rgba(255,101,36,0.3)" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M10 105h280" stroke="rgba(255,101,36,0.2)" strokeWidth="1"/>
    </svg>,
    // Step 3 – render frame
    <svg key="2" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="260" height="100" rx="4" fill="rgba(255,101,36,0.04)" stroke="rgba(255,101,36,0.25)" strokeWidth="1"/>
      <circle cx="150" cy="55" r="35" fill="rgba(255,101,36,0.06)" stroke="rgba(255,101,36,0.3)" strokeWidth="1"/>
      <circle cx="150" cy="55" r="20" fill="rgba(255,101,36,0.08)" stroke="rgba(255,101,36,0.5)" strokeWidth="1"/>
      <circle cx="150" cy="55" r="8" fill="rgba(255,101,36,0.4)"/>
    </svg>,
    // Step 4 – execution blueprint
    <svg key="3" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="20" x2="290" y2="20" stroke="rgba(255,101,36,0.15)" strokeWidth="0.5"/>
      <line x1="10" y1="100" x2="290" y2="100" stroke="rgba(255,101,36,0.15)" strokeWidth="0.5"/>
      {[30,80,130,175,215,250].map((x,i)=>(
        <line key={x} x1={x} y1="15" x2={x} y2="105" stroke="rgba(255,101,36,0.1)" strokeWidth="0.5"/>
      ))}
      <rect x="50" y="30" width="200" height="60" fill="rgba(255,101,36,0.06)" stroke="rgba(255,101,36,0.4)" strokeWidth="1.5"/>
      <line x1="50" y1="60" x2="250" y2="60" stroke="rgba(255,101,36,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
    </svg>,
  ];

  return (
    <div style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {shapes[step]}
    </div>
  );
}
