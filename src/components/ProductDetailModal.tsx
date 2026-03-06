'use client';

// ============================================================
// PRODUCT DETAIL MODAL - Vista detallada del producto
// ============================================================

import { useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : null;

  const handleAddToCart = () => {
    if (!product.available || product.stock === 0) return;

    if (!selectedSize && product.sizes.length > 0) {
      setError('Por favor selecciona una talla');
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      setError('Por favor selecciona un color');
      return;
    }

    setError('');
    setIsAdding(true);

    onAddToCart({
      product,
      quantity,
      selectedSize,
      selectedColor,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  const getTagLabel = (tag: string) => {
    switch (tag) {
      case 'nuevo': return { label: 'Nuevo', bg: 'var(--color-primary)' };
      case 'oferta': return { label: `${discount}% OFF`, bg: 'var(--color-error)' };
      case 'agotado': return { label: 'Agotado', bg: 'var(--color-gray-500)' };
      case 'destacado': return { label: '★ Destacado', bg: 'var(--color-accent)' };
      default: return null;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in"
          style={{
            backgroundColor: 'var(--color-white)',
            boxShadow: 'var(--shadow-xl)',
            pointerEvents: 'all',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: 'var(--color-gray-100)', color: 'var(--color-gray-700)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Galería de imágenes */}
            <div className="relative">
              {/* Imagen principal */}
              <div className="relative overflow-hidden" style={{ paddingBottom: '110%' }}>
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.tags.filter(t => t !== 'destacado').map((tag) => {
                    const tagInfo = getTagLabel(tag);
                    if (!tagInfo) return null;
                    return (
                      <span
                        key={tag}
                        className="tag"
                        style={{ backgroundColor: tagInfo.bg, color: 'white' }}
                      >
                        {tagInfo.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Miniaturas */}
              {product.images.length > 1 && (
                <div className="flex gap-2 p-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
                      style={{
                        border: selectedImage === idx
                          ? '2px solid var(--color-accent)'
                          : '2px solid transparent',
                        opacity: selectedImage === idx ? 1 : 0.6,
                      }}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="p-6 md:p-8 flex flex-col">
              {/* Categoría */}
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                {product.category}
              </span>

              {/* Nombre */}
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
              >
                {product.name}
              </h2>

              {/* Precio */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-2xl font-bold ${product.originalPrice ? 'text-red-600' : ''}`}
                  style={{ color: product.originalPrice ? 'var(--color-error)' : 'var(--color-primary)' }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="price-original text-base">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span
                      className="tag"
                      style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
                    >
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Descripción */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: 'var(--color-gray-600)' }}
              >
                {product.description}
              </p>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: product.available && product.stock > 0
                      ? product.stock <= 5 ? 'var(--color-warning)' : 'var(--color-success)'
                      : 'var(--color-error)',
                  }}
                />
                <span className="text-sm font-medium" style={{ color: 'var(--color-gray-700)' }}>
                  {!product.available || product.stock === 0
                    ? 'Agotado'
                    : product.stock <= 5
                    ? `¡Solo ${product.stock} disponibles!`
                    : `En stock (${product.stock} disponibles)`}
                </span>
              </div>

              {/* Selector de talla */}
              {product.sizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-gray-700)' }}>
                    Talla: <span style={{ color: 'var(--color-accent)' }}>{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setError('');
                        }}
                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selector de color */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-gray-700)' }}>
                    Color: <span style={{ color: 'var(--color-accent)' }}>{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setError('');
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          border: selectedColor === color
                            ? '2px solid var(--color-primary)'
                            : '1.5px solid var(--color-gray-200)',
                          backgroundColor: selectedColor === color
                            ? 'var(--color-primary)'
                            : 'var(--color-white)',
                          color: selectedColor === color ? 'white' : 'var(--color-gray-700)',
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cantidad */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-gray-700)' }}>
                  Cantidad
                </label>
                <div
                  className="inline-flex items-center rounded-lg overflow-hidden"
                  style={{ border: '1.5px solid var(--color-gray-200)' }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <span
                    className="w-12 text-center font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm mb-3 font-medium" style={{ color: 'var(--color-error)' }}>
                  ⚠️ {error}
                </p>
              )}

              {/* Subtotal */}
              <div
                className="flex items-center justify-between p-3 rounded-lg mb-5"
                style={{ backgroundColor: 'var(--color-gray-50)' }}
              >
                <span className="text-sm" style={{ color: 'var(--color-gray-600)' }}>
                  Subtotal ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  {formatPrice(product.price * quantity)}
                </span>
              </div>

              {/* Botón agregar */}
              <button
                onClick={handleAddToCart}
                disabled={!product.available || product.stock === 0}
                className="w-full py-4 text-base font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: (!product.available || product.stock === 0)
                    ? 'var(--color-gray-200)'
                    : isAdding
                    ? 'var(--color-accent)'
                    : 'var(--color-primary)',
                  color: (!product.available || product.stock === 0) ? 'var(--color-gray-400)' : 'white',
                  cursor: (!product.available || product.stock === 0) ? 'not-allowed' : 'pointer',
                  transform: isAdding ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                {isAdding ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    ¡Agregado al carrito!
                  </>
                ) : (!product.available || product.stock === 0) ? (
                  'Producto agotado'
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    Agregar al carrito
                  </>
                )}
              </button>

              {/* Consultar por WhatsApp */}
              <a
                href={`https://wa.me/51932531871?text=${encodeURIComponent(`Hola! Me interesa el producto: ${product.name} (${formatPrice(product.price)}). ¿Está disponible?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full py-3 text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'rgba(37,211,102,0.1)',
                  color: '#128C7E',
                  border: '1.5px solid rgba(37,211,102,0.3)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Consultar disponibilidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
