'use client';
import Nav from '../components/Nav';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import Toasts from '../components/Toasts';

export default function BlogPage() {
  return (
    <>
      <Nav isHome={false} />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <Blog />
      </div>
      <Footer />
      <CartSidebar />
      <Toasts />
    </>
  );
}
