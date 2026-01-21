import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-24 right-6 z-50 p-4 bg-[#9B8BC4] hover:bg-[#B4A4D6] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          size={24}
        />
        <Moon 
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          size={24}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;