import React, { useEffect, useState } from 'react';
import { ChevronDown, Code, Terminal, Cpu } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#FAF7F0]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-64 h-64 bg-[#B4A4D6]/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B8BC4]/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-[#9B8BC4] font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
            {personalInfo.graduationYear}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] mb-6 font-mono">
            {personalInfo.name.split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {word}
                {index === 0 && <br className="md:hidden" />}
                {index === 0 && ' '}
              </span>
            ))}
          </h1>
          <h2 className="text-xl md:text-2xl text-[#1A1A1A]/70 mb-8 font-medium max-w-3xl mx-auto">
            {personalInfo.title}
          </h2>
          <p className="text-[#9B8BC4] font-mono text-base md:text-lg mb-12 max-w-2xl mx-auto italic">
            {personalInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#1A1A1A] text-[#FAF7F0] font-medium rounded-none hover:bg-[#9B8BC4] transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-medium rounded-none hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-[#9B8BC4]" size={32} />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
