import React, { useEffect, useRef, useState } from 'react';
import { Code2, Wrench, BookOpen, Layers } from 'lucide-react';
import { skills } from '../data/mock';

const ICONS = [Code2, Wrench, Layers, BookOpen];

const SkillCategory = ({ title, items, icon: Icon, index, isVisible }) => {
  return (
    <div
      className="transform transition-all"
      style={{
        transitionDuration: '700ms',
        transitionDelay: `${index * 150}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <div className="bg-white dark:bg-[#221d2e] border-2 border-[#1A1A1A] dark:border-[#9B8BC4] p-6 md:p-8 hover:shadow-2xl dark:hover:shadow-[#9B8BC4]/20 transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden h-full">
        {/* Hover background wash */}
        <div className="absolute inset-0 bg-[#9B8BC4]/0 group-hover:bg-[#9B8BC4]/5 dark:group-hover:bg-[#B4A4D6]/5 transition-all duration-500" />

        <div className="relative z-10">
          {/* Icon + title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#FAF7F0] dark:bg-[#1a1526] border-2 border-[#9B8BC4] dark:border-[#B4A4D6] group-hover:bg-[#9B8BC4] dark:group-hover:bg-[#B4A4D6] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 flex-shrink-0">
              <Icon
                className="text-[#1A1A1A] dark:text-[#B4A4D6] group-hover:text-[#FAF7F0] dark:group-hover:text-[#1a1526] transition-colors duration-300"
                size={22}
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] dark:text-[#E4D4F6] font-mono group-hover:text-[#9B8BC4] dark:group-hover:text-[#B4A4D6] transition-colors duration-300">
              {title}
            </h3>
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2.5">
            {items.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-[#FAF7F0] dark:bg-[#1a1526] border border-[#9B8BC4]/30 dark:border-[#B4A4D6]/30 text-[#1A1A1A] dark:text-[#B4A4D6] font-medium text-sm hover:bg-[#9B8BC4] dark:hover:bg-[#B4A4D6] hover:text-[#FAF7F0] dark:hover:text-[#1a1526] hover:border-[#9B8BC4] dark:hover:border-[#B4A4D6] transition-all duration-300 cursor-default hover:scale-110 hover:-rotate-1"
                style={{
                  animation: isVisible ? `skillFadeIn 0.4s ease-out ${idx * 60 + index * 150}ms both` : 'none',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress from 0 when section bottom at viewport bottom, to 1 when top at viewport top
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillCategories = [
    { title: 'Languages', items: skills.languages, icon: ICONS[0] },
    { title: 'Frameworks & Libraries', items: skills.frameworks, icon: ICONS[1] },
    { title: 'Tools & Platforms', items: skills.tools, icon: ICONS[2] },
    { title: 'Core Concepts', items: skills.concepts, icon: ICONS[3] },
  ];

  // Parallax for background grid
  const gridTranslate = scrollProgress * 50;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen bg-[#1A1A1A] dark:bg-[#0f0c16] transition-colors duration-500 py-20 md:py-32 relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#9B8BC4 1px, transparent 1px), linear-gradient(90deg, #9B8BC4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `translateY(${gridTranslate}px)`,
        }}
      />

      {/* Glowing accent blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#9B8BC4]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B4A4D6]/08 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div
          className="text-center mb-16 transform transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-[#9B8BC4]/50" />
            <span className="text-[#9B8BC4] dark:text-[#B4A4D6] font-mono text-xs tracking-widest uppercase">
              my toolkit
            </span>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-[#9B8BC4]/50" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#FAF7F0] dark:text-[#E4D4F6] mb-4 font-mono">
            Technical Skills
          </h2>
          <p className="text-[#FAF7F0]/50 dark:text-[#B4A4D6]/50 text-lg max-w-xl mx-auto">
            Constantly evolving and learning new technologies
          </p>
        </div>

        {/* Skill cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              items={category.items}
              icon={category.icon}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes skillFadeIn {
          from { opacity: 0; transform: scale(0.85) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Skills;