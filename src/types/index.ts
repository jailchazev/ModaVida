// ============================================================
// TIPOS PRINCIPALES DE LA TIENDA
// ============================================================

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number | null;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  tags: ProductTag[];
  featured: boolean;
  available: boolean;
}

export type ProductTag = 'nuevo' | 'oferta' | 'agotado' | 'destacado';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Filters {
  search: string;
  category: string;
  size: string;
  minPrice: number;
  maxPrice: number;
  onlyAvailable: boolean;
}

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number | null;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  tags: ProductTag[];
  featured: boolean;
  available: boolean;
}
