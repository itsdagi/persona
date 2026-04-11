'use client';
import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useReveal } from '../hooks';
import styles from './page.module.css';

const CATEGORIES = ['All', '3D Models', 'Blueprints', 'Materials', 'Textures', 'Furniture', 'Renders'];

const ITEMS = [
  { id: 1, title: 'Brutalist Tower 3D Model', category: '3D Models', price: 249, rating: 4.9, reviews: 38, format: 'OBJ, FBX, Blender', tag: 'Bestseller' },
  { id: 2, title: 'Minimalist Villa Blueprint Set', category: 'Blueprints', price: 89, rating: 4.8, reviews: 61, format: 'PDF, DWG', tag: 'New' },
  { id: 3, title: 'Concrete Texture Pack Vol.3', category: 'Textures', price: 45, rating: 4.7, reviews: 102, format: 'PNG 4K, PBR', tag: null },
  { id: 4, title: 'Office Campus Concept Pack', category: 'Blueprints', price: 149, rating: 5.0, reviews: 14, format: 'PDF, DWG, XLS', tag: 'New' },
  { id: 5, title: 'Parametric Facade Material', category: 'Materials', price: 69, rating: 4.6, reviews: 45, format: 'Rhino, Grasshopper', tag: null },
  { id: 6, title: 'Luxury Sofa Collection 3D', category: 'Furniture', price: 179, rating: 4.9, reviews: 27, format: 'OBJ, FBX, MAX', tag: 'Bestseller' },
  { id: 7, title: 'Urban Campus Render Kit', category: 'Renders', price: 320, rating: 4.8, reviews: 19, format: 'PSD, PNG 8K', tag: null },
  { id: 8, title: 'Cultural Center 3D Model', category: '3D Models', price: 299, rating: 4.7, reviews: 31, format: 'OBJ, Blender, USDZ', tag: null },
  { id: 9, title: 'Stone & Wood Texture Bundle', category: 'Textures', price: 59, rating: 4.8, reviews: 78, format: 'PNG 4K, PBR', tag: null },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ref] = useReveal();

  const filtered = activeCategory === 'All'
    ? ITEMS
    : ITEMS.filter((i) => i.category === activeCategory);

  const addToCart = (item) => {
    if (!cart.find((c) => c.id === item.id)) {
      setCart((prev) => [...prev, item]);
    }
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const cartTotal = cart.reduce((acc, i) => acc + i.price, 0);

  return (
    <>
      <Nav />
      <main>
        {/* Page Hero */}
        <section className={styles.pageHero}>
          <div className={`container ${styles.pageHeroInner}`}>
            <div className={styles.pageHeroBreadcrumb}>
              <a href="/" className={styles.breadcrumbLink}>Home</a>
              <span>›</span>
              <span>Marketplace</span>
            </div>
            <h1 className={styles.pageHeroTitle}>Persona Marketplace</h1>
            <p className={styles.pageHeroSub}>
              Professional-grade architectural assets — 3D models, blueprints, textures, and renders
              crafted by the Persona studio team.
            </p>
          </div>
          <div className={styles.pageHeroBg} aria-hidden="true" />
        </section>

        {/* Marketplace section */}
        <section className={`section ${styles.marketplaceSection}`} ref={ref}>
          <div className="container">
            {/* Header row with cart */}
            <div className={`${styles.controls} reveal`}>
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
                  </button>
                ))}
              </div>

              {cart.length > 0 && (
                <div className={styles.cartSummary} aria-live="polite" aria-label={`Cart: ${cart.length} items, $${cartTotal}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                  </svg>
                  {cart.length} item{cart.length !== 1 ? 's' : ''} · ${cartTotal}
                  <button className={styles.checkoutBtn}>Checkout</button>
                </div>
              )}
            </div>

            {/* Grid */}
            <div className={`${styles.grid} stagger`}>
              {filtered.map((item) => (
                <MarketplaceCard 
                  key={item.id} 
                  item={item} 
                  onView={() => setSelectedItem(item)}
                  onAdd={(e) => { e.stopPropagation(); addToCart(item); }} 
                  added={addedId === item.id} 
                  inCart={cart.some(c => c.id === item.id)} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Product Modal */}
        {selectedItem && (
          <div className={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setSelectedItem(null)}>✕</button>
              <div className={styles.modalViz}>
                <MarketMiniViz id={selectedItem.id} />
              </div>
              <div className={styles.modalBody}>
                <span className={styles.modalCategory}>{selectedItem.category}</span>
                <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                <div className={styles.modalMeta}>
                  <span className={styles.modalFormat}>Format: {selectedItem.format}</span>
                  <span className={styles.modalFormat}>License: Standard Use</span>
                  <span className={styles.modalFormat}>File Size: {(selectedItem.id * 8.4).toFixed(1)} MB</span>
                </div>
                <p className={styles.modalDesc}>
                  This premium architecture asset is curated by the Persona design lab. Highly optimized geometry, fully textured with PBR materials, and ready for immediate deployment in your architectural visualizations or engine pipelines.
                </p>
                <div className={styles.modalFooter}>
                  <div className={styles.modalPrice}>${selectedItem.price}</div>
                  <button
                    className={`btn btn-primary btn-sm ${cart.some(c => c.id === selectedItem.id) ? styles.btnDisabled : ''}`}
                    onClick={(e) => { e.stopPropagation(); addToCart(selectedItem); }}
                    disabled={cart.some(c => c.id === selectedItem.id)}
                  >
                    {addedId === selectedItem.id ? 'Added' : cart.some(c => c.id === selectedItem.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function MarketplaceCard({ item, onView, onAdd, added, inCart }) {
  return (
    <article className={styles.card} aria-label={item.title} onClick={onView}>
      <div className={styles.cardViz}>
        <MarketMiniViz id={item.id} />
        {item.tag && <span className={`${styles.cardTag} ${item.tag === 'New' ? styles.cardTagNew : styles.cardTagBest}`}>{item.tag}</span>}
      </div>

      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{item.category}</span>
        <h2 className={styles.cardTitle}>{item.title}</h2>

        <div className={styles.cardRating} aria-label={`${item.rating} stars, ${item.reviews} reviews`}>
          <span className={styles.ratingStars} aria-hidden="true">
            {'★'.repeat(Math.floor(item.rating))}
          </span>
          <span className={styles.ratingNum}>{item.rating}</span>
          <span className={styles.ratingCount}>({item.reviews})</span>
        </div>

        <div className={styles.cardFormat}>{item.format}</div>

        <div className={styles.cardBottom}>
          <span className={styles.cardPrice}>${item.price}</span>
          <button
            className={`${styles.addBtn} ${inCart ? styles.addBtnInCart : ''} ${added ? styles.addBtnAdded : ''}`}
            onClick={onAdd}
            disabled={inCart}
            aria-label={inCart ? `${item.title} in cart` : `Add ${item.title} to cart`}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Added
              </>
            ) : inCart ? 'In Cart' : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function MarketMiniViz({ id }) {
  const seed = id * 37;
  return (
    <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width="300" height="160" fill="#06060a"/>
      {/* Base shape based on id */}
      {id % 3 === 0 ? (
        <>
          {Array.from({length:5}).map((_,r)=>Array.from({length:8}).map((_,c)=>(
            <rect key={`${r}${c}`} x={8+c*36} y={10+r*28} width="32" height="24"
              fill={`rgba(255,101,36,${0.03 + Math.abs(Math.sin(r+c+seed))*0.09})`}
              stroke="rgba(255,101,36,0.1)" strokeWidth="0.5" rx="1"/>
          )))}
        </>
      ) : id % 2 === 0 ? (
        <>
          <rect x="60" y="20" width="60" height="130" fill="rgba(255,101,36,0.07)" stroke="rgba(255,101,36,0.3)" strokeWidth="1.5"/>
          <rect x="130" y="50" width="40" height="100" fill="rgba(255,101,36,0.05)" stroke="rgba(255,101,36,0.2)" strokeWidth="1"/>
          <rect x="180" y="35" width="70" height="115" fill="rgba(255,101,36,0.06)" stroke="rgba(255,101,36,0.25)" strokeWidth="1.5"/>
          <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(255,101,36,0.15)" strokeWidth="1"/>
        </>
      ) : (
        <>
          <path d={`M30 140 Q80 ${80-id*5} 150 ${100-id*3} Q220 ${120-id*4} 270 ${70-id*2}`} stroke="rgba(255,101,36,0.4)" strokeWidth="1.5" fill="none"/>
          <path d={`M30 140 Q80 ${80-id*5} 150 ${100-id*3} Q220 ${120-id*4} 270 ${70-id*2} L270 160 L30 160Z`} fill="rgba(255,101,36,0.05)"/>
        </>
      )}
      {/* Accent dot */}
      <circle cx={150+Math.sin(seed)*40} cy={80+Math.cos(seed)*20} r="4" fill="rgba(255,101,36,0.6)"/>
      <circle cx={150+Math.sin(seed)*40} cy={80+Math.cos(seed)*20} r="10" fill="rgba(255,101,36,0.08)" stroke="rgba(255,101,36,0.2)" strokeWidth="0.5"/>
    </svg>
  );
}
