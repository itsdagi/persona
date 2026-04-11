'use client';
import { useState, useRef } from 'react';
import { useReveal } from '../hooks';
import styles from './FeaturedLogo.module.css';

export default function FeaturedLogo() {
  const [ref] = useReveal();
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-15 to 15 degrees max)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section className={styles.wrapper} ref={ref}>
      <div className={`container ${styles.inner} reveal`}>
        <div 
          className={styles.logoContainer}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform }}
        >
          <img src="/logo.png" alt="Persona Logo" className={styles.featuredLogoImg} />
          <div className={styles.glowUnderlay} />
        </div>
        <div className={styles.textOverlay}>
          <h2 className={styles.title}>PERSONA</h2>
          <p className={styles.subtitle}>ARCHITECTURE STUDIO</p>
        </div>
      </div>
    </section>
  );
}
