import React, { useState, useRef, useEffect } from 'react';
import { navItems } from '@/model/data/Array.tsx/NavData';

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
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navItems.findIndex((item) => item.href === `#${entry.target.id}`);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    });

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
          display: none;
        }

        .indicator {
          position: absolute;
          top: 0;
          bottom: 0; 
          border-radius: 30px;
          background: linear-gradient(135deg, #22d3ee, #0ea5e9);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
          z-index: 1;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (max-width: 640px) {
          .navbar-header {
            top: auto;
            bottom: 24px;
            padding: 0 16px;
          }
          
          .navbar {
            width: 100%;
            padding: 6px 8px;
            border-radius: 30px;
          }

          .navbar ul {
            gap: 2px;
          }

          .navbar ul li {
            flex: 1;
          }

          .navbar ul li a {
            padding: 12px 0;
          }

          .navbar ul li a .nav-text {
            display: none;
          }

          .navbar ul li a .nav-icon {
            display: flex;
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
                  <span className="nav-text">{item.label}</span>
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