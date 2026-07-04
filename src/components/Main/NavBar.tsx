import React, { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Quién soy', href: '#qsomos' },
  { label: 'Formación', href: '#formacion' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Follow', href: '#follow' },
];

export const NavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [activeIndex]);

  // Recalcular la posición si el usuario cambia el tamaño de la pantalla (responsive dinámico)
  useEffect(() => {
    const handleResize = () => {
      const activeTab = tabsRef.current[activeIndex];
      if (activeTab) {
        setIndicatorStyle({
          width: activeTab.offsetWidth,
          left: activeTab.offsetLeft,
          });
        }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  return (
    <>
      <style>{`
        .navbar-header {
          position: fixed;        /* Hace que se quede arriba fijamente */
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 10px;    /* Espaciado superior e inferior */
          z-index: 1000;         /* Asegura que siempre quede por encima del contenido del portafolio */
          box-sizing: border-box;
          pointer-events: none;  /* Evita que el contenedor invisible bloquee clicks en el fondo */
        }

        .navbar {
          position: relative;
          padding: 6px;          /* Espaciado interno compacto */
          background: rgba(15, 23, 42, 0.6); /* Fondo ultra oscuro translúcido */
          border-radius: 60px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          pointer-events: auto;  /* Reactiva los clicks dentro del menú */
          max-width: 95%;        /* Evita que toque los bordes en pantallas muy chicas */
          overflow-x: auto;      /* Permite scroll horizontal suave si la pantalla es extremadamente pequeña */
          scrollbar-width: none; /* Oculta la barra de scroll en Firefox */
        }

        /* Oculta la barra de scroll en Chrome/Safari */
        .navbar::-webkit-scrollbar {
          display: none;
        }

        .navbar ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          gap: 4px;
        }

        .navbar ul li {
          position: relative;
          z-index: 2; 
          white-space: nowrap;  /* Evita que los textos se rompan en dos líneas en móvil */
        }

        .navbar ul li a {
          display: inline-block;
          padding: 10px 20px;   /* Padding ligeramente más compacto y estilizado */
          color: #fff;
          text-decoration: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;      /* Tamaño de fuente más estándar y balanceado */
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .indicator {
          position: absolute;
          top: 0;
          bottom: 0; 
          border-radius: 30px;
          background: linear-gradient(135deg, #22d3ee, #0ea5e9);
          box-shadow: 0 0 15px rgba(14, 165, 233, 0.6);
          z-index: 1;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); /* Animación más orgánica */
        }

        /* --- AJUSTES RESPONSIVE (MÓVILES) --- */
        @media (max-width: 640px) {
          .navbar-header {
            padding: 12px 8px; /* Reduce márgenes en pantallas pequeñas */
          }
          
          .navbar ul li a {
            padding: 8px 14px;  /* Reduce el padding para que entren todos los botones */
            font-size: 13px;    /* Fuente sutilmente más pequeña en celulares */
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
                  style={{ color: activeIndex === index ? '#fff' : 'rgba(255,255,255,0.6)' }}
                >
                  {item.label}
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