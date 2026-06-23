export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="section-divider" />
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 py-8 lg:px-16">
        <span className="font-mono text-[10px] tracking-[0.15em] text-zinc-800">
          © {new Date().getFullYear()}
        </span>
        <span className="text-[10px] text-zinc-800">
          Built with React & Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
