'use client';

// ============================================================
// FOOTER - Pie de página con información de contacto
// ============================================================

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" style={{ backgroundColor: 'var(--color-primary)' }}>
      {/* Sección de confianza */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="container-store py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: 'Compra Segura',
                desc: 'Coordinamos el pago directamente por WhatsApp. Sin intermediarios, sin complicaciones.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
                title: 'Envío a Todo el Perú',
                desc: 'Hacemos envíos a Lima y provincias. Coordinamos el método de entrega según tu ubicación.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                ),
                title: 'Calidad Garantizada',
                desc: 'Todos nuestros productos son de alta calidad. Tu satisfacción es nuestra prioridad.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(201,169,110,0.15)', color: 'var(--color-accent)' }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-white)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="container-store py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  M
                </span>
              </div>
              <div>
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-white)' }}
                >
                  MODAVIDA
                </span>
                <span
                  className="block text-xs tracking-widest uppercase"
                  style={{ color: 'var(--color-accent)', fontSize: '0.6rem', letterSpacing: '0.2em' }}
                >
                  Moda & Estilo
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Tu tienda de ropa online de confianza. Ofrecemos prendas de alta calidad con los mejores precios.
              Moda moderna y elegante para cada ocasión.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-3">
              {[
                {
                  name: 'WhatsApp',
                  href: 'https://wa.me/51932531871',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                  color: '#25D366',
                },
                {
                  name: 'Instagram',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                  color: '#E1306C',
                },
                {
                  name: 'Facebook',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  ),
                  color: '#1877F2',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                  title={social.name}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = social.color;
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/51932531871"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors group"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +51 932 531 871
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Lima, Perú
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Lun - Sáb: 9am - 8pm
              </div>
            </div>
          </div>

          {/* Métodos de pago */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Métodos de Pago
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Yape', icon: '💜' },
                { name: 'Plin', icon: '💙' },
                { name: 'Transferencia bancaria', icon: '🏦' },
                { name: 'Efectivo (contraentrega)', icon: '💵' },
                { name: 'BCP / Interbank', icon: '🏧' },
              ].map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <span>{method.icon}</span>
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              * Coordinar método de pago por WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* CTA WhatsApp */}
      <div
        className="border-t border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(37,211,102,0.08)' }}
      >
        <div className="container-store py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold" style={{ color: 'var(--color-white)' }}>
                ¿Tienes alguna pregunta?
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Escríbenos por WhatsApp y te respondemos al instante
              </p>
            </div>
            <a
              href="https://wa.me/51932531871?text=Hola!%20Quisiera%20más%20información%20sobre%20sus%20productos."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chatear por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-store py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © {currentYear} MODAVIDA. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Hecho con ❤️ en Lima, Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
