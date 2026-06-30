import TiltCard from './TiltCard';
import HeroDecoration from './HeroDecoration';
import CodeBackground from './CodeBackground';

const navBlocks = [
  {
    href: '#about', label: 'About', desc: '关于我', icon: '01',
    hoverBg: 'hover:bg-[#1D252E]', hoverBorder: 'hover:border-[#F28A57]/20',
    hoverText: 'group-hover:text-[#F3A07A]', hoverDesc: 'group-hover:text-[#F6B18C]',
    hoverIcon: 'group-hover:text-[#F28A57]', dotColor: 'bg-[#F28A57]',
  },
  {
    href: '#skills', label: 'Skills', desc: '技术栈', icon: '02',
    hoverBg: 'hover:bg-[#1D252E]', hoverBorder: 'hover:border-[#5F7F9A]/30',
    hoverText: 'group-hover:text-[#6C8AA3]', hoverDesc: 'group-hover:text-[#7B8FA1]',
    hoverIcon: 'group-hover:text-[#5F7F9A]', dotColor: 'bg-[#5F7F9A]',
  },
  {
    href: '#projects', label: 'Projects', desc: '项目', icon: '03',
    hoverBg: 'hover:bg-[#1D252E]', hoverBorder: 'hover:border-[#F28A57]/20',
    hoverText: 'group-hover:text-[#F3A07A]', hoverDesc: 'group-hover:text-[#F6B18C]',
    hoverIcon: 'group-hover:text-[#F28A57]', dotColor: 'bg-[#F28A57]',
  },
  {
    href: '#contact', label: 'Contact', desc: '联系我', icon: '04',
    hoverBg: 'hover:bg-[#1D252E]', hoverBorder: 'hover:border-[#5F7F9A]/30',
    hoverText: 'group-hover:text-[#6C8AA3]', hoverDesc: 'group-hover:text-[#7B8FA1]',
    hoverIcon: 'group-hover:text-[#5F7F9A]', dotColor: 'bg-[#5F7F9A]',
  },
];

export default function Hero() {
  return (
    <section className="bg-hero relative flex min-h-screen flex-col justify-center overflow-hidden">
      <CodeBackground className="right-8 top-1/4 text-[#5F7F9A] lg:right-24">
        <span className="text-[#F3A07A]">@SpringBootApplication</span>{'\n'}
        <span className="text-[#F28A57]">public class</span> <span className="text-[#6C8AA3]">PortfolioApplication</span> {'{'}{'\n'}{'\n'}
        {'  '}<span className="text-[#F28A57]">public static void</span> <span className="text-[#A3A9B0]">main</span>(<span className="text-[#6C8AA3]">String</span>[] <span className="text-[#A3A9B0]">args</span>) {'{'}{'\n'}
        {'    '}<span className="text-[#6C8AA3]">SpringApplication</span>.<span className="text-[#A3A9B0]">run</span>({'\n'}
        {'      '}<span className="text-[#6C8AA3]">PortfolioApplication</span>.<span className="text-[#F28A57]">class</span>, <span className="text-[#A3A9B0]">args</span>{'\n'}
        {'    '});{'\n'}
        {'  '}{'\n'}{'\n'}
        {'  '}<span className="text-[#F3A07A]">@Bean</span>{'\n'}
        {'  '}<span className="text-[#F28A57]">public</span> <span className="text-[#6C8AA3]">CommandLineRunner</span> <span className="text-[#A3A9B0]">init</span>() {'{'}{'\n'}
        {'    '}<span className="text-[#F28A57]">return</span> <span className="text-[#A3A9B0]">args</span> -&gt; <span className="text-[#A3A9B0]">log</span>.<span className="text-[#A3A9B0]">info</span>(<span className="text-[#7B8FA1]">"System ready."</span>);{'\n'}
        {'  '}{'\n'}
        {'}'}
      </CodeBackground>
      <HeroDecoration />

      <div className="pointer-events-none absolute left-12 top-1/3 hidden lg:block">
        <div className="h-32 w-px bg-gradient-to-b from-transparent via-zinc-800/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-8 lg:px-16">
        <p className="mb-2 font-mono text-xs tracking-[0.25em] text-zinc-600">
          JAVA BACKEND DEVELOPER
        </p>

        <h1 className="mb-6 max-w-5xl text-5xl font-light tracking-tight text-zinc-100 lg:text-7xl">
          Hi, I am{' '}
          <span className="relative text-accent">
            潘红臣
            <span className="absolute -bottom-1 left-0 h-px w-full bg-accent/20" />
          </span>
        </h1>

        <p className="mb-12 max-w-xl text-base leading-relaxed text-zinc-500 lg:text-lg">
          专注 Java 后端开发，日常开发注重数据可靠与系统拓展性。
          <br />
          同时具备 AI 工程化落地经验。
        </p>

        {/* Colorful navigation blocks */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {navBlocks.map((b) => (
            <TiltCard
              key={b.href}
              as="a"
              href={b.href}
              maxTilt={8}
              className={`card-elevated group relative flex items-center justify-between rounded-xl px-7 py-6 transition-all duration-500 border ${b.hoverBorder} ${b.hoverBg}`}
            >
              {/* Colored dot — visible on hover */}
              <span className={`absolute right-4 top-4 h-2 w-2 rounded-full ${b.dotColor} opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150`} />

              <div>
                <h3 className={`text-base font-medium text-zinc-300 transition-all duration-300 ${b.hoverText}`}>
                  {b.label}
                </h3>
                <p className={`mt-1 text-sm text-zinc-600 transition-all duration-300 ${b.hoverDesc}`}>
                  {b.desc}
                </p>
              </div>
              <span className={`font-mono text-sm text-zinc-800 transition-all duration-300 group-hover:scale-110 ${b.hoverIcon}`}>
                {b.icon}
              </span>
            </TiltCard>
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
