import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
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
          ? 'border-b border-border bg-[#030305]/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 py-5 lg:px-16">
        <a
          href="#"
          className="font-mono text-xs tracking-[0.2em] text-zinc-600 transition-colors hover:text-zinc-400"
        >
          PORTFOLIO
        </a>
        <div className="hidden items-center gap-10 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[0.15em] text-zinc-600 transition-colors hover:text-zinc-300"
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
    <div className="relative min-h-screen bg-base">
      {/* Background depth layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Layer 1: vignette */}
        <div className="absolute inset-0 bg-vignette" />
        {/* Layer 2: scanlines */}
        <div className="absolute inset-0 bg-scanlines" />
        {/* Layer 3: dots */}
        <div className="absolute inset-0 bg-dots" />

        {/* Layer 4: ambient orbs — varied colors for visual richness */}
        <div className="glow-orb -top-80 left-[10%] h-[700px] w-[700px] bg-cyan-500/3" />
        <div className="glow-orb top-[40%] -left-40 h-[500px] w-[500px] bg-indigo-500/2" />
        <div className="glow-orb top-[70%] -right-32 h-[400px] w-[400px] bg-blue-500/2" />
        <div className="glow-orb top-[20%] right-[20%] h-[300px] w-[300px] bg-violet-500/2" />

        {/* Layer 5: subtle gradient accent lines */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" style={{ left: '15%' }} />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/3 to-transparent" style={{ right: '20%' }} />
      </div>

      {/* Layer 6: particle network */}
      <ParticleBackground />

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
