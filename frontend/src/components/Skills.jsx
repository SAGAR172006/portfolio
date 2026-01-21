import React, { useEffect, useRef, useState } from 'react';
import { Code2, Wrench, BookOpen } from 'lucide-react';
import { skills } from '../data/mock';

const SkillCategory = ({ title, items, icon: Icon, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="bg-white border-2 border-[#1A1A1A] p-6 md:p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-[#9B8BC4]/0 group-hover:bg-[#9B8BC4]/5 transition-all duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#FAF7F0] border-2 border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Icon className="text-[#1A1A1A] group-hover:text-[#FAF7F0] transition-colors duration-300" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] font-mono group-hover:text-[#9B8BC4] transition-colors duration-300">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {items.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-[#FAF7F0] border border-[#9B8BC4]/30 text-[#1A1A1A] font-medium hover:bg-[#9B8BC4] hover:text-[#FAF7F0] hover:border-[#9B8BC4] transition-all duration-300 cursor-default hover:scale-110 hover:-rotate-2"
                style={{
                  animation: isVisible ? `fadeIn 0.5s ease-out ${idx * 0.1}s both` : 'none'
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
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = titleRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const skillCategories = [
    { title: 'Languages', items: skills.languages, icon: Code2 },
    { title: 'Frameworks & Libraries', items: skills.frameworks, icon: Wrench },
    { title: 'Tools & Platforms', items: skills.tools, icon: Wrench },
    { title: 'Core Concepts', items: skills.concepts, icon: BookOpen }
  ];

  return (
    <section id="skills" className="min-h-screen bg-[#1A1A1A] py-20 md:py-32 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#9B8BC4 1px, transparent 1px), linear-gradient(90deg, #9B8BC4 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#FAF7F0] mb-4 font-mono">
            Technical Skills
          </h2>
          <p className="text-[#FAF7F0]/70 text-lg max-w-2xl mx-auto">
            Constantly evolving and learning new technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              items={category.items}
              icon={category.icon}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;