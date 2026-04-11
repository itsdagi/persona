'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * useReveal() → [ref, isVisible]
 *
 * Attaches an IntersectionObserver to the returned ref.
 * `isVisible` becomes true once the element enters the viewport.
 * Also adds the 'visible' class to child .reveal / .stagger elements.
 */
export function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    sectionObserver.observe(el);

    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    const childObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    targets.forEach((t) => childObserver.observe(t));

    return () => {
      sectionObserver.disconnect();
      childObserver.disconnect();
    };
  }, []);

  return [ref, vis];
}
