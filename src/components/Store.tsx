'use client';

// ============================================================
// STORE - Componente principal de la tienda
// Maneja el estado global: carrito, modales, productos
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '@/types';
import { saveCartToStorage, loadCartFromStorage, loadProductsFromStorage } from '@/lib/utils';
import defaultProducts from '@/data/products.json';

import Navbar from './Navbar';
import Hero from './Hero';
import ProductList from './ProductList';
import Cart from './Cart';
import ProductDetailModal from './ProductDetailModal';
import AdminPanel from './AdminPanel';
import Footer from './Footer';

export default function Store() {
  // Lazy initialization para cargar desde localStorage sin useEffect
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = loadProductsFromStorage();
    if (savedProducts && Array.isArray(savedProducts) && savedProducts.length > 0) {
      return savedProducts as Product[];
    }
    return defaultProducts as Product[];
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return loadCartFromStorage();
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Mostrar toast
  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Agregar al carrito
  const handleAddToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === item.product.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );

      if (existingIndex >= 0) {
        // Actualizar cantidad si ya existe
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        showToast(`✅ ${item.product.name} actualizado en el carrito`);
        return updated;
      } else {
        // Agregar nuevo item
        showToast(`🛍️ ${item.product.name} agregado al carrito`);
        return [...prev, item];
      }
    });
  }, [showToast]);

  // Eliminar item del carrito
  const handleRemoveItem = useCallback((productId: string, size: string, color: string) => {
    setCartItems(prev =>
      prev.filter(item =>
        !(item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color)
      )
    );
  }, []);

  // Actualizar cantidad
  const handleUpdateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size, color);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  }, [handleRemoveItem]);

  // Vaciar carrito
  const handleClearCart = useCallback(() => {
    setCartItems([]);
    showToast('🗑️ Carrito vaciado');
  }, [showToast]);

  // Ver detalle del producto
  const handleViewDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
  }, []);

  // Cerrar modal de detalle
  const handleCloseDetail = useCallback(() => {
    setSelectedProduct(null);
    document.body.style.overflow = '';
  }, []);

  // Abrir carrito
  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Cerrar carrito
  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Abrir admin
  const handleAdminOpen = useCallback(() => {
    setIsAdminOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Cerrar admin
  const handleAdminClose = useCallback(() => {
    setIsAdminOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Scroll al catálogo
  const handleCatalogClick = useCallback(() => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-off-white)' }}>
      {/* Navbar */}
      <Navbar
        cartItems={cartItems}
        onCartOpen={handleCartOpen}
        onAdminOpen={handleAdminOpen}
      />

      {/* Hero */}
      <Hero onCatalogClick={handleCatalogClick} />

      {/* Lista de productos */}
      {products.length > 0 && (
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
          onViewDetail={handleViewDetail}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Carrito lateral */}
      <Cart
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Modal de detalle de producto - key para resetear estado al cambiar producto */}
      <ProductDetailModal
        key={selectedProduct?.id || 'no-product'}
        product={selectedProduct}
        onClose={handleCloseDetail}
        onAddToCart={(item) => {
          handleAddToCart(item);
          handleCloseDetail();
          handleCartOpen();
        }}
      />

      {/* Panel de administración */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleAdminClose}
        products={products}
        onProductsChange={setProducts}
      />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/51932531871?text=Hola!%20Quisiera%20más%20información%20sobre%20sus%20productos."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Chatear por WhatsApp"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Toast notification */}
      {toast && (
        <div className="toast animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
