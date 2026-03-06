# MODAVIDA - Tienda de Ropa Online

Una tienda de ropa online moderna, elegante y completamente funcional. Construida con Next.js 16, TypeScript y Tailwind CSS 4.

## 🚀 Características

- ✅ **Diseño profesional y elegante** - Colores neutros, tipografía premium
- ✅ **100% Responsive** - Optimizado para móvil, tablet y escritorio
- ✅ **PWA instalable** - Funciona como app nativa
- ✅ **Carrito de compras** - Con persistencia en localStorage
- ✅ **Integración WhatsApp** - Mensaje automático con el pedido
- ✅ **Panel administrador** - Gestión de productos con contraseña
- ✅ **Filtros avanzados** - Por categoría, talla, precio y disponibilidad
- ✅ **Modal de detalle** - Vista ampliada de cada producto
- ✅ **Botón flotante WhatsApp** - Contacto directo siempre visible
- ✅ **SEO optimizado** - Meta tags y Open Graph

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal con SEO
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales y variables CSS
├── components/
│   ├── Store.tsx           # Componente principal (estado global)
│   ├── Navbar.tsx          # Barra de navegación
│   ├── Hero.tsx            # Sección hero principal
│   ├── ProductList.tsx     # Lista de productos con filtros
│   ├── ProductCard.tsx     # Tarjeta de producto
│   ├── Filters.tsx         # Filtros y búsqueda
│   ├── Cart.tsx            # Carrito lateral
│   ├── ProductDetailModal.tsx  # Modal de detalle
│   ├── AdminPanel.tsx      # Panel administrador
│   ├── Footer.tsx          # Pie de página
│   └── PWARegister.tsx     # Registro del service worker
├── data/
│   └── products.json       # Productos de ejemplo
├── lib/
│   └── utils.ts            # Utilidades (WhatsApp, localStorage, etc.)
└── types/
    └── index.ts            # Tipos TypeScript
public/
├── manifest.json           # Configuración PWA
├── sw.js                   # Service Worker
└── icons/                  # Íconos de la app
```

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
bun install

# Verificar tipos
bun typecheck

# Verificar código
bun lint

# Compilar para producción
bun build
```

## 🌐 Despliegue en Render

### Opción 1: Web Service (Recomendado)

1. Conecta tu repositorio en [render.com](https://render.com)
2. Crea un nuevo **Web Service**
3. Configura:
   - **Build Command**: `bun install && bun build`
   - **Start Command**: `bun start`
   - **Environment**: Node
   - **Node Version**: 20+

### Opción 2: Static Site

1. Agrega `output: 'export'` en `next.config.ts`
2. En Render, crea un **Static Site**
3. Configura:
   - **Build Command**: `bun install && bun build`
   - **Publish Directory**: `out`

### Variables de Entorno (Render)

No se requieren variables de entorno para el funcionamiento básico.

## 📱 Panel Administrador

Accede al panel administrador desde el navbar (botón "Admin") o el menú móvil.

- **Contraseña por defecto**: `modavida2025`
- Permite agregar, editar y eliminar productos
- Los cambios se guardan en localStorage del navegador
- Para cambiar la contraseña, edita `ADMIN_PASSWORD` en `src/components/AdminPanel.tsx`

## 🛒 Flujo de Compra

1. Cliente navega el catálogo
2. Selecciona talla y color
3. Agrega al carrito
4. Hace clic en "Pagar ahora"
5. Se abre WhatsApp con el pedido completo
6. Coordina pago y entrega directamente

## 📞 Contacto WhatsApp

El número de WhatsApp configurado es: **+51 932 531 871**

Para cambiarlo, busca `51932531871` en el código y reemplázalo.

## 🎨 Personalización

### Cambiar nombre de la tienda
Busca `MODAVIDA` en los archivos y reemplaza con tu nombre.

### Cambiar colores
Edita las variables CSS en `src/app/globals.css`:
```css
:root {
  --color-primary: #1a1a2e;    /* Color principal */
  --color-accent: #c9a96e;     /* Color dorado */
}
```

### Agregar productos
1. Usa el Panel Administrador (recomendado)
2. O edita directamente `src/data/products.json`

## 📋 Tecnologías

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16.x | Framework React |
| React | 19.x | UI Library |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos |
| Bun | Latest | Package manager |

## 📄 Licencia

MIT - Libre para uso comercial y personal.
