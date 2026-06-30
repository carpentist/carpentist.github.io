import { useScrollReveal } from '../hooks/useScrollReveal';
import CodeBackground from './CodeBackground';

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="bg-about relative overflow-hidden py-24 lg:py-32">
      <CodeBackground className="right-8 top-24 text-[#6C8AA3] lg:right-24">
        <span className="text-[#F3A07A]">@Service</span>{'\n'}
        <span className="text-[#F28A57]">public class</span> <span className="text-[#6C8AA3]">UserService</span> {'{'}{'\n'}{'\n'}
        {'  '}<span className="text-[#F28A57]">private final</span> <span className="text-[#6C8AA3]">UserRepository</span> <span className="text-[#A3A9B0]">repo</span>;{'\n'}
        {'  '}<span className="text-[#F28A57]">private final</span> <span className="text-[#6C8AA3]">CacheManager</span> <span className="text-[#A3A9B0]">cache</span>;{'\n'}{'\n'}
        {'  '}<span className="text-[#F28A57]">public</span> <span className="text-[#6C8AA3]">UserDTO</span> <span className="text-[#A3A9B0]">findById</span>(<span className="text-[#6C8AA3]">Long</span> <span className="text-[#A3A9B0]">id</span>) {'{'}{'\n'}
        {'    '}<span className="text-[#F28A57]">return</span> <span className="text-[#A3A9B0]">cache</span>.<span className="text-[#A3A9B0]">getOrLoad</span>(<span className="text-[#A3A9B0]">id</span>,{'\n'}
        {'      '}() -&gt; <span className="text-[#A3A9B0]">repo</span>.<span className="text-[#A3A9B0]">findById</span>(<span className="text-[#A3A9B0]">id</span>){'\n'}
        {'        '}.<span className="text-[#A3A9B0]">orElseThrow</span>(<span className="text-[#6C8AA3]">NotFoundException</span>::<span className="text-[#F28A57]">new</span>){'\n'}
        {'    '});{'\n'}
        {'  }\n'}
        {'}\n'}
      </CodeBackground>
      <div className="section-divider-accent mb-24 lg:mb-32" />

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <div className="mx-auto max-w-[1700px] px-8 lg:px-16">
          <div className="mb-16">
            <p className="terminal-prompt mb-3 font-mono text-xs tracking-[0.15em] text-zinc-600">
              cat about.md
            </p>
            <h2 className="text-3xl font-light tracking-tight text-zinc-100 lg:text-4xl">
              关于我
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-4 text-sm leading-relaxed text-zinc-500 lg:text-base">
              <p className="text-zinc-400">
                武汉理工大学电子信息专业硕士在读，2027 届毕业生。
              </p>
              <p>
                熟悉Spring、SpringMVC、MyBatis、SpringBoot、LangChain4j等主流框架的使用
              </p>
              <p>
                有高并发场景项目经验：消息队列异步削峰、多级缓存架构、
                分布式锁与事务一致性保障。代码简洁，关注底层原理。
              </p>
              <p>
                同时具备 AI 工程化能力，熟悉 LangChain4j 与 RAG 系统的实际落地。
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                ['Role', 'Java Backend Developer'],
                ['Education', 'WUT (211) · M.S. EE'],
                ['English', 'CET-6'],
                ['Status', 'Open to Opportunities'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-4">
                  <span className="w-20 shrink-0 text-zinc-700">{k}</span>
                  <span className="text-zinc-600">=</span>
                  <span className="text-zinc-400">{v}</span>
                  <span className="text-zinc-800">;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
