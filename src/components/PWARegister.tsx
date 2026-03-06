'use client';

// ============================================================
// PWA REGISTER - Registra el service worker
// ============================================================

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registrado:', registration.scope);
          })
          .catch((error) => {
            console.log('[PWA] Error al registrar Service Worker:', error);
          });
      });
    }
  }, []);

  return null;
}
