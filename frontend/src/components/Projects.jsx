import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { projects } from '../data/mock';

const ProjectCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white border-2 border-[#1A1A1A] overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden bg-[#1A1A1A]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#9B8BC4]/0 group-hover:bg-[#9B8BC4]/20 transition-all duration-500" />
        </div>

        {/* Project Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2 font-mono">
                {project.title}
              </h3>
              <p className="text-[#9B8BC4] font-medium">{project.subtitle}</p>
            </div>
            <Sparkles className="text-[#9B8BC4] flex-shrink-0 ml-4" size={24} />
          </div>

          <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#FAF7F0] border border-[#9B8BC4]/30 text-[#1A1A1A] text-sm font-mono hover:bg-[#9B8BC4]/10 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {project.features.map((feature, idx) => (
              <li key={idx} className="text-[#1A1A1A]/70 text-sm flex items-start">
                <span className="text-[#9B8BC4] mr-2 flex-shrink-0">▹</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href={project.githubLink}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 font-medium"
            >
              <Github size={18} />
              Code
            </a>
            <a
              href={project.demoLink}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-[#FAF7F0] hover:bg-[#9B8BC4] transition-all duration-300 font-medium"
            >
              <ExternalLink size={18} />
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-[#FAF7F0] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-4 font-mono">
            Featured Projects
          </h2>
          <p className="text-[#1A1A1A]/70 text-lg max-w-2xl mx-auto">
            Building innovative solutions with modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Future Projects Placeholder */}
        <div className="mt-12 text-center">
          <p className="text-[#9B8BC4] font-mono italic">
            More exciting projects coming soon...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
