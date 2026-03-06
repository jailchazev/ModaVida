'use client';

// ============================================================
// FILTERS - Filtros y búsqueda de productos
// ============================================================

import { useState } from 'react';
import { Filters, Product } from '@/types';

interface FiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  products: Product[];
  totalResults: number;
}

export default function FiltersComponent({ filters, onFiltersChange, products, totalResults }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Obtener categorías únicas
  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];

  // Obtener tallas únicas
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '26', '28', '30', '32', '34', '36'];
  const sizes = ['Todas', ...allSizes.sort((a, b) => {
    const ai = sizeOrder.indexOf(a);
    const bi = sizeOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  })];

  // Precio máximo de los productos
  const maxProductPrice = Math.max(...products.map(p => p.price));

  const updateFilter = (key: keyof Filters, value: string | number | boolean) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: '',
      size: '',
      minPrice: 0,
      maxPrice: maxProductPrice,
      onlyAvailable: false,
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.size ||
    filters.onlyAvailable || filters.minPrice > 0 || filters.maxPrice < maxProductPrice;

  return (
    <div
      className="rounded-xl p-5 mb-8 sticky top-20 z-10"
      style={{
        backgroundColor: 'var(--color-white)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Barra de búsqueda principal */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ color: 'var(--color-gray-400)' }}
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="input-store pl-10"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: 'var(--color-gray-400)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Toggle filtros avanzados */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: isExpanded ? 'var(--color-primary)' : 'var(--color-gray-100)',
            color: isExpanded ? 'white' : 'var(--color-gray-700)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="12" y1="18" x2="12" y2="18"/>
          </svg>
          Filtros
          {hasActiveFilters && (
            <span
              className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              !
            </span>
          )}
        </button>
      </div>

      {/* Filtros de categoría (siempre visibles) */}
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateFilter('category', cat === 'Todas' ? '' : cat)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200"
            style={{
              backgroundColor: (cat === 'Todas' && !filters.category) || filters.category === cat
                ? 'var(--color-primary)'
                : 'var(--color-gray-100)',
              color: (cat === 'Todas' && !filters.category) || filters.category === cat
                ? 'white'
                : 'var(--color-gray-600)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtros avanzados */}
      {isExpanded && (
        <div className="border-t pt-4 mt-2 animate-fade-in" style={{ borderColor: 'var(--color-gray-100)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Filtro por talla */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                Talla
              </label>
              <select
                value={filters.size || 'Todas'}
                onChange={(e) => updateFilter('size', e.target.value === 'Todas' ? '' : e.target.value)}
                className="select-store"
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Filtro precio mínimo */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                Precio mínimo: S/ {filters.minPrice}
              </label>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="10"
                value={filters.minPrice}
                onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                className="w-full accent-amber-600"
                style={{ accentColor: 'var(--color-accent)' }}
              />
            </div>

            {/* Filtro precio máximo */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                Precio máximo: S/ {filters.maxPrice}
              </label>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="10"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                className="w-full"
                style={{ accentColor: 'var(--color-accent)' }}
              />
            </div>
          </div>

          {/* Solo disponibles */}
          <div className="flex items-center gap-3 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className="relative w-10 h-5 rounded-full transition-colors duration-200"
                style={{ backgroundColor: filters.onlyAvailable ? 'var(--color-accent)' : 'var(--color-gray-200)' }}
                onClick={() => updateFilter('onlyAvailable', !filters.onlyAvailable)}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                  style={{ transform: filters.onlyAvailable ? 'translateX(22px)' : 'translateX(2px)' }}
                />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-gray-700)' }}>
                Solo productos disponibles
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Resultados y limpiar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-gray-100)' }}>
        <span className="text-sm" style={{ color: 'var(--color-gray-500)' }}>
          <strong style={{ color: 'var(--color-primary)' }}>{totalResults}</strong> producto{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium flex items-center gap-1 transition-colors"
            style={{ color: 'var(--color-error)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
