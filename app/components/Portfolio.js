'use client';
import Link from 'next/link';
import { useReveal } from '../hooks';
import styles from './Portfolio.module.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Obsidian Tower',
    category: 'Residential',
    location: 'Addis Ababa',
    year: '2024',
    description: 'A 40-story vertical sanctuary redefining luxury urban living through biophilic design and adaptive facades.',
    colorA: '#ff6524',
    colorB: '#a89c2a',
  },
  {
    id: 2,
    title: 'Mesa Cultural Center',
    category: 'Cultural',
    location: 'Nairobi',
    year: '2024',
    description: 'A flowing civic structure merging cultural heritage with contemporary architectural language.',
    colorA: '#ff8544',
    colorB: '#c4b83a',
  },
  {
    id: 3,
    title: 'Axiom HQ',
    category: 'Commercial',
    location: 'Dubai',
    year: '2025',
    description: 'A kinetic corporate campus with responsive facades that adapt to sunlight and human movement patterns.',
    colorA: '#ff6524',
    colorB: '#98900a',
  },
  {
    id: 4,
    title: 'Horizon Residence',
    category: 'Residential',
    location: 'Cape Town',
    year: '2023',
    description: 'A cliff-edge villa that dissolves the boundary between interior luxury and dramatic landscape.',
    colorA: '#b8ad3a',
    colorB: '#a89c2a',
  },
  {
    id: 5,
    title: 'Locus Institute',
    category: 'Education',
    location: 'London',
    year: '2025',
    description: 'A research campus designed around collaborative discovery, with interstitial social spaces at its core.',
    colorA: '#ff6524',
    colorB: '#ff8544',
  },
  {
    id: 6,
    title: 'Strata Hotel',
    category: 'Hospitality',
    location: 'Singapore',
    year: '2023',
    description: 'A luxury hotel that layers geological metaphors with precision engineering and bespoke interiors.',
    colorA: '#c8bc44',
    colorB: '#a0942e',
  },
];

export default function Portfolio() {
  const [ref] = useReveal();

  return (
    <section className={`section ${styles.portfolio}`} id="projects" ref={ref}>
      <div className="container">
        <div className={`section-header centered reveal`}>
          <div className="label">Featured Projects</div>
          <h2>
            Where Vision<br />
            <span className="gradient-text">Becomes Space</span>
          </h2>
          <p>A curated selection of our most significant built works and design explorations.</p>
        </div>
        <div className={`${styles.grid} stagger`}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} featured={i === 0} />
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/projects" className="btn btn-secondary btn-lg">
            View All Projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }) {
  return (
    <Link
      href="/projects"
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-label={`View ${project.title} project`}
    >
      <div className={styles.cardViz} style={{ '--pa': project.colorA, '--pb': project.colorB }}>
        <ProjectMiniViz project={project} />
        <div className={styles.cardOverlay} />
      </div>

      <div className={styles.cardMeta}>
        <span className={styles.cardCategory}>{project.category}</span>
        <span className={styles.cardYear}>{project.year}</span>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <div className={styles.cardLocation}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {project.location}
        </div>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardArrow} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

function ProjectMiniViz({ project }) {
  // Unique SVG for each project type
  const vizMap = {
    1: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect x="70" y="20" width="30" height="120" fill={`rgba(255,101,36,0.08)`} stroke={`rgba(255,101,36,0.35)`} strokeWidth="1"/>
        <rect x="55" y="50" width="16" height="90" fill={`rgba(255,101,36,0.05)`} stroke={`rgba(255,101,36,0.2)`} strokeWidth="1"/>
        <rect x="100" y="60" width="20" height="80" fill={`rgba(255,101,36,0.06)`} stroke={`rgba(255,101,36,0.25)`} strokeWidth="1"/>
        {Array.from({length:8}).map((_,r)=>Array.from({length:3}).map((_,c)=>(
          <rect key={`${r}${c}`} x={71+c*9} y={25+r*12} width="6" height="8" fill={`rgba(255,255,200,${0.1+Math.sin(r*c)*0.1})`} rx="0.5"/>
        )))}
      </svg>
    ),
    2: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <path d="M20 120 Q60 60 100 80 Q140 100 180 40" stroke="rgba(255,101,36,0.4)" strokeWidth="1.5" fill="none"/>
        <path d="M20 120 Q60 70 100 90 Q140 110 180 60 L180 140 L20 140Z" fill="rgba(255,101,36,0.06)"/>
        {[40,80,120,160].map((x,i)=>(
          <path key={x} d={`M${x} 120 A${15+i*3} ${20+i*3} 0 0 1 ${x+20} 120`} stroke="rgba(255,101,36,0.25)" strokeWidth="1" fill="none"/>
        ))}
      </svg>
    ),
    default: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        {Array.from({length:7}).map((_,r)=>Array.from({length:10}).map((_,c)=>(
          <rect key={`${r}${c}`} x={5+c*19} y={10+r*17} width="16" height="14" fill={`rgba(255,101,36,${0.04+Math.sin(r*c*0.5)*0.08})`} stroke={`rgba(255,101,36,0.08)`} strokeWidth="0.5" rx="1"/>
        )))}
      </svg>
    ),
  };
  return vizMap[project.id] || vizMap.default;
}
