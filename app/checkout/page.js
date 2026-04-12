'use client';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import styles from './page.module.css';

/**
 * PADDLE BILLING SETUP
 * ─────────────────────────────────────────────────────────────
 * 1. Create a Paddle account at https://paddle.com
 * 2. Get your "Client-side token" from Paddle Dashboard → Developer → Authentication
 * 3. Create products/prices in Paddle Dashboard → Catalog → Products
 * 4. Replace PADDLE_CLIENT_TOKEN below with your token
 * 5. Replace PADDLE_PRICE_ID with the price ID(s) for your products
 *
 * For testing use sandbox: https://sandbox-buy.paddle.com
 * Sandbox tokens start with "test_"
 */
const PADDLE_CLIENT_TOKEN = 'test_YOUR_TOKEN_HERE'; // replace with your token
const PADDLE_ENV = 'sandbox'; // change to 'production' when live

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart, setCartOpen } = useApp();
  const router = useRouter();
  const [paddleReady, setPaddleReady] = useState(false);
  const [step, setStep] = useState('review'); // 'review' | 'processing' | 'success'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const bgRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  /* ── Paddle Init ── */
  const initPaddle = () => {
    if (!window.Paddle) return;
    try {
      window.Paddle.Environment.set(PADDLE_ENV);
      window.Paddle.Initialize({
        token: PADDLE_CLIENT_TOKEN,
        eventCallback: (ev) => {
          if (ev.name === 'checkout.completed') {
            setStep('success');
          }
        },
      });
      setPaddleReady(true);
    } catch (err) {
      console.error('Paddle init error:', err);
    }
  };

  /* ── Parallax bg ── */
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${(mouseRef.current.x - 0.5) * -30}px, ${(mouseRef.current.y - 0.5) * -30}px)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ── Open Paddle Checkout ── */
  const openPaddleCheckout = () => {
    if (!window.Paddle || !paddleReady) {
      // Fallback: simulate success for demo without real Paddle credentials
      setStep('processing');
      setTimeout(() => setStep('success'), 2000);
      return;
    }

    // Build items — in production, map each cart item to its Paddle price ID
    // Here we use a single demo price; replace with real price IDs per product
    window.Paddle.Checkout.open({
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en',
        successUrl: `${window.location.origin}/checkout?success=true`,
      },
      customer: { email },
      customData: { customer_name: name },
      // items: cart.map(item => ({ priceId: item.paddlePriceId, quantity: 1 })),
      // For demo without product IDs, keep items commented and rely on eventCallback
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim()) { setFormError('Please enter your full name.'); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.'); return;
    }
    if (cart.length === 0) { setFormError('Your cart is empty.'); return; }
    openPaddleCheckout();
  };

  /* ── SUCCESS ── */
  if (step === 'success') {
    return (
      <>
        <Nav />
        <main className={styles.main}>
          <div className={styles.successScene}>
            <div className={styles.successRing} />
            <div className={styles.successRing2} />
            <div className={styles.successContent}>
              <div className={styles.successCheckWrap}>
                <svg className={styles.successCheck} viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 26l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className={styles.successLabel}>Transaction Complete</p>
              <h1 className={styles.successTitle}>Your assets are<br />on their way.</h1>
              <p className={styles.successSub}>
                A download link has been sent to <strong>{email || 'your inbox'}</strong>.<br />
                Thank you for investing in the craft of architecture.
              </p>
              <div className={styles.successActions}>
                <button className={`btn btn-primary ${styles.successBtn}`} onClick={() => router.push('/marketplace')}>
                  Continue Shopping
                </button>
                <button className={`btn btn-secondary ${styles.successBtn}`} onClick={() => router.push('/')}>
                  Back to Studio
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tax = +(cartTotal * 0.085).toFixed(2);
  const total = +(cartTotal + tax).toFixed(2);

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={initPaddle}
        strategy="afterInteractive"
      />
      <Nav />
      <main className={styles.main}>
        {/* Animated bg */}
        <div className={styles.sceneBg} ref={bgRef} aria-hidden="true">
          <div className={styles.bgOrb1} />
          <div className={styles.bgOrb2} />
          <div className={styles.bgGrid} />
        </div>

        <div className={`container ${styles.layout}`}>

          {/* ── LEFT: Form ── */}
          <div className={styles.formPanel}>
            {/* Header */}
            <div className={styles.formHeader}>
              <button className={styles.backBtn} onClick={() => router.back()} aria-label="Go back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>
              <div>
                <p className={styles.formStep}>Step 2 of 2</p>
                <h1 className={styles.formTitle}>Secure Checkout</h1>
              </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressBar} aria-hidden="true">
              <div className={styles.progressFill} />
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              {/* Contact section */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.fieldsetLegend}>
                  <span className={styles.legendNum}>01</span>
                  Contact Information
                </legend>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label htmlFor="checkout-name" className={styles.label}>Full Name</label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        id="checkout-name"
                        type="text"
                        className={styles.input}
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="checkout-email" className={styles.label}>Email Address</label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                      <input
                        id="checkout-email"
                        type="email"
                        className={styles.input}
                        placeholder="you@studio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Payment section */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.fieldsetLegend}>
                  <span className={styles.legendNum}>02</span>
                  Payment
                </legend>

                <div className={styles.paddleCard}>
                  <div className={styles.paddleCardTop}>
                    <div className={styles.paddleLogo}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Secured by Paddle</span>
                    </div>
                    <div className={styles.cardBrands}>
                      {['VISA', 'MC', 'AMEX', 'PayPal'].map(b => (
                        <span key={b} className={styles.cardBadge}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <p className={styles.paddleDesc}>
                    Clicking "Complete Purchase" opens Paddle's secure overlay. Your card details are handled directly by Paddle — we never see or store them.
                  </p>
                  <div className={styles.paddleFeatures}>
                    {[
                      { icon: '🔒', text: '256-bit SSL encryption' },
                      { icon: '⚡', text: 'Instant digital delivery' },
                      { icon: '↩️', text: '30-day refund guarantee' },
                    ].map(f => (
                      <div key={f.text} className={styles.paddleFeature}>
                        <span>{f.icon}</span>
                        <span>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Error */}
              {formError && (
                <div className={styles.errorBox} role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {formError}
                </div>
              )}

              {/* Submit */}
              <button
                id="checkout-submit"
                type="submit"
                className={styles.submitBtn}
                disabled={cart.length === 0 || step === 'processing'}
              >
                {step === 'processing' ? (
                  <>
                    <span className={styles.spinner} />
                    Processing…
                  </>
                ) : cart.length === 0 ? (
                  'Cart is Empty'
                ) : (
                  <>
                    Complete Purchase · ${total}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className={styles.termsNote}>
                By completing this purchase you agree to our{' '}
                <a href="#terms" className={styles.termsLink}>Terms of Service</a> and{' '}
                <a href="#privacy" className={styles.termsLink}>Privacy Policy</a>.
              </p>
            </form>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <aside className={styles.summaryPanel} aria-label="Order summary">
            <div className={styles.summaryInner}>
              <div className={styles.summaryHeader}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <span className={styles.summaryCount}>{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
              </div>

              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <div className={styles.emptyIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                  </div>
                  <p>Your cart is empty</p>
                  <button className={`btn btn-secondary btn-sm`} onClick={() => router.push('/marketplace')}>
                    Browse Marketplace
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.itemList}>
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className={`${styles.orderItem} ${hoveredItem === item.id ? styles.orderItemHovered : ''}`}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className={styles.orderItemViz}>
                          <OrderItemViz id={item.id} />
                        </div>
                        <div className={styles.orderItemInfo}>
                          <p className={styles.orderItemName}>{item.name}</p>
                          <p className={styles.orderItemSub}>Premium License · Digital Download</p>
                        </div>
                        <div className={styles.orderItemRight}>
                          <span className={styles.orderItemPrice}>${item.price}</span>
                          <button
                            className={styles.removeItemBtn}
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className={styles.totalsSection}>
                    <div className={styles.totalRow}>
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                    </div>
                    <div className={styles.totalRow}>
                      <span>Tax (8.5%)</span>
                      <span>${tax}</span>
                    </div>
                    <div className={styles.totalDivider} />
                    <div className={styles.totalFinal}>
                      <span>Total</span>
                      <span className={styles.totalFinalPrice}>${total}</span>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className={styles.trustBar}>
                    <div className={styles.trustItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span>30-day Guarantee</span>
                    </div>
                    <div className={styles.trustItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                      <span>Instant Delivery</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>

        </div>
      </main>
      <Footer />
    </>
  );
}

/* Mini SVG visualization for each order item */
function OrderItemViz({ id }) {
  const hue = [24, 160, 200, 280, 340, 60, 120, 30, 200][id % 9];
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect width="60" height="60" fill={`hsl(${hue},30%,8%)`}/>
      {id % 3 === 0 ? (
        <>
          <rect x="8" y="20" width="16" height="32" fill={`hsla(${hue},80%,55%,0.15)`} stroke={`hsla(${hue},80%,55%,0.4)`} strokeWidth="0.8"/>
          <rect x="26" y="28" width="12" height="24" fill={`hsla(${hue},80%,55%,0.1)`} stroke={`hsla(${hue},80%,55%,0.3)`} strokeWidth="0.8"/>
          <rect x="40" y="14" width="14" height="38" fill={`hsla(${hue},80%,55%,0.12)`} stroke={`hsla(${hue},80%,55%,0.35)`} strokeWidth="0.8"/>
          <line x1="0" y1="52" x2="60" y2="52" stroke={`hsla(${hue},80%,55%,0.2)`} strokeWidth="0.5"/>
        </>
      ) : id % 2 === 0 ? (
        <>
          {[0,1,2,3].map(r => [0,1,2,3].map(c => (
            <rect key={`${r}${c}`} x={4+c*14} y={4+r*14} width="12" height="12" rx="1"
              fill={`hsla(${hue},70%,55%,${0.03 + Math.abs(Math.sin(r+c+id))*0.1})`}
              stroke={`hsla(${hue},70%,55%,0.15)`} strokeWidth="0.5" />
          )))}
        </>
      ) : (
        <>
          <path d={`M4 48 Q20 ${30-id*2} 30 ${35-id*3} Q42 ${38-id*2} 56 ${24-id}`}
            stroke={`hsla(${hue},80%,60%,0.5)`} strokeWidth="1.2" fill="none"/>
          <path d={`M4 48 Q20 ${30-id*2} 30 ${35-id*3} Q42 ${38-id*2} 56 ${24-id} L56 56 L4 56Z`}
            fill={`hsla(${hue},80%,55%,0.07)`}/>
        </>
      )}
      <circle cx={30} cy={30} r="3" fill={`hsla(${hue},90%,65%,0.7)`}/>
    </svg>
  );
}
