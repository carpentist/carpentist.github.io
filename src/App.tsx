import { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-[#0d1117]/90 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 py-5 lg:px-16">
        <a
          href="#"
          className="font-mono text-xs tracking-[0.2em] text-[#7B8FA1] transition-colors hover:text-accent"
        >
          PORTFOLIO
        </a>
        <div className="hidden items-center gap-10 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[0.15em] text-[#7B8FA1]/60 transition-colors hover:text-[#A3A9B0]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background layer */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dots" />

      {/* 3D particle field + wireframe geometries */}
      <ThreeBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
