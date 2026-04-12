'use client';
import { useApp } from '../context/AppContext';
import Link from 'next/link';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { cart, removeFromCart, cartTotal, cartOpen, setCartOpen } = useApp();

  return (
    <>
      <div className={`${styles.overlay} ${cartOpen ? styles.open : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`${styles.sidebar} ${cartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Shopping Cart ({cart.length})</h3>
          <button className={styles.close} onClick={() => setCartOpen(false)}>✕</button>
        </div>
        {cart.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <p>Your cart is empty</p>
            <button className="btn btn-s btn-sm" onClick={() => setCartOpen(false)}>Browse Marketplace</button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map(item => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemThumb} />
                  <div className={styles.itemInfo}>
                    <h4>{item.name}</h4>
                    <span className={styles.itemPrice}>${item.price}</span>
                  </div>
                  <button className={styles.remove} onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setCartOpen(false)}>Checkout →</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
