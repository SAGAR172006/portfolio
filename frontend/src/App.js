import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <CustomCursor />
        <FluidBackground />
        <Header />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
