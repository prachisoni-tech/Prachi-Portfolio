import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Code } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-wrapper">
        <a href="#" className="nav-logo">
          <Code className="logo-icon" />
          <span>Prachi Soni</span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <a 
            href="/CV_Prachi_Soni_2026.pdf" 
            download="Prachi_Soni_Resume.pdf"
            className="btn btn-primary nav-btn"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="nav-menu-mobile">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link-mobile"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/CV_Prachi_Soni_2026.pdf" 
            download="Prachi_Soni_Resume.pdf"
            className="btn btn-primary nav-btn-mobile"
            onClick={() => setIsOpen(false)}
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      )}

      <style>{`
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 2rem;
          transition: var(--transition-smooth);
        }
        
        .nav-scrolled {
          padding: 0.85rem 2rem;
          background: rgba(10, 10, 14, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 30px var(--glass-shadow);
        }
        
        .nav-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          color: hsl(var(--text-primary));
        }

        .logo-icon {
          color: hsl(var(--accent-purple));
        }
        
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: hsl(var(--text-secondary));
          position: relative;
        }
        
        .nav-link:hover {
          color: hsl(var(--text-primary));
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(90deg, hsl(var(--accent-purple)), hsl(var(--accent-blue)));
          transition: var(--transition-fast);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-btn {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
        }
        
        .nav-mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: hsl(var(--text-primary));
          cursor: pointer;
        }
        
        .nav-menu-mobile {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(10, 10, 14, 0.98);
          border-bottom: 1px solid var(--glass-border);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
        }
        
        .nav-link-mobile {
          font-size: 1.1rem;
          font-weight: 600;
          color: hsl(var(--text-secondary));
        }
        
        .nav-link-mobile:hover {
          color: hsl(var(--text-primary));
          padding-left: 0.5rem;
        }
        
        .nav-btn-mobile {
          align-self: flex-start;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none;
          }
          .nav-mobile-toggle {
            display: block;
          }
          .nav-container {
            padding: 1rem 1.5rem;
          }
          .nav-scrolled {
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
    </nav>
  );
}
