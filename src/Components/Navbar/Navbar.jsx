import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-2xl py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-gradient font-extrabold text-2xl md:text-3xl cursor-pointer select-none glow">
          ArtVanta AI
        </div>

        {/* Mobile menu button */}
        <div
          className="md:hidden flex flex-col space-y-1 cursor-pointer group"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          tabIndex={0}
          role="button"
        >
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 w-full glass transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4'
        }`}>
          <ul className="flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="block px-6 py-3 text-white hover:text-pink-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;