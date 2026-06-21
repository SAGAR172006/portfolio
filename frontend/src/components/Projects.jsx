import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/mock';

const isVideo = (src) => src && src.toLowerCase().endsWith('.mp4');

// ─────────────────────────────────────────
// Individual Project Tile — visual only, name on hover
// ─────────────────────────────────────────
const ProjectTile = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer group rounded-sm flex-shrink-0"
      style={{
        width: 'clamp(320px, 42vw, 640px)',
        height: 'clamp(220px, 30vw, 420px)',
      }}
    >
      {/* Light mode translucent background */}
      <div className="absolute inset-0 bg-white/60 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-0 z-0" />

      {/* Media */}
      {isVideo(project.image) ? (
        <video
          src={project.image}
          autoPlay
          loop
          muted
          playsInline
          className="relative w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className="relative w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Status badge */}
      {project.status && (
        <div
          className="absolute top-4 right-4 z-20 transition-all duration-300"
          style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(-8px)' }}
        >
          <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-black/50 text-white/90 backdrop-blur-md border border-white/10 rounded-full">
            {project.status}
          </span>
        </div>
      )}

      {/* Hover overlay — project name + subtitle */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8 transition-all duration-500 ease-out"
        style={{
          background: isHovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 40%)',
        }}
      >
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white font-mono leading-tight mb-1">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm font-medium">
            {project.subtitle}
          </p>
          {/* Tech preview — first 3 tags */}
          <div className="flex gap-2 mt-3">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono text-white/50 border border-white/15 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono text-white/30 self-center">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subtle border */}
      <div className="absolute inset-0 border border-[#1A1A1A]/10 dark:border-white/[0.06] pointer-events-none z-20 transition-colors duration-300 group-hover:border-[#9B8BC4]/30 dark:group-hover:border-white/[0.12] rounded-sm" />
    </div>
  );
};


// ─────────────────────────────────────────
// Projects Section — Horizontal Scroller
// ─────────────────────────────────────────
const Projects = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [titleVisible, setTitleVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer for title animation
  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // Track scroll position for button states
  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(':first-child')?.offsetWidth || 500;
    const gap = 32; // gap-8 = 2rem = 32px
    el.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#FAF7F0] dark:bg-[#0a0a0a] py-16 md:py-24 overflow-hidden transition-colors duration-500"
    >
      {/* ── Header ── */}
      <div
        className={`relative z-10 px-6 md:px-12 mb-10 transition-all duration-700 ${
          titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="text-[#9B8BC4] dark:text-[#9B8BC4] font-mono text-[11px] tracking-[0.35em] uppercase mb-2">
          scroll → to explore
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] dark:text-white font-mono">
          Featured Projects
        </h2>
        <p className="text-[#1A1A1A]/45 dark:text-white/40 text-sm mt-2 max-w-md">
          Building innovative solutions with modern technologies
        </p>
      </div>

      {/* ── Horizontal Scroll Container ── */}
      <div className="relative">
        {/* Gradient overlays */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#FAF7F0] dark:from-[#0a0a0a] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute top-0 bottom-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#FAF7F0] dark:from-[#0a0a0a] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scrollable strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-6 md:px-12 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          {projects.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* ── Nav Buttons ── */}
      <div className="flex gap-3 px-6 md:px-12 mt-6 z-10 relative">
        <button
          aria-label="Scroll left"
          onClick={() => scroll('prev')}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 select-none ${
            canScrollLeft
              ? 'border-[#1A1A1A]/20 dark:border-white/25 text-[#1A1A1A]/60 dark:text-white/70 hover:bg-[#1A1A1A]/10 dark:hover:bg-white/10 hover:border-[#1A1A1A]/40 dark:hover:border-white/40 cursor-pointer'
              : 'border-[#1A1A1A]/10 dark:border-white/10 text-[#1A1A1A]/15 dark:text-white/15 cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5 14.0607L9.96966 13.5303L5.14644 8.7071C4.75592 8.31658 4.75592 7.68341 5.14644 7.29289L9.96966 2.46966L10.5 1.93933L11.5607 2.99999L11.0303 3.53032L6.56065 7.99999L11.0303 12.4697L11.5607 13L10.5 14.0607Z" />
          </svg>
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scroll('next')}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 select-none ${
            canScrollRight
              ? 'border-[#1A1A1A]/20 dark:border-white/25 text-[#1A1A1A]/60 dark:text-white/70 hover:bg-[#1A1A1A]/10 dark:hover:bg-white/10 hover:border-[#1A1A1A]/40 dark:hover:border-white/40 cursor-pointer'
              : 'border-[#1A1A1A]/10 dark:border-white/10 text-[#1A1A1A]/15 dark:text-white/15 cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z" />
          </svg>
        </button>

        {/* Project counter */}
        <span className="font-mono text-xs text-[#1A1A1A]/30 dark:text-white/30 self-center ml-2">
          {projects.length} projects
        </span>
      </div>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B8BC4]/[0.03] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Projects;
