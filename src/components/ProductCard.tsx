'use client';

// ============================================================
// PRODUCT CARD - Tarjeta de producto
// ============================================================

import { useState } from 'react';
import { Product, CartItem } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!product.available || product.stock === 0) return;

    setIsAdding(true);

    onAddToCart({
      product,
      quantity: 1,
      selectedSize: selectedSize || (product.sizes[0] || ''),
      selectedColor: selectedColor || (product.colors[0] || ''),
    });

    setTimeout(() => setIsAdding(false), 600);
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'nuevo': return { bg: 'var(--color-primary)', text: 'Nuevo' };
      case 'oferta': return { bg: 'var(--color-error)', text: `${discount}% OFF` };
      case 'agotado': return { bg: 'var(--color-gray-500)', text: 'Agotado' };
      case 'destacado': return { bg: 'var(--color-accent)', text: '★ Destacado' };
      default: return null;
    }
  };

  // Obtener el tag más importante para mostrar
  const primaryTag = product.tags.find(t => t === 'agotado') ||
    product.tags.find(t => t === 'oferta') ||
    product.tags.find(t => t === 'nuevo') ||
    product.tags.find(t => t === 'destacado');

  const tagStyle = primaryTag ? getTagStyle(primaryTag) : null;

  return (
    <div
      className="product-card group animate-fade-in"
      onClick={() => onViewDetail(product)}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '120%' }}>
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80' : product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Overlay en hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ backgroundColor: 'rgba(26,26,46,0.5)' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(product);
            }}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary)' }}
            title="Ver detalle"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>

        {/* Tag principal */}
        {tagStyle && (
          <div
            className="absolute top-3 left-3 tag"
            style={{ backgroundColor: tagStyle.bg, color: 'white' }}
          >
            {tagStyle.text}
          </div>
        )}

        {/* Stock bajo */}
        {product.available && product.stock > 0 && product.stock <= 5 && (
          <div
            className="absolute bottom-3 left-3 tag"
            style={{ backgroundColor: 'rgba(192,57,43,0.9)', color: 'white' }}
          >
            ¡Solo {product.stock} disponibles!
          </div>
        )}

        {/* Agotado overlay */}
        {(!product.available || product.stock === 0) && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          >
            <span
              className="px-4 py-2 text-sm font-bold uppercase tracking-wider rounded"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        {/* Categoría */}
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)' }}
        >
          {product.category}
        </span>

        {/* Nombre */}
        <h3
          className="text-base font-semibold mt-1 mb-2 line-clamp-2"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
          }}
        >
          {product.name}
        </h3>

        {/* Descripción breve */}
        <p
          className="text-xs mb-3 line-clamp-2"
          style={{ color: 'var(--color-gray-500)' }}
        >
          {product.description}
        </p>

        {/* Tallas disponibles (preview) */}
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3" onClick={(e) => e.stopPropagation()}>
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(selectedSize === size ? '' : size);
                }}
                className={`size-btn text-xs py-1 px-2 ${selectedSize === size ? 'selected' : ''}`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span
                className="text-xs flex items-center"
                style={{ color: 'var(--color-gray-400)' }}
              >
                +{product.sizes.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Precio */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`price-current ${product.originalPrice ? 'on-sale' : ''}`}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="price-original">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Botón agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={!product.available || product.stock === 0}
          className={`w-full py-2.5 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-2 ${
            isAdding ? 'scale-95' : ''
          }`}
          style={{
            backgroundColor: (!product.available || product.stock === 0)
              ? 'var(--color-gray-200)'
              : isAdding
              ? 'var(--color-accent)'
              : 'var(--color-primary)',
            color: (!product.available || product.stock === 0)
              ? 'var(--color-gray-400)'
              : 'white',
            cursor: (!product.available || product.stock === 0) ? 'not-allowed' : 'pointer',
          }}
        >
          {isAdding ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              ¡Agregado!
            </>
          ) : (!product.available || product.stock === 0) ? (
            'Agotado'
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Agregar al carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
}
