interface Module {
  title: string;
  icon: string;
  desc: string;
  wide?: boolean;
  badge?: string;
  classes?: string[];
}

interface FlowNode {
  label: string;
  detail: string;
  color?: string;
}

const LAYERS: {
  id: string;
  label: string;
  color: string;
  headerBg: string;
  headerText: string;
  borderColor: string;
  modules: Module[];
}[] = [
  {
    id: 'frontend',
    label: 'Frontend Layer — 用户界面',
    color: 'pink',
    headerBg: 'bg-pink-400/8',
    headerText: 'text-pink-400',
    borderColor: 'border-pink-400/20',
    modules: [
      {
        title: 'Single Page Application',
        icon: '🖥',
        desc: '纯 HTML5 + CSS3 + JavaScript，无框架依赖，Spring Boot 静态资源托管。SSE 流式响应解析，AbortController 中断控制。响应式设计适配移动端。',
        classes: ['index.html'],
        wide: true,
      },
    ],
  },
  {
    id: 'api',
    label: 'API Layer — REST Controllers',
    color: 'blue',
    headerBg: 'bg-blue-400/8',
    headerText: 'text-blue-400',
    borderColor: 'border-blue-400/20',
    modules: [
      {
        title: 'RagController',
        icon: '📡',
        desc: '问答入口，SSE 流式端点。限流器包裹，conversationId 路由。',
        classes: ['POST /api/rag/chat', 'POST /api/rag/ask', 'GET /api/rag/documents', 'GET /api/rag/conversations'],
      },
      {
        title: 'IngestionController',
        icon: '📤',
        desc: '文档上传入口。Multipart 文件接收，策略参数。',
        classes: ['POST /api/rag/ingest/{strategy}'],
      },
    ],
  },
  {
    id: 'service',
    label: 'Service Layer — 业务编排',
    color: 'purple',
    headerBg: 'bg-purple-400/8',
    headerText: 'text-purple-400',
    borderColor: 'border-purple-400/20',
    modules: [
      {
        title: 'RagServer',
        icon: '🧠',
        desc: '中央编排器。组装完整对话上下文：加载历史 + 意图路由检索 + Prompt 拼装 → LLM 调用 → 追加助手回答。支持同步 ask() 和流式 streamAsk() 双模式。',
        badge: '核心',
        wide: true,
      },
      {
        title: 'ConversationMemoryService',
        icon: '💾',
        desc: 'Redis 热缓存 + PG 持久化双写。LLM 摘要压缩，分布式锁防并发。',
        classes: ['append()', 'loadHistory()', 'compressIfNeeded()'],
      },
      {
        title: 'FairRateLimiter',
        icon: '⏱',
        desc: 'Redisson + Lua 分布式公平限流。RSortedSet FIFO 队列 + RPermitExpirableSemaphore + RTopic Pub/Sub 唤醒。',
        classes: ['acquire()', 'tryAcquireIfReady()', 'executeClaimLua()'],
      },
    ],
  },
  {
    id: 'retrieval',
    label: 'Retrieval Layer — 检索 + 路由 + 熔断',
    color: 'amber',
    headerBg: 'bg-amber-400/8',
    headerText: 'text-amber-400',
    borderColor: 'border-amber-400/20',
    modules: [
      {
        title: 'ScoredIntentRouter',
        icon: '🎯',
        desc: '仿 Ragent DefaultIntentClassifier。LLM 打分每个数据源 → 0.35 阈值过滤 → Top-3 截断 → 定向检索。兜底广播保证可用性。',
        badge: '核心',
        wide: true,
        classes: ['route(Query)', 'classify()', 'parseAndFilter()', 'IntentScore'],
      },
      {
        title: 'RoutingChatModel',
        icon: '🔄',
        desc: '多 Provider 优先级路由 + 自动 Fallback。实现 LangChain4j ChatModel 接口。',
        classes: ['chat(ChatRequest)', 'ModelEntry'],
      },
      {
        title: 'ModelHealthStore',
        icon: '🛡',
        desc: '三段式断路器：CLOSED → OPEN → HALF_OPEN。ConcurrentHashMap.compute() 保证线程安全。',
        classes: ['allowCall()', 'markSuccess()', 'markFailure()'],
      },
      {
        title: 'RrfReRankAggregator',
        icon: '📊',
        desc: '多路召回 RRF 融合 + DashScope Reranker 精排。ReciprocalRankFuser k=60。',
      },
      {
        title: 'LLMJsonParser',
        icon: '📝',
        desc: 'LLM JSON 多层容错解析。stripMarkdown + array/wrapped fallback + 空兜底。',
      },
    ],
  },
  {
    id: 'ingestion',
    label: 'Ingestion Layer — 文档摄取管道',
    color: 'emerald',
    headerBg: 'bg-emerald-400/8',
    headerText: 'text-emerald-400',
    borderColor: 'border-emerald-400/20',
    modules: [
      {
        title: 'PipelineEngine',
        icon: '🏗',
        desc: 'DAG 执行引擎。节点注册 + 顺序执行 + 失败中断 + 日志记录。仿 Ragent IngestionEngine。',
        badge: '核心',
        wide: true,
        classes: ['execute(Pipeline, Context)', 'IngestionNode', 'NodeLog'],
      },
      {
        title: 'FetcherNode',
        icon: '📄',
        desc: 'Apache Tika 文档加载。自动 MIME 检测。',
        classes: ['FileSystemDocumentLoader'],
      },
      {
        title: 'ChunkerNode',
        icon: '✂️',
        desc: '3 策略：Recursive / Paragraph / Sentence。DocChunker + ChunkStrategy。',
      },
      {
        title: 'EnhancerNode',
        icon: '✨',
        desc: 'LLM 文档增强。生成示例问题（用于快捷提问），可扩展 CONTEXT_ENHANCE。',
      },
      {
        title: 'EnricherNode',
        icon: '🏷',
        desc: '分片元数据富化。file_name / source / chunk_index / total_chunks。',
      },
      {
        title: 'IndexerNode',
        icon: '📥',
        desc: '批量 Embedding + Milvus 写入。10 条一批避免 API 限流。',
      },
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure Layer — 存储与中间件',
    color: 'slate',
    headerBg: 'bg-slate-400/8',
    headerText: 'text-slate-400',
    borderColor: 'border-slate-400/20',
    modules: [
      {
        title: 'Milvus 2.4',
        icon: '🗃',
        desc: '向量数据库。HNSW 索引 + COSINE 相似度。3 Collection：kb_tech_docs / kb_faq / knowledge_base。',
        classes: ['MilvusServiceClient', 'MilvusEmbeddingStore'],
      },
      {
        title: 'PostgreSQL 17',
        icon: '🐘',
        desc: '关系数据库。t_conversation_message / t_document_upload。雪花 ID 主键。',
        classes: ['MyBatis-Plus 3.5', 'HikariCP'],
      },
      {
        title: 'Redis（阿里云）',
        icon: '🔴',
        desc: 'Redisson 客户端。分布式锁 / 信号量 / Pub/Sub / Lua 原子脚本。',
        classes: ['RList', 'RLock', 'RSemaphore', 'RTopic', 'RScript'],
      },
      {
        title: 'LLM Providers',
        icon: '🤖',
        desc: 'DashScope (Qwen) via OpenAI 兼容 API。ChatModel + StreamingChatModel + EmbeddingModel + JSON Mode。',
        classes: ['OpenAiChatModel', 'OpenAiStreamingChatModel', 'OpenAiEmbeddingModel'],
      },
    ],
  },
];

const RAG_FLOW = [
  { label: '用户输入', detail: 'POST /api/rag/chat', color: 'border-pink-400/30' },
  { label: 'FairRateLimiter', detail: 'Redis ZSET 排队', color: 'border-purple-400/30' },
  { label: 'loadHistory', detail: 'Redis → PG 回退', color: 'border-purple-400/30' },
  { label: 'ScoredIntentRouter', detail: 'LLM 打分 + 阈值过滤', color: 'border-amber-400/30' },
  { label: 'Milvus Search', detail: '向量检索 + RRF 融合', color: 'border-blue-400/30' },
  { label: 'Reranker', detail: 'DashScope qwen3-rerank', color: 'border-blue-400/30' },
  { label: 'RoutingChatModel', detail: '多 Provider + 熔断', color: 'border-amber-400/30' },
  { label: 'SSE 流式输出', detail: '逐字推送到前端', color: 'border-emerald-400/30' },
  { label: 'append + 摘要', detail: '写 PG + Redis', color: 'border-purple-400/30' },
];

const INGEST_FLOW: FlowNode[] = [
  { label: 'Fetcher', detail: 'Tika 加载' },
  { label: 'Enhancer', detail: 'LLM 示例问题' },
  { label: 'Chunker', detail: '3 策略分块' },
  { label: 'Enricher', detail: '元数据富化' },
  { label: 'Indexer', detail: 'Embedding + 写入' },
];

const TECH_STACK = [
  'Java 21', 'Spring Boot 3.5', 'LangChain4j 1.1',
  'MyBatis-Plus 3.5', 'Redisson 3.40', 'Milvus 2.4',
  'PostgreSQL 17', 'Redis', 'DashScope Qwen',
  'Apache Tika', 'Jackson', 'OkHttp',
];

const LEGEND = [
  { color: 'bg-emerald-400', label: '摄取管道' },
  { color: 'bg-purple-400', label: '业务服务' },
  { color: 'bg-amber-400', label: '检索引擎' },
  { color: 'bg-blue-400', label: 'LLM / Embedding' },
  { color: 'bg-pink-400', label: '前端 / API' },
  { color: 'bg-slate-400', label: '基础设施' },
];

function FlowChart({ flow, colorClass = 'border-emerald-400/30' }: { flow: FlowNode[]; colorClass?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-0">
      {flow.map((node, i) => (
        <span key={node.label} className="flex items-center gap-0">
          <span
            className={`inline-block rounded-lg border ${node.color || colorClass} bg-[#0d1117]/80 px-3 py-2 text-center`}
          >
            <span className="block text-xs font-semibold text-zinc-300">{node.label}</span>
            <span className="block text-[10px] text-zinc-600">{node.detail}</span>
          </span>
          {i < flow.length - 1 && (
            <span className="px-1.5 text-xs text-purple-400/60">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function RagArchitecture() {
  return (
    <div className="space-y-6">
      {/* --- Layered Architecture --- */}
      <div className="space-y-0">
        {LAYERS.map((layer, i) => (
          <div key={layer.id}>
            {/* Arrow connector between layers */}
            {i > 0 && (
              <div className="flex justify-center py-2 text-zinc-700 text-sm tracking-[4px]">
                ▼
              </div>
            )}
            <div className={`rounded-xl border ${layer.borderColor} overflow-hidden`}>
              {/* Layer header */}
              <div className={`${layer.headerBg} px-5 py-3 flex items-center gap-2.5`}>
                <span className={`text-xs font-bold tracking-[0.04em] ${layer.headerText}`}>
                  {layer.label}
                </span>
              </div>
              {/* Layer body — module cards */}
              <div className="p-5 flex flex-wrap gap-4">
                {layer.modules.map((mod) => (
                  <div
                    key={mod.title}
                    className={`rounded-lg border border-border/30 bg-[#0d1117]/60 p-4 flex flex-col gap-2 min-w-[180px] ${
                      mod.wide ? 'flex-[2] min-w-[320px]' : 'flex-1'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${
                          layer.headerBg
                        } text-sm`}
                      >
                        {mod.icon}
                      </span>
                      {mod.title}
                      {mod.badge && (
                        <span className="inline-block rounded-full bg-emerald-400/10 px-2 py-px text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                          {mod.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">{mod.desc}</p>
                    {mod.classes && mod.classes.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                        {mod.classes.map((cls) => (
                          <code
                            key={cls}
                            className="inline-block rounded bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                          >
                            {cls}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- RAG Q&A Flow --- */}
      <div className="space-y-3 pt-2">
        <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.08em]">
          RAG 问答全链路（一次用户请求的完整数据流）
        </p>
        <FlowChart flow={RAG_FLOW} />
      </div>

      {/* --- Ingestion Flow --- */}
      <div className="space-y-3 pt-2">
        <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.08em]">
          文档摄取管道（PipelineEngine DAG 执行）
        </p>
        <FlowChart flow={INGEST_FLOW} colorClass="border-emerald-400/30" />
      </div>

      {/* --- Legend --- */}
      <div className="flex flex-wrap gap-6 pt-2">
        {LEGEND.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5 text-[10px] text-zinc-600">
            <span className={`inline-block w-2 h-2 rounded-sm ${item.color}`} />
            {item.label}
          </span>
        ))}
      </div>

      {/* --- Tech Stack --- */}
      <div className="flex flex-wrap gap-2 pt-1">
        {TECH_STACK.map((tech) => (
          <code
            key={tech}
            className="inline-block rounded-lg border border-border/30 bg-[#0d1117]/60 px-3 py-1.5 font-mono text-[11px] text-zinc-400"
          >
            {tech}
          </code>
        ))}
      </div>
    </div>
  );
}
