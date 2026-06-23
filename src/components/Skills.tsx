import { useScrollReveal } from '../hooks/useScrollReveal';

const categories = [
  {
    label: 'Backend Core',
    items: ['Java', 'Spring Boot', 'MyBatis', 'JVM', 'JUC'],
  },
  {
    label: 'Data & Messaging',
    items: ['MySQL', 'Redis', 'Kafka', 'RabbitMQ', 'Flink'],
  },
  {
    label: 'AI & LLM',
    items: ['LangChain4j', 'RAG', 'Ollama', 'Function Calling'],
  },
  {
    label: 'Dev & Tools',
    items: ['Linux', 'Git', 'Maven'],
  },
];

export default function Skills() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="section-divider mb-24 lg:mb-32" />

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <div className="mx-auto max-w-[1700px] px-8 lg:px-16">
          <div className="mb-16">
            <p className="terminal-prompt mb-3 font-mono text-xs tracking-[0.15em] text-zinc-600">
              techstack --list
            </p>
            <h2 className="text-3xl font-light tracking-tight text-zinc-100 lg:text-4xl">
              技术栈
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div key={cat.label} className="card-elevated card-elevated-hover rounded-xl p-5">
                <h3 className="mb-4 font-mono text-[11px] tracking-[0.12em] text-zinc-500">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-zinc-900/60 px-2.5 py-1.5 text-[11px] text-zinc-500 transition-all hover:bg-zinc-800/60 hover:text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
