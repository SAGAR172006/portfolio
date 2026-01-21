import React from 'react';
import { Heart } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold font-mono mb-2 hover:text-[#9B8BC4] transition-colors duration-300"
            >
              {personalInfo.name}
            </button>
            <p className="text-[#FAF7F0]/70 text-sm">
              {personalInfo.title}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#FAF7F0]/70">Made with</span>
            <Heart className="text-[#9B8BC4] fill-[#9B8BC4]" size={16} />
            <span className="text-[#FAF7F0]/70">by {personalInfo.name.split(' ')[0]}</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[#FAF7F0]/70 text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#FAF7F0]/20 text-center">
          <p className="text-[#FAF7F0]/50 text-xs font-mono">
            Designed & Built with React • Tailwind CSS • Love for Code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
