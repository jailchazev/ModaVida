'use client';

// ============================================================
// PRODUCT LIST - Lista de productos con filtros
// ============================================================

import { useState, useMemo } from 'react';
import { Product, CartItem, Filters } from '@/types';
import ProductCard from './ProductCard';
import FiltersComponent from './Filters';

interface ProductListProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onViewDetail: (product: Product) => void;
}

const defaultFilters: Filters = {
  search: '',
  category: '',
  size: '',
  minPrice: 0,
  maxPrice: 9999,
  onlyAvailable: false,
};

export default function ProductList({ products, onAddToCart, onViewDetail }: ProductListProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState('featured');

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtro de búsqueda
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }

    // Filtro de categoría
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Filtro de talla
    if (filters.size) {
      result = result.filter(p => p.sizes.includes(filters.size));
    }

    // Filtro de precio
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Solo disponibles
    if (filters.onlyAvailable) {
      result = result.filter(p => p.available && p.stock > 0);
    }

    // Ordenar
    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => (b.tags.includes('nuevo') ? 1 : 0) - (a.tags.includes('nuevo') ? 1 : 0));
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  // Productos destacados
  const featuredProducts = products.filter(p => p.featured && p.available);

  return (
    <>
      {/* Sección de destacados */}
      {featuredProducts.length > 0 && (
        <section id="featured" className="section" style={{ backgroundColor: 'var(--color-gray-50)' }}>
          <div className="container-store">
            <h2 className="section-title">Productos Destacados</h2>
            <div className="divider-accent" />
            <p className="section-subtitle">Nuestra selección especial para ti</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetail={onViewDetail}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catálogo completo */}
      <section id="catalog" className="section">
        <div className="container-store">
          <h2 className="section-title">Catálogo Completo</h2>
          <div className="divider-accent" />
          <p className="section-subtitle">Encuentra tu estilo perfecto</p>

          {/* Filtros */}
          <FiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            products={products}
            totalResults={filteredProducts.length}
          />

          {/* Barra de ordenamiento */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm" style={{ color: 'var(--color-gray-500)' }}>
              Mostrando <strong style={{ color: 'var(--color-primary)' }}>{filteredProducts.length}</strong> productos
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:block" style={{ color: 'var(--color-gray-500)' }}>
                Ordenar por:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-store"
                style={{ width: 'auto', minWidth: '160px' }}
              >
                <option value="featured">Destacados</option>
                <option value="newest">Más nuevos</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetail={onViewDetail}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-gray-100)' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-gray-400)' }}>
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
              >
                No encontramos productos
              </h3>
              <p className="mb-6" style={{ color: 'var(--color-gray-500)' }}>
                Intenta con otros filtros o términos de búsqueda
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="btn-primary"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
