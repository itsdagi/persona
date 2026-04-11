'use client';
import Nav from '../components/Nav';
import Team from '../components/Team';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import Toasts from '../components/Toasts';

export default function TeamPage() {
  return (
    <>
      <Nav isHome={false} />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <Team />
      </div>
      <Footer />
      <CartSidebar />
      <Toasts />
    </>
  );
}
