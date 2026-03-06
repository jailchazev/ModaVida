import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

// ============================================================
// LAYOUT PRINCIPAL - SEO y configuración global
// ============================================================

export const metadata: Metadata = {
  title: "MODAVIDA - Tienda de Ropa Online | Moda & Estilo",
  description:
    "Descubre nuestra colección exclusiva de ropa moderna y elegante. Polos, camisas, pantalones, casacas, vestidos y más. Calidad premium, precios accesibles. Envíos a todo el Perú.",
  keywords:
    "tienda de ropa, moda, ropa online, polos, camisas, pantalones, casacas, vestidos, ropa deportiva, Lima, Perú",
  authors: [{ name: "MODAVIDA" }],
  creator: "MODAVIDA",
  publisher: "MODAVIDA",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://modavida.com",
    siteName: "MODAVIDA",
    title: "MODAVIDA - Tienda de Ropa Online",
    description:
      "Ropa moderna y elegante con envíos a todo el Perú. Calidad premium, precios accesibles.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "MODAVIDA - Tienda de Ropa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MODAVIDA - Tienda de Ropa Online",
    description: "Ropa moderna y elegante con envíos a todo el Perú.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Fuentes de Google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MODAVIDA" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
