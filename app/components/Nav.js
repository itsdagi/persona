'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const MAIN_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/blog', label: 'Blog' },
];

const MENU_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'Studio' },
  { href: '/#services', label: 'Expertise' },
  { href: '/#contact', label: 'Inquiry' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const pathname = usePathname();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setActiveLink(pathname); setMenuOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      setMenuOpen(false);
      const id = href.replace('/#', '');
      if (pathname !== '/') { window.location.href = href; return; }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header ref={headerRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Persona Studio home">
            <span className={styles.logoMark}>
              <img src="/logo.png" alt="Logo" className={styles.logoImg} />
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoName}>PERSONA</span>
              <span className={styles.logoTagline}>Architecture Studio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.links} aria-label="Main navigation">
            {MAIN_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${activeLink === href ? styles.active : ''}`}
                onClick={(e) => handleAnchorClick(e, href)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className={styles.actions}>
            <Link href="/#contact" className={`btn btn-primary btn-sm ${styles.navCta}`} onClick={(e) => handleAnchorClick(e, '/#contact')}>
              <span className={styles.btnText}>Inquire</span>
            </Link>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''} ${styles.alwaysShowHamburger}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.mobileInner}>
          <nav aria-label="Overlay navigation" className={styles.overlayNav}>
            {MENU_LINKS.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={styles.mobileLink}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                onClick={(e) => handleAnchorClick(e, href)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileFooter}>
            <p>© 2025 Persona Studio</p>
            <p>Led by Nahom — CEO</p>
          </div>
        </div>
      </div>
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
