'use client';
import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cart, cartTotal } = useApp();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(3); // Success
    }, 2500);
  };

  if (step === 3) {
    return (
      <>
        <Nav />
        <main className={styles.main}>
          <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.title}>Payment Successful</h1>
            <p className={styles.desc}>Thank you for your purchase. Your premium architecture assets have been sent to your email.</p>
            <a href="/marketplace" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Marketplace</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={`container ${styles.checkoutContainer}`}>
          
          <div className={styles.formSection}>
            <h1 className={styles.title}>Secure Checkout</h1>
            
            <div className={styles.steps}>
              <div className={`${styles.stepIndicator} ${step >= 1 ? styles.active : ''}`}>1. Details</div>
              <div className={styles.stepLine} />
              <div className={`${styles.stepIndicator} ${step >= 2 ? styles.active : ''}`}>2. Payment</div>
            </div>

            {step === 1 && (
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input type="text" required placeholder="Nahom Tassew" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  <input type="email" required placeholder="nahom@personastudio.com" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Continue to Payment</button>
              </form>
            )}

            {step === 2 && (
              <form className={styles.form} onSubmit={handlePay}>
                <div className={styles.cardPreview}>
                  <div className={styles.cardLogo}>Credit Card</div>
                  <div className={styles.cardChip} />
                  <div className={styles.cardNum}>**** **** **** 4242</div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Card Number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" />
                </div>
                <div className={styles.rowInputs}>
                  <div className={styles.inputGroup}>
                    <label>Expiry</label>
                    <input type="text" required placeholder="MM/YY" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>CVC</label>
                    <input type="text" required placeholder="123" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', position: 'relative' }} disabled={processing}>
                  {processing ? 'Processing...' : `Pay $${cartTotal}`}
                </button>
                <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
              </form>
            )}
          </div>

          <div className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.cartItems}>
              {cart.length === 0 ? <p style={{ color: 'var(--text3)' }}>Your cart is empty.</p> : cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemType}>Digital Asset</div>
                  </div>
                  <div className={styles.itemPrice}>${item.price}</div>
                </div>
              ))}
            </div>
            <div className={styles.totals}>
              <div className={styles.totalRow}><span>Subtotal</span><span>${cartTotal}</span></div>
              <div className={styles.totalRow}><span>Tax</span><span>$0</span></div>
              <div className={`${styles.totalRow} ${styles.finalTotal}`}><span>Total</span><span>${cartTotal}</span></div>
            </div>
            <div className={styles.secureBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.4rem' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Secure 256-bit SSL encryption
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
