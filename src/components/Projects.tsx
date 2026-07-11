import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';
import CodeBackground from './CodeBackground';
import RagArchitecture from './RagArchitecture';

export default function Projects() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="projects" className="bg-projects relative overflow-hidden py-24 lg:py-32">
      <CodeBackground className="right-8 top-16 text-[#5F7F9A] lg:right-16">
        <span className="text-[#F28A57]">public class</span> <span className="text-[#6C8AA3]">RAGPipeline</span> {'{'}{'\n'}{'\n'}
        {'  '}<span className="text-[#F28A57]">private final</span> <span className="text-[#6C8AA3]">Embedder</span> <span className="text-[#A3A9B0]">embedder</span>;{'\n'}
        {'  '}<span className="text-[#F28A57]">private final</span> <span className="text-[#6C8AA3]">Retriever</span> <span className="text-[#A3A9B0]">retriever</span>;{'\n'}
        {'  '}<span className="text-[#F28A57]">private final</span> <span className="text-[#6C8AA3]">Reranker</span> <span className="text-[#A3A9B0]">reranker</span>;{'\n'}{'\n'}
        {'  '}<span className="text-[#F28A57]">public</span> <span className="text-[#6C8AA3]">Response</span> <span className="text-[#A3A9B0]">query</span>(<span className="text-[#6C8AA3]">String</span> <span className="text-[#A3A9B0]">q</span>) {'{'}{'\n'}
        {'    '}<span className="text-[#F28A57]">var</span> <span className="text-[#A3A9B0]">embed</span> = <span className="text-[#A3A9B0]">embedder</span>.<span className="text-[#A3A9B0]">embed</span>(<span className="text-[#A3A9B0]">q</span>);{'\n'}
        {'    '}<span className="text-[#F28A57]">var</span> <span className="text-[#A3A9B0]">docs</span> = <span className="text-[#A3A9B0]">retriever</span>.<span className="text-[#A3A9B0]">search</span>(<span className="text-[#A3A9B0]">embed</span>);{'\n'}
        {'    '}<span className="text-[#F28A57]">var</span> <span className="text-[#A3A9B0]">ranked</span> = <span className="text-[#A3A9B0]">reranker</span>.<span className="text-[#A3A9B0]">rerank</span>(<span className="text-[#A3A9B0]">q</span>, <span className="text-[#A3A9B0]">docs</span>);{'\n'}
        {'    '}<span className="text-[#F28A57]">return</span> <span className="text-[#A3A9B0]">llm</span>.<span className="text-[#A3A9B0]">generate</span>(<span className="text-[#A3A9B0]">q</span>, <span className="text-[#A3A9B0]">ranked</span>);{'\n'}
        {'  '}{'\n'}
        {'}'}
      </CodeBackground>
      <div className="section-divider mb-24 lg:mb-32" />

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <div className="mx-auto max-w-[1700px] px-8 lg:px-16">
          <div className="mb-16">
            <p className="terminal-prompt mb-3 font-mono text-xs tracking-[0.15em] text-zinc-600">
              projects --featured
            </p>
            <h2 className="text-3xl font-light tracking-tight text-zinc-100 lg:text-4xl">
              GitHub 开源作品
            </h2>
          </div>

          <TiltCard maxTilt={4} className="card-elevated group rounded-2xl">
            {/* Content area */}
            <div className="p-8 lg:p-10">
              {/* Header */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <h3 className="text-2xl font-light tracking-tight text-zinc-100 lg:text-2xl">
                  Improved RAG Platform
                </h3>
                <a
                  href="https://github.com/carpentist/improved-rag-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-zinc-600 transition-colors hover:border-zinc-500 hover:text-zinc-400"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>

              {/* Description */}
              <p className="mb-8 max-w-3xl text-sm leading-relaxed text-zinc-500">
                Enterprise RAG Platform — 基于 LangChain4j + Milvus + 通义千问，从零构建的企业级检索增强生成平台。
                自主实现了意图路由、多模型熔断、分布式公平限流、对话记忆与摘要压缩等高级 RAG 能力。
              </p>

              {/* Architecture diagram */}
              <div className="mb-8">
                <RagArchitecture />
              </div>

              {/* Highlights */}
              <div className="mb-8 grid gap-2 sm:grid-cols-2">
                {[
                  'LLM 意图路由 — 自动打分定向检索数据源',
                  '多 Provider 路由 + 三段式断路器熔断',
                  'Redisson + Lua 分布式公平限流',
                  'Redis 热缓存 + PG 持久化对话记忆',
                  'DAG 文档摄取管道（6 节点）',
                  '多路召回 RRF 融合 + Reranker 精排',
                ].map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-zinc-950/50 px-4 py-2.5 text-sm text-zinc-500"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Java 21', 'Spring Boot 3.5', 'LangChain4j 1.1',
                  'Milvus 2.4', 'PostgreSQL 17', 'Redis',
                  'Redisson', 'DashScope Qwen', 'Apache Tika',
                ].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-md bg-zinc-900/80 px-3 py-1.5 font-mono text-[11px] text-zinc-600"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
