'use client';
import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useReveal } from '../hooks';
import styles from './page.module.css';

const CATEGORIES = ['All', 'Residential', 'Cultural', 'Commercial', 'Education', 'Hospitality', 'Urban'];

const PROJECTS = [
  { id: 1, title: 'Obsidian Tower', category: 'Residential', location: 'Addis Ababa, ET', year: '2024', status: 'Completed', tags: ['High-Rise', 'Biophilic', 'Luxury'], desc: 'A 40-story vertical sanctuary redefining luxury urban living through biophilic design and adaptive facades that breathe with the city.' },
  { id: 2, title: 'Mesa Cultural Center', category: 'Cultural', location: 'Nairobi, KE', year: '2024', status: 'Completed', tags: ['Public Space', 'Heritage', 'Urban'], desc: 'A flowing civic structure merging East African cultural heritage with a boldly contemporary architectural language.' },
  { id: 3, title: 'Axiom HQ', category: 'Commercial', location: 'Dubai, UAE', year: '2025', status: 'In Progress', tags: ['Corporate', 'Parametric', 'Sustainable'], desc: 'A kinetic corporate campus with responsive facades that adapt to sunlight and occupancy density in real time.' },
  { id: 4, title: 'Horizon Residence', category: 'Residential', location: 'Cape Town, SA', year: '2023', status: 'Completed', tags: ['Villa', 'Landscape', 'Private'], desc: 'A cliff-edge villa that dissolves the boundary between interior luxury and the raw drama of the Cape coastline.' },
  { id: 5, title: 'Locus Institute', category: 'Education', location: 'London, UK', year: '2025', status: 'In Progress', tags: ['Research', 'Collaborative', 'Campus'], desc: 'A research campus designed around collaborative discovery, with generous interstitial social spaces at its core.' },
  { id: 6, title: 'Strata Hotel', category: 'Hospitality', location: 'Singapore', year: '2023', status: 'Completed', tags: ['Luxury', 'Layered', 'Civic'], desc: 'A luxury hotel that layers geological metaphors with precision engineering and bespoke artisan interiors.' },
  { id: 7, title: 'Vantage Tower', category: 'Commercial', location: 'Kigali, RW', year: '2025', status: 'Concept', tags: ['High-Rise', 'Mixed-Use', 'Africa'], desc: 'A landmark mixed-use tower anchoring Kigali\'s emerging innovation district with a sculpted, distinctive silhouette.' },
  { id: 8, title: 'Solaris Commons', category: 'Urban', location: 'Kampala, UG', year: '2024', status: 'In Progress', tags: ['Public Realm', 'Solar', 'District'], desc: 'A solar-powered district commons that activates previously neglected urban land into a vibrant civic gathering node.' },
  { id: 9, title: 'Archive House', category: 'Cultural', location: 'Cairo, EG', year: '2023', status: 'Completed', tags: ['Museum', 'Conservation', 'Heritage'], desc: 'A new home for rare manuscripts and artifacts, designed to protect the past while inviting the public\'s present curiosity.' },
];

