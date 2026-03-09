import React, { useEffect, useRef, useState } from 'react';
import { Github, Sparkles } from 'lucide-react';
import { projects } from '../data/mock';

const isVideo = (src) => src && src.toLowerCase().endsWith('.mp4');

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      style={{ width: 'clamp(320px, calc(50% - 1rem), 560px)', flexShrink: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="bg-white dark:bg-[#221d2e] border-2 border-[#1A1A1A] dark:border-[#9B8BC4] overflow-hidden group hover:shadow-2xl dark:hover:shadow-[#9B8BC4]/20 transition-all duration-500 hover:-translate-y-3 relative h-full">
        {/* Spotlight effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-10 transition-opacity duration-300"
            style={{ background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, #9B8BC4, transparent)` }}
          />
        )}

        {/* Media */}
        <div className="relative h-64 overflow-hidden bg-[#1A1A1A] dark:bg-[#0a0810]">
          {isVideo(project.image) ? (
            <video
              src={project.image}
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              crossOrigin="anonymous"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
          )}
          <div className="absolute inset-0 bg-[#9B8BC4]/0 group-hover:bg-[#9B8BC4]/20 dark:group-hover:bg-[#B4A4D6]/20 transition-all duration-500" />
        </div>

        {/* Project Content */}
        <div className="p-6 md:p-8 relative z-20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] dark:text-[#E4D4F6] font-mono group-hover:text-[#9B8BC4] dark:group-hover:text-[#B4A4D6] transition-colors duration-300">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="px-3 py-1 text-xs font-mono bg-[#9B8BC4]/20 dark:bg-[#B4A4D6]/20 text-[#9B8BC4] dark:text-[#B4A4D6] border border-[#9B8BC4]/30 dark:border-[#B4A4D6]/30 rounded-full">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-[#9B8BC4] dark:text-[#B4A4D6] font-medium">{project.subtitle}</p>
            </div>
            <Sparkles className="text-[#9B8BC4] dark:text-[#B4A4D6] flex-shrink-0 ml-4 group-hover:rotate-180 transition-transform duration-500" size={24} />
          </div>

          <p className="text-[#1A1A1A]/70 dark:text-[#B4A4D6]/70 mb-6 leading-relaxed">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#FAF7F0] dark:bg-[#1a1526] border border-[#9B8BC4]/30 dark:border-[#B4A4D6]/30 text-[#1A1A1A] dark:text-[#B4A4D6] text-sm font-mono hover:bg-[#9B8BC4] dark:hover:bg-[#B4A4D6] hover:text-[#FAF7F0] dark:hover:text-[#1a1526] transition-all duration-300 hover:scale-110 hover:-rotate-2 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {project.features.map((feature, idx) => (
              <li key={idx} className="text-[#1A1A1A]/70 dark:text-[#B4A4D6]/70 text-sm flex items-start group/item hover:text-[#1A1A1A] dark:hover:text-[#B4A4D6] transition-colors duration-300">
                <span className="text-[#9B8BC4] dark:text-[#B4A4D6] mr-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300">▹</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* GitHub Button */}
          <div className="flex gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] dark:bg-[#9B8BC4] text-[#FAF7F0] dark:text-[#1a1526] hover:bg-[#9B8BC4] dark:hover:bg-[#B4A4D6] transition-all duration-300 font-medium hover:scale-105 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[#9B8BC4]/30"
            >
              <Github size={20} />
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DRAG_SENSITIVITY = 1.5;

const Projects = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    const currentRef = titleRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const onMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * DRAG_SENSITIVITY;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section id="projects" className="min-h-screen bg-[#FAF7F0] dark:bg-[#1a1526] transition-colors duration-500 py-20 md:py-32 relative overflow-hidden">
      <style>{`.projects-scroll::-webkit-scrollbar { display: none; }`}</style>

      {/* Animated background shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#B4A4D6]/5 dark:bg-[#B4A4D6]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#9B8BC4]/5 dark:bg-[#9B8BC4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-4 px-6 transform transition-all duration-1000 ${titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] dark:text-[#E4D4F6] mb-4 font-mono">
            Featured Projects
          </h2>
          <p className="text-[#1A1A1A]/70 dark:text-[#B4A4D6]/70 text-lg max-w-2xl mx-auto mb-2">
            Building innovative solutions with modern technologies
          </p>
          <p className="text-[#9B8BC4] dark:text-[#B4A4D6] font-mono text-sm italic animate-pulse">
            ← drag to explore →
          </p>
        </div>

        <div
          ref={scrollRef}
          className="projects-scroll"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          style={{
            display: 'flex',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            cursor: 'grab',
            gap: '2rem',
            padding: '1.5rem 2rem 2.5rem 2rem',
            userSelect: 'none',
            alignItems: 'stretch',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
