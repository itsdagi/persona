'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('nt-theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nt-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const addToast = useCallback((msg) => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(c => {
      if (c.find(i => i.id === product.id)) return c;
      addToast(`${product.name} added to cart`);
      return [...c, product];
    });
  }, [addToast]);

  const removeFromCart = useCallback((id) => {
    setCart(c => c.filter(i => i.id !== id));
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);
  }, []);

  const cartTotal = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, cart, addToCart, removeFromCart, cartTotal, cartOpen, setCartOpen, wishlist, toggleWishlist, toasts, addToast }}>
      {children}
    </AppContext.Provider>
  );
}
