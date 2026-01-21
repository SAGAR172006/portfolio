import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contact } from '../data/mock';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '6930dec3-11f6-4b57-a2b0-89e07404d29f',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#FAF7F0] py-20 md:py-32 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#B4A4D6]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#9B8BC4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
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
                  className="flex items-center gap-4 p-4 bg-white border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 group hover:scale-105 hover:shadow-xl"
                >
                  <div className="p-2 bg-[#FAF7F0] border border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-all duration-300 group-hover:rotate-12">
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
                  className="flex items-center gap-4 p-4 bg-white border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 group hover:scale-105 hover:shadow-xl"
                >
                  <div className="p-2 bg-[#FAF7F0] border border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-all duration-300 group-hover:rotate-12">
                    <Linkedin className="text-[#1A1A1A] group-hover:text-[#FAF7F0] transition-colors duration-300" size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#9B8BC4] group-hover:text-[#FAF7F0]/70">LinkedIn</p>
                    <p className="font-medium">Connect on LinkedIn</p>
                  </div>
                </a>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF7F0] transition-all duration-300 group hover:scale-105 hover:shadow-xl"
                >
                  <div className="p-2 bg-[#FAF7F0] border border-[#9B8BC4] group-hover:bg-[#9B8BC4] transition-all duration-300 group-hover:rotate-12">
                    <Github className="text-[#1A1A1A] group-hover:text-[#FAF7F0] transition-colors duration-300" size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#9B8BC4] group-hover:text-[#FAF7F0]/70">GitHub</p>
                    <p className="font-medium">@{contact.github.split('/').pop()}</p>
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
                    className="w-full px-4 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:border-[#9B8BC4] transition-all duration-300 hover:border-[#9B8BC4]/50"
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
                    className="w-full px-4 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:border-[#9B8BC4] transition-all duration-300 hover:border-[#9B8BC4]/50"
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
                    className="w-full px-4 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] focus:outline-none focus:border-[#9B8BC4] transition-all duration-300 resize-none hover:border-[#9B8BC4]/50"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-green-100 border-2 border-green-500 text-green-700 animate-in fade-in slide-in-from-top">
                    <CheckCircle2 size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-100 border-2 border-red-500 text-red-700 animate-in fade-in slide-in-from-top">
                    <AlertCircle size={20} />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#FAF7F0] font-medium hover:bg-[#9B8BC4] transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={20} className={isSubmitting ? 'animate-bounce' : ''} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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