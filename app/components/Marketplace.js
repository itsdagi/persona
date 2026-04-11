'use client';
import { useState } from 'react';
import { useReveal } from '../hooks';
import { useApp } from '../context/AppContext';
import { products } from '../data';
import styles from './Marketplace.module.css';

const cats = ['All', 'Plans', '3D', 'Interior', 'Concept'];
const bgClass = { plans: styles.bgPlans, '3d': styles.bg3d, interior: styles.bgInt, concept: styles.bgConcept };

export default function Marketplace() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart, cart, wishlist, toggleWishlist } = useApp();
  const [ref, vis] = useReveal();

  const filtered = products.filter(p => {
    const matchCat = filter === 'All' || p.category === filter.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="marketplace" className="section">
      <div className="container" ref={ref}>
        <div className={`section-header ${vis ? 'visible' : ''} reveal`}>
          <span className="label">Marketplace</span>
          <h2>Design Resources</h2>
          <p>Premium architectural plans, 3D models, and design templates ready for your next project.</p>
        </div>
        <div className={styles.headerRow}>
          <div className={styles.filters}>
            {cats.map(c => (
              <button key={c} className={`${styles.tab} ${filter === c ? styles.active : ''}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <div className={styles.search}>
            <span>🔍</span>
            <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className={`${styles.grid} stagger ${vis ? 'visible' : ''}`}>
          {filtered.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.thumb}>
                <div className={`${styles.thumbBg} ${bgClass[p.bg]}`} />
                <button className={`${styles.wishBtn} ${wishlist.includes(p.id) ? styles.wishActive : ''}`} onClick={() => toggleWishlist(p.id)}>
                  {wishlist.includes(p.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className={styles.body}>
                <span className="tag">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className={styles.footer}>
                  <div className={styles.price}>
                    ${p.price}
                    {p.originalPrice && <span className={styles.original}>${p.originalPrice}</span>}
                  </div>
                  <button
                    className={`btn btn-p btn-sm`}
                    onClick={() => addToCart(p)}
                    disabled={cart.find(i => i.id === p.id)}
                  >
                    {cart.find(i => i.id === p.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
