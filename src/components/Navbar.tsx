'use client';

// ============================================================
// NAVBAR - Barra de navegación principal
// ============================================================

import { useState, useEffect } from 'react';
import { calculateCartCount } from '@/lib/utils';
import { CartItem } from '@/types';

interface NavbarProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
  onAdminOpen: () => void;
}

export default function Navbar({ cartItems, onCartOpen, onAdminOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = calculateCartCount(cartItems);

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--color-white)' : 'transparent',
        }}
      >
        <div className="container-store">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                  M
                </span>
              </div>
              <div>
                <span
                  className="text-xl font-bold tracking-wide"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: isScrolled ? 'var(--color-primary)' : 'var(--color-white)',
                  }}
                >
                  MODAVIDA
                </span>
                <span
                  className="block text-xs tracking-widest uppercase"
                  style={{
                    color: isScrolled ? 'var(--color-accent)' : 'rgba(255,255,255,0.8)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                  }}
                >
                  Moda & Estilo
                </span>
              </div>
            </div>

            {/* Navegación desktop */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Inicio', id: 'hero' },
                { label: 'Catálogo', id: 'catalog' },
                { label: 'Novedades', id: 'featured' },
                { label: 'Contacto', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium tracking-wide uppercase transition-colors duration-200"
                  style={{
                    color: isScrolled ? 'var(--color-gray-700)' : 'rgba(255,255,255,0.9)',
                    letterSpacing: '0.08em',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = isScrolled
                      ? 'var(--color-gray-700)'
                      : 'rgba(255,255,255,0.9)';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              {/* Botón Admin */}
              <button
                onClick={onAdminOpen}
                className="hidden md:flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200"
                style={{
                  color: isScrolled ? 'var(--color-gray-500)' : 'rgba(255,255,255,0.7)',
                  border: `1px solid ${isScrolled ? 'var(--color-gray-200)' : 'rgba(255,255,255,0.3)'}`,
                }}
                title="Panel Administrador"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                Admin
              </button>

              {/* Carrito */}
              <button
                onClick={onCartOpen}
                className="relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: isScrolled ? 'var(--color-gray-100)' : 'rgba(255,255,255,0.15)',
                  color: isScrolled ? 'var(--color-primary)' : 'var(--color-white)',
                }}
                aria-label={`Carrito (${cartCount} items)`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                )}
              </button>

              {/* Menú móvil */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: isScrolled ? 'var(--color-gray-100)' : 'rgba(255,255,255,0.15)',
                  color: isScrolled ? 'var(--color-primary)' : 'var(--color-white)',
                }}
                aria-label="Menú"
              >
                {isMobileMenuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 pt-20 pb-6 px-6 animate-fade-in"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {[
                { label: 'Inicio', id: 'hero' },
                { label: 'Catálogo', id: 'catalog' },
                { label: 'Novedades', id: 'featured' },
                { label: 'Contacto', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-3 px-4 text-base font-medium rounded-lg transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-white/10 mt-2 pt-4">
                <button
                  onClick={() => {
                    onAdminOpen();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg w-full text-left"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                  Panel Administrador
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
