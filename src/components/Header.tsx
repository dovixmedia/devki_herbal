'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_PRODUCTS = [
  {
    name: 'Periods Pain Relief Capsule',
    badge: 'BESTSELLER',
    badgeColor: 'bg-red-500',
    image: '/banner/product9-clean.png',
    href: '/product/periods-pain-relief-capsule',
  },
  {
    name: 'Daily Burner Capsule',
    badge: 'NEW LAUNCH',
    badgeColor: 'bg-blue-600',
    image: '/banner/product2-clean.png',
    href: '/product/daily-burner-capsule',
  },
  {
    name: 'Night Fat Burner',
    badge: 'TRENDING',
    badgeColor: 'bg-teal-600',
    image: '/banner/product1-clean.png',
    href: '/product/night-fat-burner',
  },
  {
    name: 'Stress Relief Gummies',
    badge: 'SAVE UPTO 40%',
    badgeColor: 'bg-orange-500',
    image: '/banner/product6-clean.png',
    href: '/product/stress-relief-gummies',
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { itemCount } = useCart();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 font-sans">
      <div className="bg-black text-white py-2 text-center text-xs font-medium tracking-wide">
        Free gift on orders above Rs. 1999! 🎁
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20 md:h-24">
          {/* Menu on the left */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-black hover:bg-slate-50 transition-colors rounded-full"
              aria-label="Toggle menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>

          {/* Logo center */}
          <div className="flex justify-center flex-1">
            <Link href="/" className="relative block h-16 md:h-20 transition-transform hover:scale-105 active:scale-95 duration-300">
              <img 
                src="/banner/logo.png?v=2" 
                alt="Wellness Logo" 
                className="h-full w-auto object-contain mx-auto"
              />
            </Link>
          </div>

          {/* Cart on the right */}
          <div className="flex justify-end gap-2 sm:gap-4 items-center">
            <Link href="/cart" className="relative p-2 text-black hover:bg-slate-50 transition-colors rounded-full">
              <ShoppingCart className="h-7 w-7" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0.5 right-0.5 bg-black text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            {user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link 
                  href={user.role === 'admin' ? '/admin' : '/profile'} 
                  className="p-2 text-black hover:bg-slate-100 transition-colors rounded-full" 
                  title={user.name}
                >
                  <User className="h-6 w-6 text-emerald-600" />
                </Link>
                <button 
                  onClick={async () => {
                    await fetch('/api/auth/logout', { method: 'POST' });
                    window.location.reload();
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 transition-colors rounded-full" 
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:block p-2 text-black hover:bg-slate-50 transition-colors rounded-full">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#F8F8F8] flex flex-col h-screen overflow-hidden"
          >
            {/* Menu Header */}
            <div className="bg-white px-4 h-20 md:h-24 flex items-center border-b border-slate-100 shrink-0">
              <div className="grid grid-cols-3 w-full items-center">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-black hover:bg-slate-50 transition-colors rounded-full place-self-start"
                  aria-label="Close menu"
                >
                  <X className="h-8 w-8" />
                </button>
                <div className="flex justify-center flex-1">
                  <div className="h-16 md:h-20 py-2">
                    <img 
                      src="/banner/logo.png?v=2" 
                      alt="Wellness Logo" 
                      className="h-full w-auto object-contain mx-auto"
                    />
                  </div>
                </div>
                <div className="w-12"></div> {/* Spacer to maintain center */}
              </div>
            </div>

            {/* Menu Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto px-2 py-4 pb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {NAV_PRODUCTS.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={product.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-5 bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] active:scale-95 transition-transform"
                    >
                      <div className="flex flex-col gap-2 max-w-[65%]">
                        <span className={`${product.badgeColor} text-white text-[9px] font-bold px-2 py-0.5 rounded w-fit tracking-wider uppercase`}>
                          {product.badge}
                        </span>
                        <h3 className="text-base font-bold text-gray-800 leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      <div className="relative w-20 h-20 -mr-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain drop-shadow-md"
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Additional Links */}
                <div className="col-span-1 sm:col-span-2 mt-4 pt-4 border-t border-slate-200">
                  <nav className="flex flex-col gap-1">
                    <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold py-3 px-2 flex justify-between items-center group">
                      Browse All Catalog <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                    <Link href="/#benefits" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold py-3 px-2 flex justify-between items-center group">
                      Our Benefits <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                    {!user ? (
                      <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold py-3 px-2 flex justify-between items-center group">
                        Login / Sign Up <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    ) : (
                      <>
                        <Link href={user.role === 'admin' ? '/admin' : '/profile'} onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold py-3 px-2 flex justify-between items-center group">
                          {user.role === 'admin' ? 'Admin Portal' : 'My Profile'} <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                        <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.reload(); }} className="w-full text-left text-xl font-semibold text-red-500 py-3 px-2 flex justify-between items-center group">
                          Logout <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                        </button>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
