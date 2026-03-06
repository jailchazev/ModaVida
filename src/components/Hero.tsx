'use client';

// ============================================================
// HERO - Sección principal de bienvenida
// ============================================================

import { useEffect, useState } from 'react';

interface HeroProps {
  onCatalogClick: () => void;
}

export default function Hero({ onCatalogClick }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onCatalogClick();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Tienda de ropa MODAVIDA"
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.7) 50%, rgba(26,26,46,0.85) 100%)',
          }}
        />
      </div>

      {/* Patrón decorativo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,169,110,0.3) 40px, rgba(201,169,110,0.3) 41px)`,
        }}
      />

      {/* Contenido */}
      <div className="container-store relative z-10 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              backgroundColor: 'rgba(201,169,110,0.2)',
              border: '1px solid rgba(201,169,110,0.4)',
              color: 'var(--color-accent-light)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            Nueva Colección 2025
          </div>

          {/* Título principal */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-white)',
            }}
          >
            Viste con{' '}
            <span style={{ color: 'var(--color-accent)' }}>
              Elegancia
            </span>
            <br />
            y Confianza
          </h1>

          {/* Subtítulo */}
          <p
            className={`text-lg md:text-xl mb-10 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Descubre nuestra colección exclusiva de ropa moderna y elegante.
            Calidad premium, precios accesibles y entrega a todo el Perú.
          </p>

          {/* Botones CTA */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={scrollToCatalog}
              className="btn-accent text-base px-8 py-4"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              Ver Catálogo
            </button>
            <a
              href="https://wa.me/51932531871"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold px-8 py-4 rounded transition-all duration-200"
              style={{
                border: '2px solid rgba(255,255,255,0.4)',
                color: 'var(--color-white)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap gap-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {[
              { value: '500+', label: 'Clientes felices' },
              { value: '100+', label: 'Productos' },
              { value: '5★', label: 'Calificación' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={scrollToCatalog}
        aria-label="Ir al catálogo"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Explorar
        </span>
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
          style={{ borderColor: 'rgba(255,255,255,0.4)' }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>
      </button>
    </section>
  );
}
