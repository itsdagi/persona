'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

const LINKS = {
  Studio: [
    { label: 'About Persona', href: '/#about' },
    { label: 'Our Process', href: '/#process' },
    { label: 'Services', href: '/#services' },
    { label: 'Careers', href: '/careers' },
  ],
  Work: [
    { label: 'Projects', href: '/projects' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Case Studies', href: '/projects' },
    { label: 'Awards', href: '/#about' },
  ],
  Connect: [
    { label: 'Start a Project', href: '/#contact' },
    { label: 'Insights', href: '/#insights' },
    { label: 'Instagram', href: '#', external: true },
    { label: 'LinkedIn', href: '#', external: true },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <div className="container">
          <div className={styles.topInner}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <span className={styles.logoMark} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/logo.png" alt="Persona" style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'brightness(1.5)' }} />
                </span>
                <span className={styles.logoText}>PERSONA</span>
              </div>
              <p className={styles.tagline}>
                Architecture Studio led by Nahom.<br />
                Designing spaces with identity.
              </p>
              <div className={styles.social}>
                {['IG', 'LI', 'TW'].map((s) => (
                  <a key={s} href="#" className={styles.socialLink} aria-label={s}>
                    <span>{s}</span>
                  </a>
                ))}
              </div>
            </div>

            <nav className={styles.links} aria-label="Footer navigation">
              {Object.entries(LINKS).map(([group, items]) => (
                <div key={group} className={styles.linkGroup}>
                  <span className={styles.linkGroupTitle}>{group}</span>
                  <ul>
                    {items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={styles.link}
                          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© 2025 Persona Studio. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <a href="#">Privacy Policy</a>
              <span aria-hidden="true">·</span>
              <a href="#">Terms</a>
              <span aria-hidden="true">·</span>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
