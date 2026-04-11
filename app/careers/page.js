'use client';
import Nav from '../components/Nav';
import Jobs from '../components/Jobs';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import Toasts from '../components/Toasts';

export default function CareersPage() {
  return (
    <>
      <Nav isHome={false} />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <Jobs />
      </div>
      <Footer />
      <CartSidebar />
      <Toasts />
    </>
  );
}
