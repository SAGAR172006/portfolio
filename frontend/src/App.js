import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import FluidBackground from './components/FluidBackground';
import ClickSpark from './components/ClickSpark';
import ProjectDetail from './components/ProjectDetail';
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

// Home page — all sections in a single scroll
const HomePage = () => (
  <>
    <ClickSpark />
    <FluidBackground />
    <Header />
    <Hero />
    <Projects />
    <Skills />
    <Contact />
    <Footer />
    <ThemeToggle />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <SpeedInsights />
          <Analytics />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
