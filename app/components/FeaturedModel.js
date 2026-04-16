'use client';
import { useReveal } from '../hooks';
import styles from './FeaturedModel.module.css';

export default function FeaturedModel() {
  const [ref] = useReveal();

  return (
    <section className={`section ${styles.featuredModel}`} ref={ref}>
      <div className={styles.ambientGlow}></div>
      
      <div className={styles.wrapper}>
        <div className={styles.hudElements}>
          <div className={`${styles.crosshair} ${styles.tl}`}></div>
          <div className={`${styles.crosshair} ${styles.tr}`}></div>
          <div className={`${styles.crosshair} ${styles.bl}`}></div>
          <div className={`${styles.crosshair} ${styles.br}`}></div>
          <div className={styles.scanline}></div>
          <div className={styles.hudText}>SYS.OBJ_VISUALIZER :: ONLINE</div>
        </div>

        <div className={styles.modelContainer}>
          <iframe 
            title="Modern Studio Apartment" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            src="https://sketchfab.com/models/68864965414f487090d1f677adbb8029/embed?autospin=0&autostart=1&preload=1&transparent=1&ui_infos=0&ui_watermark=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0&ui_help=0&ui_inspector=0&ui_stop=0&ui_theme=dark&dnt=1"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
