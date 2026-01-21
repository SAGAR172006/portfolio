import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send, Heart } from 'lucide-react';
import { contact, personalInfo } from '../data/mock';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for reaching out! This is a demo form.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen bg-[#FAF7F0] py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div
          ref={sectionRef}
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-4 font-mono">
              Let's Connect
            </h2>
            <p className="text-[#1A1A1A]/70 text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-mono">
                  Get In Touch
                </h3>
                <p className="text-[#1A1A1A]/70 leading-relaxed mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-4 bg-white border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 group"
                >
                  <div className="p-2 bg-[#FAF7F0] border border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-colors duration-300">
                    <Mail className="text-[#1A1A1A] group-hover:text-[#FAF7F0] transition-colors duration-300" size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#9B8BC4] group-hover:text-[#FAF7F0]/70">Email</p>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 group"
                >
                  <div className="p-2 bg-[#FAF7F0] border border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-colors duration-300">
                    <Linkedin className="text-[#1A1A1A] group-hover:text-[#FAF7F0] transition-colors duration-300" size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#9B8BC4] group-hover:text-[#FAF7F0]/70">LinkedIn</p>
                    <p className="font-medium">Connect on LinkedIn</p>
                  </div>
                </a>

                <a
                  href={`https://github.com/${contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 group"
                >
                  <div className="p-2 bg-[#FAF7F0] border border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-colors duration-300">
                    <Github className="text-[#1A1A1A] group-hover:text-[#FAF7F0] transition-colors duration-300" size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#9B8BC4] group-hover:text-[#FAF7F0]/70">GitHub</p>
                    <p className="font-medium">@{contact.github}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#1A1A1A] font-medium mb-2 font-mono">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:border-[#9B8BC4] transition-colors duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#1A1A1A] font-medium mb-2 font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:border-[#9B8BC4] transition-colors duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#1A1A1A] font-medium mb-2 font-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="6"
                    className="w-full px-4 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:border-[#9B8BC4] transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#FAF7F0] font-medium hover:bg-[#9B8BC4] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
