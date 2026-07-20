import React, { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode; // Añadimos soporte para iconos en móvil
}

// Iconos SVG minimalistas integrados para no depender de librerías externas
const navItems: NavItem[] = [
  { 
    label: 'Quién soy', 
    href: '#qsomos', 
    icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> 
  },
  { 
    label: 'Formación', 
    href: '#formacion', 
    icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg> 
  },
  { 
    label: 'Trabajos', 
    href: '#trabajos', 
    icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> 
  },
  { 
    label: 'Contacto', 
    href: '#contacto', 
    icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> 
  },
  { 
    label: 'Follow', 
    href: '#follow', 
    icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> 
  },
];

export const NavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  const updateIndicator = () => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  };

  useEffect(() => {
    // Un pequeño delay asegura que el DOM se haya calculado bien en móviles
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <>
      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 10px;
          z-index: 1000;
          box-sizing: border-box;
          pointer-events: none;
        }

        .navbar {
          position: relative;
          padding: 6px;
          background: rgba(15, 23, 42, 0.4); 
          border-radius: 60px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          pointer-events: auto;
          max-width: 95%;
        }

        .navbar ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          gap: 4px;
          width: 100%;
          justify-content: space-between;
        }

        .navbar ul li {
          position: relative;
          z-index: 2; 
          white-space: nowrap;
        }

        .navbar ul li a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .navbar ul li a .nav-icon {
          display: none; /* Oculto en PC */
        }

        .indicator {
          position: absolute;
          top: 0;
          bottom: 0; 
          border-radius: 30px;
          background: linear-gradient(135deg, #22d3ee, #0ea5e9);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
          z-index: 1;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); /* Efecto elástico premium */
        }

        /* --- MEJORAS MÓVIL ESPECTACULAR --- */
        @media (max-width: 640px) {
          .navbar-header {
            top: auto;
            bottom: 24px; /* Lo bajamos estilo "Dock" de iOS, es mucho más accesible con el pulgar */
            padding: 0 16px;
          }
          
          .navbar {
            width: 100%;
            padding: 6px 8px;
            border-radius: 30px; /* Redondeado proporcional */
          }

          .navbar ul {
            gap: 2px;
          }

          .navbar ul li {
            flex: 1; /* Distribuye el espacio equitativamente */
          }

          .navbar ul li a {
            padding: 12px 0; /* Mayor área de click vertical */
          }

          .navbar ul li a .nav-text {
            display: none; /* Ocultamos el texto largo */
          }

          .navbar ul li a .nav-icon {
            display: flex; /* Mostramos el icono */
          }
        }
      `}</style>

      <header className="navbar-header">
        <nav className="navbar">
          <ul>
            <div 
              className="indicator" 
              style={{
                width: `${indicatorStyle.width}px`,
                transform: `translateX(${indicatorStyle.left}px)`
              }}
            />

            {navItems.map((item, index) => (
              <li 
                key={index} 
                ref={(el) => { tabsRef.current[index] = el; }} 
                onClick={() => setActiveIndex(index)}
              >
                <a 
                  href={item.href}
                  style={{ color: activeIndex === index ? '#fff' : undefined }}
                >
                  {/* Texto para desktop */}
                  <span className="nav-text">{item.label}</span>
                  
                  {/* Icono para móvil */}
                  <span className="nav-icon">{item.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;