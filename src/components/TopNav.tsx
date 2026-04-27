export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 w-full h-16 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold tracking-tight">
          <span className="material-symbols-outlined text-[20px] text-slate-400">explore</span>
          <span className="text-sm">Technical Intelligence</span>
        </div>
        <div className="h-4 w-px bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Live Analysis</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Scanning stack dependencies...</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 gap-2">
          <span className="material-symbols-outlined text-[16px] text-slate-400">auto_awesome</span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">AI Optimizer Active</span>
        </div>

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 hover:shadow-sm hover:ring-1 hover:ring-slate-200 transition-all duration-300 group">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-900 leading-none">Sam Altman</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1">Software Engineer</span>
          </div>
          <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
