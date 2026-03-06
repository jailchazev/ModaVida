'use client';

// ============================================================
// ADMIN PANEL - Panel de administración de productos
// Protegido por contraseña, guarda en localStorage
// ============================================================

import { useState, useEffect } from 'react';
import { Product, ProductTag } from '@/types';
import { generateId, saveProductsToStorage } from '@/lib/utils';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

const ADMIN_PASSWORD = '$h3nL0ng.247530';

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: '',
  description: '',
  price: 0,
  originalPrice: null,
  sizes: [],
  colors: [],
  stock: 0,
  images: [''],
  tags: [],
  featured: false,
  available: true,
};

const CATEGORIES = ['Polos', 'Camisas', 'Pantalones', 'Casacas', 'Vestidos', 'Ropa Deportiva', 'Conjuntos', 'Accesorios'];
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '26', '28', '30', '32', '34', '36'];
const ALL_TAGS: ProductTag[] = ['nuevo', 'oferta', 'destacado'];

export default function AdminPanel({ isOpen, onClose, products, onProductsChange }: AdminPanelProps) {
  // Verificar si ya está autenticado en esta sesión (lazy init para evitar setState en useEffect)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_auth') === 'true';
    }
    return false;
  });
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    if (!formData.category) errors.category = 'La categoría es requerida';
    if (!formData.description.trim()) errors.description = 'La descripción es requerida';
    if (formData.price <= 0) errors.price = 'El precio debe ser mayor a 0';
    if (formData.stock < 0) errors.stock = 'El stock no puede ser negativo';
    if (!formData.images[0]?.trim()) errors.image = 'Al menos una imagen es requerida';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    if (!validateForm()) return;

    const computedTags: ProductTag[] = formData.stock === 0
      ? [...formData.tags.filter(t => t !== 'agotado'), 'agotado' as ProductTag]
      : formData.tags.filter(t => t !== 'agotado');

    const newProduct: Product = {
      ...formData,
      id: generateId(),
      available: formData.stock > 0,
      tags: computedTags,
    };

    const updated = [...products, newProduct];
    onProductsChange(updated);
    saveProductsToStorage(updated);
    setFormData(emptyProduct);
    setActiveTab('list');
    showSuccess('✅ Producto agregado exitosamente');
  };

  const handleEditProduct = () => {
    if (!editingProduct || !validateForm()) return;

    const computedTags: ProductTag[] = formData.stock === 0
      ? [...formData.tags.filter(t => t !== 'agotado'), 'agotado' as ProductTag]
      : formData.tags.filter(t => t !== 'agotado');

    const updated: Product[] = products.map(p =>
      p.id === editingProduct.id
        ? {
            ...formData,
            id: editingProduct.id,
            available: formData.stock > 0,
            tags: computedTags,
          }
        : p
    );
    onProductsChange(updated);
    saveProductsToStorage(updated);
    setEditingProduct(null);
    setActiveTab('list');
    showSuccess('✅ Producto actualizado exitosamente');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    onProductsChange(updated);
    saveProductsToStorage(updated);
    setDeleteConfirm(null);
    showSuccess('🗑️ Producto eliminado');
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      sizes: [...product.sizes],
      colors: [...product.colors],
      stock: product.stock,
      images: [...product.images],
      tags: [...product.tags.filter(t => t !== 'agotado')],
      featured: product.featured,
      available: product.available,
    });
    setFormErrors({});
    setActiveTab('edit');
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleTag = (tag: ProductTag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData(prev => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    setFormData(prev => ({ ...prev, colors: [...prev.colors, ''] }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index: number) => {
    if (formData.images.length <= 1) return;
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const resetProducts = () => {
    if (confirm('¿Estás seguro? Esto restaurará los productos originales y eliminará todos los cambios.')) {
      localStorage.removeItem('moda_products');
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 overlay" onClick={onClose} />

      {/* Panel */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col animate-scale-in"
          style={{
            backgroundColor: 'var(--color-white)',
            boxShadow: 'var(--shadow-xl)',
            pointerEvents: 'all',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Panel Administrador
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
                >
                  Cerrar sesión
                </button>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto">
            {!isAuthenticated ? (
              /* Login */
              <div className="flex flex-col items-center justify-center p-8 min-h-64">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-gray-100)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent)' }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                  Acceso Administrador
                </h3>
                <p className="text-sm mb-6 text-center" style={{ color: 'var(--color-gray-500)' }}>
                  Ingresa la contraseña para gestionar los productos
                </p>
                <div className="w-full max-w-sm">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="input-store mb-3"
                  />
                  {passwordError && (
                    <p className="text-sm mb-3" style={{ color: 'var(--color-error)' }}>{passwordError}</p>
                  )}
                  <button onClick={handleLogin} className="btn-primary w-full">
                    Ingresar
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color: 'var(--color-gray-400)' }}>
                    
                  </p>
                </div>
              </div>
            ) : (
              /* Panel principal */
              <div>
                {/* Mensaje de éxito */}
                {successMessage && (
                  <div
                    className="mx-6 mt-4 p-3 rounded-lg text-sm font-medium animate-fade-in"
                    style={{ backgroundColor: 'rgba(45,122,79,0.1)', color: 'var(--color-success)', border: '1px solid rgba(45,122,79,0.2)' }}
                  >
                    {successMessage}
                  </div>
                )}

                {/* Tabs */}
                <div className="flex border-b px-6 pt-4" style={{ borderColor: 'var(--color-gray-100)' }}>
                  {[
                    { id: 'list', label: `Productos (${products.length})` },
                    { id: 'add', label: '+ Agregar' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as 'list' | 'add');
                        if (tab.id === 'add') {
                          setFormData(emptyProduct);
                          setFormErrors({});
                        }
                      }}
                      className="px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors mr-2"
                      style={{
                        borderColor: activeTab === tab.id ? 'var(--color-accent)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-gray-500)',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                  {activeTab === 'edit' && (
                    <button
                      className="px-4 py-2.5 text-sm font-semibold border-b-2"
                      style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                    >
                      Editando
                    </button>
                  )}
                </div>

                {/* Lista de productos */}
                {activeTab === 'list' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>
                        {products.length} productos en el catálogo
                      </p>
                      <button
                        onClick={resetProducts}
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{ backgroundColor: 'var(--color-gray-100)', color: 'var(--color-gray-600)' }}
                      >
                        Restaurar originales
                      </button>
                    </div>

                    <div className="space-y-3">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 rounded-xl"
                          style={{ backgroundColor: 'var(--color-gray-50)' }}
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--color-primary)' }}>
                              {product.name}
                            </h4>
                            <p className="text-xs" style={{ color: 'var(--color-gray-500)' }}>
                              {product.category} · S/ {product.price} · Stock: {product.stock}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {product.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="text-xs px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: tag === 'nuevo' ? 'var(--color-primary)' :
                                      tag === 'oferta' ? 'var(--color-error)' :
                                      tag === 'agotado' ? 'var(--color-gray-400)' : 'var(--color-accent)',
                                    color: 'white',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => startEdit(product)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                              style={{ backgroundColor: 'rgba(201,169,110,0.15)', color: 'var(--color-accent)' }}
                              title="Editar"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            {deleteConfirm === product.id ? (
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-xs px-2 py-1 rounded font-medium"
                                  style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
                                >
                                  Sí
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="text-xs px-2 py-1 rounded font-medium"
                                  style={{ backgroundColor: 'var(--color-gray-200)', color: 'var(--color-gray-700)' }}
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(product.id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                style={{ backgroundColor: 'rgba(192,57,43,0.1)', color: 'var(--color-error)' }}
                                title="Eliminar"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"/>
                                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulario agregar/editar */}
                {(activeTab === 'add' || activeTab === 'edit') && (
                  <div className="p-6">
                    <h3 className="text-base font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
                      {activeTab === 'add' ? 'Agregar nuevo producto' : `Editando: ${editingProduct?.name}`}
                    </h3>

                    <div className="space-y-4">
                      {/* Nombre */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-600)' }}>
                          Nombre del producto *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="input-store"
                          placeholder="Ej: Polo Clásico Premium"
                        />
                        {formErrors.name && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{formErrors.name}</p>}
                      </div>

                      {/* Categoría */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-600)' }}>
                          Categoría *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="select-store"
                        >
                          <option value="">Seleccionar categoría</option>
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {formErrors.category && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{formErrors.category}</p>}
                      </div>

                      {/* Descripción */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-600)' }}>
                          Descripción *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          className="input-store resize-none"
                          rows={3}
                          placeholder="Descripción detallada del producto..."
                        />
                        {formErrors.description && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{formErrors.description}</p>}
                      </div>

                      {/* Precio y precio original */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-600)' }}>
                            Precio (S/) *
                          </label>
                          <input
                            type="number"
                            value={formData.price || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                            className="input-store"
                            placeholder="0.00"
                            min="0"
                            step="0.10"
                          />
                          {formErrors.price && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{formErrors.price}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-600)' }}>
                            Precio original (opcional)
                          </label>
                          <input
                            type="number"
                            value={formData.originalPrice || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value ? Number(e.target.value) : null }))}
                            className="input-store"
                            placeholder="0.00"
                            min="0"
                            step="0.10"
                          />
                        </div>
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-600)' }}>
                          Stock disponible *
                        </label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                          className="input-store"
                          placeholder="0"
                          min="0"
                        />
                        {formErrors.stock && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{formErrors.stock}</p>}
                      </div>

                      {/* Tallas */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                          Tallas disponibles
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {ALL_SIZES.map(size => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => toggleSize(size)}
                              className="size-btn"
                              style={{
                                backgroundColor: formData.sizes.includes(size) ? 'var(--color-primary)' : 'var(--color-white)',
                                color: formData.sizes.includes(size) ? 'white' : 'var(--color-gray-700)',
                                borderColor: formData.sizes.includes(size) ? 'var(--color-primary)' : 'var(--color-gray-200)',
                              }}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Colores */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                          Colores disponibles
                        </label>
                        <div className="space-y-2">
                          {formData.colors.map((color, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                type="text"
                                value={color}
                                onChange={(e) => updateColor(idx, e.target.value)}
                                className="input-store flex-1"
                                placeholder="Ej: Negro, Blanco, Azul marino"
                              />
                              <button
                                type="button"
                                onClick={() => removeColor(idx)}
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: 'rgba(192,57,43,0.1)', color: 'var(--color-error)' }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18"/>
                                  <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addColor}
                            className="text-sm font-medium flex items-center gap-1"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            + Agregar color
                          </button>
                        </div>
                      </div>

                      {/* Imágenes */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                          URLs de imágenes *
                        </label>
                        <div className="space-y-2">
                          {formData.images.map((img, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                type="url"
                                value={img}
                                onChange={(e) => updateImage(idx, e.target.value)}
                                className="input-store flex-1"
                                placeholder="https://ejemplo.com/imagen.jpg"
                              />
                              {formData.images.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: 'rgba(192,57,43,0.1)', color: 'var(--color-error)' }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addImage}
                            className="text-sm font-medium flex items-center gap-1"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            + Agregar imagen
                          </button>
                        </div>
                        {formErrors.image && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{formErrors.image}</p>}
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-600)' }}>
                          Etiquetas
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {ALL_TAGS.map(tag => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all"
                              style={{
                                backgroundColor: formData.tags.includes(tag)
                                  ? tag === 'nuevo' ? 'var(--color-primary)' :
                                    tag === 'oferta' ? 'var(--color-error)' : 'var(--color-accent)'
                                  : 'var(--color-gray-100)',
                                color: formData.tags.includes(tag) ? 'white' : 'var(--color-gray-600)',
                              }}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Destacado */}
                      <div className="flex items-center gap-3">
                        <div
                          className="relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer"
                          style={{ backgroundColor: formData.featured ? 'var(--color-accent)' : 'var(--color-gray-200)' }}
                          onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                        >
                          <div
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                            style={{ transform: formData.featured ? 'translateX(22px)' : 'translateX(2px)' }}
                          />
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--color-gray-700)' }}>
                          Producto destacado
                        </span>
                      </div>

                      {/* Botones */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={activeTab === 'add' ? handleAddProduct : handleEditProduct}
                          className="btn-primary flex-1"
                        >
                          {activeTab === 'add' ? 'Agregar producto' : 'Guardar cambios'}
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('list');
                            setFormData(emptyProduct);
                            setFormErrors({});
                          }}
                          className="btn-secondary"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
