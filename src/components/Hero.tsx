import HeroDecoration from './HeroDecoration';

const navBlocks = [
  { href: '#about', label: 'About', desc: '关于我', icon: '01' },
  { href: '#skills', label: 'Skills', desc: '技术栈', icon: '02' },
  { href: '#projects', label: 'Projects', desc: '项目', icon: '03' },
  { href: '#contact', label: 'Contact', desc: '联系我', icon: '04' },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      {/* Abstract geometric decoration */}
      <HeroDecoration />

      {/* Geometric side accent — left */}
      <div className="pointer-events-none absolute left-12 top-1/3 hidden lg:block">
        <div className="h-32 w-px bg-gradient-to-b from-transparent via-zinc-800/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-8 lg:px-16">
        {/* Eyebrow */}
        <p className="mb-2 font-mono text-xs tracking-[0.25em] text-zinc-600">
          JAVA BACKEND DEVELOPER
        </p>

        {/* Main heading */}
        <h1 className="mb-6 max-w-5xl text-5xl font-light tracking-tight text-zinc-100 lg:text-7xl">
          Hi, I am{' '}
          <span className="relative text-accent">
            潘红臣
            <span className="absolute -bottom-1 left-0 h-px w-full bg-accent/20" />
          </span>
        </h1>

        {/* Tagline */}
        <p className="mb-16 max-w-xl text-base leading-relaxed text-zinc-500 lg:text-lg">
          专注 Java 后端开发，日常开发注重数据可靠与系统拓展性。
          <br />
          同时具备 AI 工程化落地经验。
        </p>

        {/* Navigation blocks */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {navBlocks.map((b) => (
            <a
              key={b.href}
              href={b.href}
              className="card-elevated card-elevated-hover group flex items-center justify-between rounded-xl px-6 py-5"
            >
              <div>
                <h3 className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-zinc-200">
                  {b.label}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-600">{b.desc}</p>
              </div>
              <span className="font-mono text-xs text-zinc-800 transition-colors group-hover:text-zinc-600">
                {b.icon}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-800">SCROLL</span>
          <div className="h-6 w-px animate-pulse bg-gradient-to-b from-zinc-700 to-transparent" />
        </div>
      </div>
    </section>
  );
}
