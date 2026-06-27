export function AgentBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-violet-500/20 text-violet-400 border border-violet-500/30 ${className}`}>
      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2" fill="currentColor" />
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
      </svg>
      AGENT
    </span>
  );
}