const STATUS_COLORS = {
  Completed: '#22c55e',
  'In Progress': 'var(--accent)',
  Concept: '#9898a8',
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [ref] = useReveal();
  const [activeProject, setActiveProject] = useState(null);

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Nav />
      <main>
        {/* Page Hero */}
        <section className={styles.pageHero}>
          <div className={`container ${styles.pageHeroInner}`}>
            <div className={styles.pageHeroBreadcrumb}>
              <a href="/" className={styles.breadcrumbLink}>Home</a>
              <span aria-hidden="true">›</span>
              <span>Projects</span>
            </div>
            <h1 className={styles.pageHeroTitle}>
              Our Work
            </h1>
            <p className={styles.pageHeroSub}>
              A portfolio of architectural and design work spanning residential, civic,
              commercial, and cultural typologies — each a singular response to place, brief, and ambition.
            </p>
          </div>
          <div className={styles.pageHeroBg} aria-hidden="true" />
        </section>

        {/* Projects section */}
        <section className={`section ${styles.projectsSection}`} ref={ref}>
          <div className="container">
            {/* Controls */}
            <div className={`${styles.controls} reveal`}>
              {/* Category filter */}
              <div className={styles.filterTabs} role="tablist" aria-label="Filter by category">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    role="tab"
                    aria-selected={activeCategory === cat}
                  >
                    {cat}
                    {cat !== 'All' && (
                      <span className={styles.filterCount}>
                        {PROJECTS.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className={styles.viewToggle} role="group" aria-label="View mode">
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'tiktok' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('tiktok')}
                  aria-pressed={viewMode === 'tiktok'}
                  aria-label="TikTok mode"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="18" r="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Result count */}
            <div className={`${styles.resultInfo} reveal`}>
              <span className={styles.resultCount}>{filtered.length} projects</span>
              {activeCategory !== 'All' && (
                <button className={styles.clearFilter} onClick={() => setActiveCategory('All')}>
                  Clear filter ×
                </button>
              )}
            </div>

            {/* Grid */}
            {viewMode === 'grid' ? (
              <div className={`${styles.grid} stagger`}>
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />
                ))}
              </div>
            ) : (
              <div className={styles.tiktokContainer}>
                {filtered.map((project) => (
                  <TikTokProject key={project.id} project={project} onMoreInfo={() => setActiveProject(project)} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className={styles.ctaBanner}>
          <div className="container">
            <div className={styles.ctaInner}>
              <div>
                <h2 className={styles.ctaTitle}>Have a Project in Mind?</h2>
                <p className={styles.ctaSub}>Let's make something extraordinary together.</p>
              </div>
              <a href="/#contact" className="btn btn-primary btn-lg">Start a Project</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <article className={styles.card} tabIndex={0} role="button" aria-label={project.title} onClick={onClick}>
      <div className={styles.cardViz}>
        <ProjectMiniViz id={project.id} />
        <div className={styles.cardOverlay} aria-hidden="true" />
        <div className={styles.cardStatus} style={{ '--status-color': STATUS_COLORS[project.status] }}>
          <span className={styles.statusDot} />
          {project.status}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={styles.cardCategory}>{project.category}</span>
          <span className={styles.cardYear}>{project.year}</span>
        </div>
        <h2 className={styles.cardTitle}>{project.title}</h2>
        <div className={styles.cardLocation}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {project.location}
        </div>
        <p className={styles.cardDesc}>{project.desc}</p>
        <div className={styles.cardTags}>
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </article>
  );
}

function TikTokProject({ project, onMoreInfo }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className={styles.tiktokItem}>
      <div className={styles.tiktokBg}>
         <ProjectMiniViz id={project.id} />
         <div className={styles.tiktokOverlay} />
      </div>
      
      <div className={styles.tiktokContent}>
        <div className={styles.tiktokBottom}>
          <h2 className={styles.tiktokTitle}>{project.title}</h2>
          <p className={styles.tiktokDesc}>{project.desc}</p>
          <div className={styles.tiktokTags}>
            {project.tags.map(t => <span key={t} className={styles.tiktokTag}>#{t.toLowerCase()}</span>)}
          </div>
          <button className={styles.tiktokActionBtn} onClick={onMoreInfo}>View Details</button>
        </div>
        
        <div className={styles.tiktokSidebar}>
          <button className={styles.tiktokSideBtn} onClick={() => setLiked(!liked)}>
            <div className={`${styles.tiktokIconWrap} ${liked ? styles.liked : ''}`}>
              <svg viewBox="0 0 24 24" fill={liked ? 'var(--danger)' : 'none'} stroke={liked ? 'var(--danger)' : 'currentColor'} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <span>{liked ? ((project.id * 123) % 1000) + 1 : (project.id * 123) % 1000}</span>
          </button>
          
          <button className={styles.tiktokSideBtn}>
            <div className={styles.tiktokIconWrap}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <span>{(project.id * 89) % 500}</span>
          </button>
          
          <button className={styles.tiktokSideBtn} onClick={() => setSaved(!saved)}>
            <div className={`${styles.tiktokIconWrap} ${saved ? styles.saved : ''}`}>
              <svg viewBox="0 0 24 24" fill={saved ? 'var(--accent)' : 'none'} stroke={saved ? 'var(--accent)' : 'currentColor'} strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
              </svg>
            </div>
            <span>Save</span>
          </button>
          
          <button className={styles.tiktokSideBtn}>
            <div className={styles.tiktokIconWrap}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </div>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectMiniViz({ id }) {
  const vizMap = {
    1: <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect x="110" y="20" width="50" height="150" fill="rgba(255,101,36,0.07)" stroke="rgba(255,101,36,0.35)" strokeWidth="1.5"/>
      <rect x="90" y="60" width="22" height="110" fill="rgba(255,101,36,0.05)" stroke="rgba(255,101,36,0.2)" strokeWidth="1"/>
      <rect x="158" y="70" width="30" height="100" fill="rgba(255,101,36,0.05)" stroke="rgba(255,101,36,0.2)" strokeWidth="1"/>
      {Array.from({length:10}).map((_,r)=>Array.from({length:4}).map((_,c)=>(
        <rect key={`${r}${c}`} x={112+c*11} y={25+r*13} width="8" height="9" fill={`rgba(255,155,100,${0.05+Math.sin(r*c+r)*0.1})`} rx="0.5"/>
      )))}
    </svg>,
    2: <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <path d="M20 160 Q80 80 150 110 Q220 140 280 60" stroke="rgba(255,101,36,0.45)" strokeWidth="2" fill="none"/>
      <path d="M20 160 Q80 100 150 125 Q220 155 280 80 L280 180 L20 180Z" fill="rgba(255,101,36,0.06)"/>
      {[60,100,140,180,220].map((x,i)=>(
        <path key={x} d={`M${x} 160 A${18+i*3} ${25+i*3} 0 0 1 ${x+25} 160`} stroke="rgba(255,101,36,0.2)" strokeWidth="1" fill="none"/>
      ))}
    </svg>,
    default: <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      {Array.from({length:6}).map((_,r)=>Array.from({length:9}).map((_,c)=>(
        <rect key={`${r}${c}`} x={8+c*32} y={8+r*28} width="28" height="22" fill={`rgba(255,101,36,${0.03+Math.abs(Math.sin(r*c*0.7))*0.08})`} stroke="rgba(255,101,36,0.08)" strokeWidth="0.5" rx="1"/>
      )))}
    </svg>,
  };
  return vizMap[id] || vizMap.default;
}

function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('renders');
  
  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        <div className={styles.modalHeader}>
          <span className={styles.modalCategory}>{project.category} // {project.year}</span>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <div className={styles.modalTags}>
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        
        <div className={styles.modalTabs}>
          {['renders', 'blueprints', 'final works'].map((t) => (
            <button 
              key={t} 
              className={`${styles.modalTab} ${tab === t ? styles.modalTabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className={styles.modalBody}>
          {tab === 'renders' && (
            <div className={styles.modalVizGrid}>
              <div className={styles.modalMainViz}>
                <ProjectMiniViz id={project.id} />
                <span className={styles.vizLabel}>Primary Render View // 4K</span>
              </div>
              <p className={styles.modalDesc}>{project.desc}</p>
            </div>
          )}
          {tab === 'blueprints' && (
            <div className={styles.modalBlueprintView}>
              <svg width="100%" height="250" viewBox="0 0 400 250" fill="none" className={styles.blueprintSvg}>
                {[0,1,2,3,4,5,6,7].map(r => [0,1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
                  <rect key={`${r}${c}`} x={c*30} y={r*30} width="30" height="30" stroke="rgba(255,101,36,0.15)" strokeWidth="1" fill="none" />
                )))}
                <path d="M50 50 L350 50 L350 200 L50 200 Z" stroke="rgba(255,101,36,0.8)" strokeWidth="2" fill="none" />
                <path d="M150 50 L150 120 L250 120 L250 50" stroke="rgba(255,101,36,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="5 5"/>
                <text x="60" y="70" fill="rgba(255,101,36,0.7)" fontSize="10" fontFamily="monospace">FLOOR PLAN A</text>
              </svg>
              <div className={styles.blueprintStats}>
                <span>Scale: 1:100</span>
                <span>Area: 4,200m²</span>
                <span>Type: {project.category}</span>
              </div>
            </div>
          )}
          {tab === 'final works' && (
            <div className={styles.modalFinalView}>
              <div className={styles.statusBox}>
                <div className={styles.statusTitle}>Project Status</div>
                <div className={styles.statusValue} style={{color: STATUS_COLORS[project.status]}}>{project.status}</div>
              </div>
              <div className={styles.finalViz}>
                {project.status === 'Completed' ? (
                   <ProjectMiniViz id={(project.id % 3) + 1} />
                ) : (
                  <div className={styles.wipMessage}>Construction in progress // Visuals locked</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
