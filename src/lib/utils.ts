// ============================================================
// UTILIDADES GENERALES
// ============================================================

import { CartItem } from '@/types';

/**
 * Formatea un precio en soles peruanos
 */
export function formatPrice(price: number): string {
  return `S/ ${price.toFixed(2)}`;
}

/**
 * Calcula el porcentaje de descuento
 */
export function calculateDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Genera el mensaje de WhatsApp con el carrito
 */
export function generateWhatsAppMessage(cartItems: CartItem[]): string {
  const lines = cartItems.map(item => {
    const sizeInfo = item.selectedSize ? ` (Talla: ${item.selectedSize})` : '';
    const colorInfo = item.selectedColor ? ` (Color: ${item.selectedColor})` : '';
    return `• ${item.product.name}${sizeInfo}${colorInfo} x${item.quantity} = ${formatPrice(item.product.price * item.quantity)}`;
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const message = `Hola! 👋 Quiero confirmar mi pedido:

${lines.join('\n')}

💰 *Total: ${formatPrice(total)}*

Quisiera coordinar método de pago, entrega y verificación del pago. ¡Gracias! 🛍️`;

  return encodeURIComponent(message);
}

/**
 * Abre WhatsApp con el mensaje del carrito
 */
export function openWhatsApp(cartItems: CartItem[]): void {
  const phoneNumber = '51932531871';
  const message = generateWhatsAppMessage(cartItems);
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, '_blank');
}

/**
 * Guarda el carrito en localStorage
 */
export function saveCartToStorage(cartItems: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('moda_cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

/**
 * Carga el carrito desde localStorage
 */
export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('moda_cart');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
}

/**
 * Guarda productos personalizados en localStorage
 */
export function saveProductsToStorage(products: unknown[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('moda_products', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

/**
 * Carga productos personalizados desde localStorage
 */
export function loadProductsFromStorage(): unknown[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('moda_products');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading products:', error);
    return null;
  }
}

/**
 * Genera un ID único
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Calcula el total del carrito
 */
export function calculateCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

/**
 * Calcula la cantidad total de items en el carrito
 */
export function calculateCartCount(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}
