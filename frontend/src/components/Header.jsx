import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#FAF7F0] dark:bg-[#1a1526]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Extreme top-left Profile Dropdown */}
      <div className="absolute left-[5px] top-1/2 -translate-y-1/2 z-50">
        <ProfileDropdown />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-[#1A1A1A] dark:text-[#B4A4D6] hover:text-[#9B8BC4] dark:hover:text-[#D4C4E6] transition-all duration-300 capitalize font-medium relative group cursor-pointer select-none"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9B8BC4] dark:bg-[#B4A4D6] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#1A1A1A] dark:text-[#B4A4D6] hover:text-[#9B8BC4] dark:hover:text-[#D4C4E6] transition-all duration-300 hover:rotate-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top duration-300">
            {['projects', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left text-[#1A1A1A] dark:text-[#B4A4D6] hover:text-[#9B8BC4] dark:hover:text-[#D4C4E6] transition-colors duration-300 capitalize font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;