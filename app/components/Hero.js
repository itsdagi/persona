'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Obsidian Tower',
    category: 'Residential',
    location: 'Addis Ababa, ET',
    year: '2024',
    description: 'A 40-story vertical sanctuary that redefines luxury urban living through biophilic design.',
    tags: ['High-Rise', '3D Visualization', 'Interior'],
    color: '#ff6524',
  },
  {
    id: 2,
    title: 'Mesa Cultural Center',
    category: 'Cultural',
    location: 'Nairobi, KE',
    year: '2024',
    description: 'A flowing civic structure inspired by the African landscape, merging art and community.',
    tags: ['Public Space', 'Concept', 'Urban'],
    color: '#ff8544',
  },
  {
    id: 3,
    title: 'Axiom HQ',
    category: 'Commercial',
    location: 'Dubai, UAE',
    year: '2025',
    description: 'A kinetic corporate campus with adaptive facades that respond to sun and human movement.',
    tags: ['Commercial', 'Parametric', 'Facade'],
    color: '#a89c2a',
  },
];

const STATS = [
  { num: '120+', label: 'Projects Delivered' },
  { num: '18', label: 'Countries Reached' },
  { num: '12', label: 'Years of Practice' },
  { num: '40+', label: 'Design Awards' },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  // Ambient particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      life: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.0005;

      particlesRef.current.forEach((p) => {
        p.life += 0.008;
        p.x += p.vx + Math.sin(p.life) * 0.1;
        p.y += p.vy + Math.cos(p.life * 0.7) * 0.08;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = (Math.sin(p.life * 0.5) * 0.5 + 0.5) * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,101,36, ${alpha})`;
        ctx.fill();
      });

      // Draw connection lines
      particlesRef.current.forEach((p, i) => {
        particlesRef.current.slice(i + 1, i + 4).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255,101,36, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for parallax
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className={styles.hero} id="home">
      {/* Ambient Canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Background grid */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Glow orbs */}
      <div
        className={styles.glowOrb1}
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        aria-hidden="true"
      />
      <div
        className={styles.glowOrb2}
        style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
        aria-hidden="true"
      />

      <div className={`container ${styles.content}`}>
        {/* Left Column */}
        <div className={styles.left}>
          <div className={styles.eyebrow} style={{ animationDelay: '0.1s' }}>
            <span className={styles.eyebrowDot} />
            <span>Award-Winning Architecture Studio</span>
            <span className={styles.eyebrowLine} />
          </div>

          <h1 className={styles.headline}>
            <span className={styles.headlineTop}>Designing</span>
            <span className={styles.headlineAccent}>Spaces</span>
            <span className={styles.headlineBottom}>with Identity</span>
          </h1>

          <p className={styles.subtext}>
            Persona is a forward-thinking studio led by CEO Nahom — crafting
            architectural narratives where innovation, precision, and artistry converge.
          </p>

          <div className={styles.ctas}>
            <Link href="/projects" className="btn btn-primary btn-lg">
              Explore Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/#contact" className="btn btn-secondary btn-lg">
              Start a Project
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {STATS.map((s, i) => (
              <div key={s.label} className={styles.stat} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column – Project Cards */}
        <div className={styles.right}>
          <div className={styles.cardsWrapper}>
            {PROJECTS.map((project, i) => {
              const offset = i - activeCard;
              const isActive = i === activeCard;
              const isBehind = offset !== 0;

              return (
                <div
                  key={project.id}
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                  style={{
                    '--card-color': project.color,
                    transform: isActive
                      ? `translateY(0) scale(1) rotateX(0deg)`
                      : `translateY(${offset * 12}px) scale(${1 - Math.abs(offset) * 0.06}) translateZ(${-Math.abs(offset) * 40}px)`,
                    zIndex: PROJECTS.length - Math.abs(offset),
                    opacity: isActive ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.45),
                  }}
                  onClick={() => setActiveCard(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View project ${project.title}`}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardCategory}>
                      <span className={styles.cardDot} />
                      {project.category}
                    </div>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>

                  <div className={styles.cardViz}>
                    <div className={styles.cardVizInner}>
                      <ProjectVisual project={project} active={isActive} />
                    </div>
                    <div className={styles.cardScanLine} aria-hidden="true" />
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardLocation}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {project.location}
                    </p>
                    <p className={styles.cardDesc}>{project.description}</p>

                    <div className={styles.cardTags}>
                      {project.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>

                    <Link href="/projects" className={styles.cardCta}>
                      View Case Study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className={styles.dots} role="tablist" aria-label="Featured projects">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                className={`${styles.dot} ${i === activeCard ? styles.dotActive : ''}`}
                onClick={() => setActiveCard(i)}
                role="tab"
                aria-selected={i === activeCard}
                aria-label={`Project ${i + 1}: ${p.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </section>
  );
}

function ProjectVisual({ project, active }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, w, h);

      const col = project.color;
      const speed = active ? 1 : 0.3;

      if (project.id === 1) {
        // Tower silhouette
        const cx = w / 2;
        const floors = 22;
        for (let i = 0; i < floors; i++) {
          const fw = 60 - i * 1.8;
          const fh = 8;
          const fy = h - 40 - i * (fh + 2);
          const fx = cx - fw / 2;
          const alpha = 0.15 + (i / floors) * 0.6 + Math.sin(t * speed * 0.5 + i * 0.3) * 0.05;
          ctx.fillStyle = `rgba(255,101,36,${alpha})`;
          ctx.fillRect(fx, fy, fw, fh);

          // Window lights
          const numW = Math.floor(fw / 12);
          for (let j = 0; j < numW; j++) {
            if (Math.sin(t * speed + i * 3.7 + j * 2.1) > 0.5) {
              ctx.fillStyle = `rgba(255,255,200,0.7)`;
              ctx.fillRect(fx + j * 12 + 3, fy + 2, 6, 4);
            }
          }
        }

        // Reflection
        for (let i = 0; i < 5; i++) {
          const ry = h - 30 + i * 6;
          ctx.fillStyle = `rgba(255,101,36,${0.08 - i * 0.015})`;
          ctx.fillRect(cx - 30, ry, 60, 2);
        }
      } else if (project.id === 2) {
        // Flowing cultural structure
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const wave1 = Math.sin((x / w) * Math.PI * 2 + t * speed * 0.5) * 20;
          const wave2 = Math.sin((x / w) * Math.PI * 3 + t * speed * 0.3) * 10;
          const y = h * 0.55 - wave1 - wave2;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
        ctx.fillStyle = 'rgba(255,101,36,0.15)';
        ctx.fill();
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Arches
        for (let i = 0; i < 5; i++) {
          const ax = (w / 5) * i + w / 10;
          const ar = 20 + i * 3;
          ctx.beginPath();
          ctx.arc(ax, h * 0.55, ar, Math.PI, 0);
          ctx.strokeStyle = `rgba(255,101,36,${0.3 + Math.sin(t * speed + i) * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else {
        // Kinetic facade grid
        const cols = 8, rows = 10;
        const cw = w / cols, ch = h / rows;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const phase = Math.sin(t * speed * 0.4 + r * 0.5 + c * 0.7);
            const alpha = 0.08 + phase * 0.12 + 0.05;
            ctx.fillStyle = `rgba(255,101,36,${Math.max(0.02, alpha)})`;
            ctx.fillRect(c * cw + 1, r * ch + 1, cw - 2, ch - 2);
            if (phase > 0.6) {
              ctx.strokeStyle = col;
              ctx.lineWidth = 0.5;
              ctx.strokeRect(c * cw + 1, r * ch + 1, cw - 2, ch - 2);
            }
          }
        }
      }

      t += 0.02;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [project, active]);

  return <canvas ref={canvasRef} width={320} height={200} className={{ width: '100%', height: '100%' }} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
