import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { projects } from '../data/mock';
import { Badge } from '@/components/ui/badge';

const isVideo = (src) => src && src.toLowerCase().endsWith('.mp4');

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const project = projects.find((p) => p.slug === slug);

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger entrance animation
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [slug]);

  // Reset loaded state when slug changes
  useEffect(() => {
    setLoaded(false);
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0a0a0a] flex items-center justify-center text-[#1A1A1A] dark:text-white transition-colors duration-500">
        <div className="text-center">
          <h1 className="text-4xl font-black font-mono mb-4">404</h1>
          <p className="text-[#1A1A1A]/50 dark:text-white/50 mb-8">Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#9B8BC4] text-white font-mono font-bold text-sm hover:bg-[#B4A4D6] transition-colors duration-300 rounded-lg cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white transition-colors duration-500 relative overflow-hidden flex flex-col justify-between">
      
      {/* ── Top Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#1A1A1A]/10 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#1A1A1A]/60 dark:text-white/60 hover:text-[#1A1A1A] dark:hover:text-white transition-colors duration-200 group cursor-pointer select-none"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-mono text-sm">Home Page</span>
          </button>

          <div className="flex items-center gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A]/5 dark:bg-white/[0.06] border border-[#1A1A1A]/10 dark:border-white/10 text-[#1A1A1A]/80 dark:text-white/80 font-mono text-sm hover:bg-[#1A1A1A]/10 dark:hover:bg-white/10 hover:border-[#1A1A1A]/20 dark:hover:border-white/20 transition-all duration-200 rounded-full cursor-pointer select-none"
              >
                <Github size={15} />
                Source
                <ExternalLink size={12} className="opacity-50" />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── Main Two-Column Content ── */}
      <main 
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 md:pb-24 flex-grow w-full transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Details */}
          <div className="flex gap-6 flex-col">
            
            {/* Status Badge */}
            {project.status && (
              <div>
                <Badge variant="outline" className="border-[#9B8BC4] text-[#9B8BC4] dark:border-[#B4A4D6] dark:text-[#B4A4D6] uppercase tracking-widest text-[10px] font-mono font-semibold px-3 py-1 rounded-full">
                  {project.status}
                </Badge>
              </div>
            )}

            {/* Title & Subtitle */}
            <div className="flex gap-3 flex-col">
              <h1 className="text-3xl md:text-5xl tracking-tighter text-left font-regular leading-tight font-mono text-[#1A1A1A] dark:text-white">
                {project.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed tracking-tight text-[#1A1A1A]/60 dark:text-white/50 max-w-xl text-left">
                {project.subtitle}
              </p>
            </div>

            {/* About / Description */}
            <div className="text-left text-[#1A1A1A]/80 dark:text-white/70 text-sm md:text-base leading-relaxed">
              <p>{project.description}</p>
            </div>

            {/* Key Features (Checklist format) */}
            {project.features && project.features.length > 0 && (
              <div className="flex gap-4 items-start flex-col mt-2">
                <h3 className="text-xs font-mono text-[#9B8BC4] uppercase tracking-widest">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-4 w-full">
                  {project.features.map((feature, idx) => {
                    // Intelligently parse key features (title vs description)
                    let title = feature;
                    let desc = "";
                    const dividers = [":", "—", "-"];
                    for (const div of dividers) {
                      if (feature.includes(div)) {
                        const parts = feature.split(div);
                        title = parts[0].trim();
                        desc = parts.slice(1).join(div).trim();
                        break;
                      }
                    }

                    return (
                      <div key={idx} className="flex gap-4 items-start text-left">
                        <Check className="w-5 h-5 text-[#9B8BC4] dark:text-[#B4A4D6] flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white leading-snug">
                            {title}
                          </p>
                          {desc && (
                            <p className="text-xs text-[#1A1A1A]/65 dark:text-white/45 leading-relaxed">
                              {desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Experience & Learning */}
            {project.experience && (
              <div className="mt-2 text-left border-t border-[#1A1A1A]/10 dark:border-white/[0.06] pt-6">
                <h3 className="text-xs font-mono text-[#9B8BC4] uppercase tracking-widest mb-3">
                  Experience &amp; Learning
                </h3>
                <p className="text-sm text-[#1A1A1A]/70 dark:text-white/60 leading-relaxed">
                  {project.experience}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-col gap-3 mt-2">
              <h3 className="text-xs font-mono text-[#9B8BC4] uppercase tracking-widest">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#1A1A1A]/5 dark:bg-white/[0.04] border border-[#1A1A1A]/10 dark:border-white/[0.08] text-[#1A1A1A]/70 dark:text-white/70 text-xs font-mono rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Source Code */}
            {project.githubLink && (
              <div className="mt-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#9B8BC4] hover:bg-[#8A79B5] text-white font-mono font-bold text-sm transition-all duration-300 group rounded-lg cursor-pointer shadow-md shadow-[#9B8BC4]/10"
                >
                  <Github size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  View Source Code
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Premium Media Element */}
          <div className="flex flex-col items-center justify-center w-full lg:sticky lg:top-24">
            <div className="w-full bg-[#1A1A1A]/5 dark:bg-white/[0.02] border border-[#1A1A1A]/10 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl aspect-video relative group">
              {isVideo(project.image) ? (
                <video
                  src={project.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </main>

      {/* ── Project Navigation Footer ── */}
      <footer className="relative z-10 border-t border-[#1A1A1A]/10 dark:border-white/[0.06] bg-[#FAF7F0] dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 divide-x divide-[#1A1A1A]/10 dark:divide-white/[0.06]">
            
            {/* Previous */}
            <div className="py-10 pr-6 md:pr-12">
              {prevProject ? (
                <button
                  onClick={() => navigate(`/project/${prevProject.slug}`)}
                  className="group text-left w-full cursor-pointer select-none"
                >
                  <span className="text-[10px] font-mono text-[#1A1A1A]/40 dark:text-white/30 uppercase tracking-widest">
                    ← Previous
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-mono text-[#1A1A1A]/60 dark:text-white/60 group-hover:text-[#1A1A1A] dark:group-hover:text-white transition-colors duration-200 mt-1">
                    {prevProject.title}
                  </h3>
                  <p className="text-[#1A1A1A]/40 dark:text-white/30 text-sm mt-0.5 truncate">{prevProject.subtitle}</p>
                </button>
              ) : (
                <div className="text-[#1A1A1A]/20 dark:text-white/15 font-mono text-sm">No previous project</div>
              )}
            </div>

            {/* Next */}
            <div className="py-10 pl-6 md:pl-12 text-right">
              {nextProject ? (
                <button
                  onClick={() => navigate(`/project/${nextProject.slug}`)}
                  className="group text-right w-full cursor-pointer select-none"
                >
                  <span className="text-[10px] font-mono text-[#1A1A1A]/40 dark:text-white/30 uppercase tracking-widest">
                    Next →
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-mono text-[#1A1A1A]/60 dark:text-white/60 group-hover:text-[#1A1A1A] dark:group-hover:text-white transition-colors duration-200 mt-1 flex items-center justify-end gap-2">
                    {nextProject.title}
                    <ChevronRight size={18} className="opacity-40 group-hover:translate-x-1 transition-transform text-[#1A1A1A] dark:text-white" />
                  </h3>
                  <p className="text-[#1A1A1A]/40 dark:text-white/30 text-sm mt-0.5 truncate">{nextProject.subtitle}</p>
                </button>
              ) : (
                <div className="text-[#1A1A1A]/20 dark:text-white/15 font-mono text-sm">No next project</div>
              )}
            </div>

          </div>
        </div>
      </footer>

      {/* Background ambient glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#9B8BC4]/[0.05] dark:bg-[#9B8BC4]/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#9B8BC4]/[0.03] dark:bg-[#9B8BC4]/[0.015] rounded-full blur-3xl" />
      </div>

    </div>
  );
};

export default ProjectDetail;
