'use client';

// ============================================================
// CART - Carrito de compras lateral
// ============================================================

import { CartItem } from '@/types';
import { formatPrice, calculateCartTotal, openWhatsApp } from '@/lib/utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const total = calculateCartTotal(cartItems);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    openWhatsApp(cartItems);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 overlay"
          onClick={onClose}
        />
      )}

      {/* Panel del carrito */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-350 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'var(--color-white)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{
            borderColor: 'var(--color-gray-100)',
            backgroundColor: 'var(--color-primary)',
          }}
        >
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <div>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Mi Carrito
              </h2>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            /* Carrito vacío */
            <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-gray-100)' }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-gray-300)' }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
              >
                Tu carrito está vacío
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-gray-500)' }}>
                Agrega productos de nuestro catálogo para comenzar tu pedido
              </p>
              <button onClick={onClose} className="btn-primary">
                Ver catálogo
              </button>
            </div>
          ) : (
            /* Lista de productos */
            <div className="px-4 py-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-3 p-3 rounded-xl animate-fade-in"
                  style={{ backgroundColor: 'var(--color-gray-50)' }}
                >
                  {/* Imagen */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-sm font-semibold mb-1 truncate"
                      style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                    >
                      {item.product.name}
                    </h4>

                    {/* Talla y color */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.selectedSize && (
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: 'var(--color-gray-200)', color: 'var(--color-gray-600)' }}
                        >
                          Talla: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: 'var(--color-gray-200)', color: 'var(--color-gray-600)' }}
                        >
                          {item.selectedColor}
                        </span>
                      )}
                    </div>

                    {/* Precio unitario */}
                    <p className="text-xs mb-2" style={{ color: 'var(--color-gray-500)' }}>
                      {formatPrice(item.product.price)} c/u
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: '1.5px solid var(--color-gray-200)' }}
                      >
                        <button
                          onClick={() => onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )}
                          className="w-8 h-8 flex items-center justify-center transition-colors"
                          style={{ color: 'var(--color-gray-600)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </button>
                        <span
                          className="w-8 text-center text-sm font-semibold"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )}
                          className="w-8 h-8 flex items-center justify-center transition-colors"
                          style={{ color: 'var(--color-gray-600)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </button>
                      </div>

                      {/* Subtotal y eliminar */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                          style={{ color: 'var(--color-error)', backgroundColor: 'rgba(192,57,43,0.1)' }}
                          title="Eliminar"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Limpiar carrito */}
              <button
                onClick={onClearCart}
                className="w-full text-xs font-medium py-2 transition-colors"
                style={{ color: 'var(--color-error)' }}
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>

        {/* Footer con total y checkout */}
        {cartItems.length > 0 && (
          <div
            className="px-6 py-5 border-t"
            style={{ borderColor: 'var(--color-gray-100)' }}
          >
            {/* Desglose */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm" style={{ color: 'var(--color-gray-600)' }}>
                <span>Subtotal ({itemCount} productos)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--color-gray-600)' }}>
                <span>Envío</span>
                <span style={{ color: 'var(--color-success)' }}>A coordinar</span>
              </div>
              <div
                className="flex justify-between text-lg font-bold pt-2 border-t"
                style={{ borderColor: 'var(--color-gray-100)', color: 'var(--color-primary)' }}
              >
                <span>Total</span>
                <span style={{ fontFamily: 'var(--font-heading)' }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Nota de pago */}
            <p
              className="text-xs text-center mb-4 px-2"
              style={{ color: 'var(--color-gray-500)' }}
            >
              💬 Al hacer clic en &quot;Pagar ahora&quot; serás redirigido a WhatsApp para coordinar el pago y la entrega
            </p>

            {/* Botón de pago */}
            <button
              onClick={handleCheckout}
              className="btn-whatsapp w-full text-base py-4"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pagar ahora por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
