export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 w-full h-14 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-lg font-black tracking-tight text-slate-900">Radar</span>
        <div className="h-4 w-px bg-gray-200 mx-2"></div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600"></span>
          </span>
          <span className="font-body-sm text-body-sm font-medium">Analyzing your stack in real-time...</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-body-sm text-body-sm text-outline hidden md:block">AI is analyzing...</span>
        <button className="text-slate-500 transition-opacity duration-150 active:opacity-70 hover:text-slate-900">
          <span className="material-symbols-outlined">bolt</span>
        </button>
        <button className="text-slate-500 transition-opacity duration-150 active:opacity-70 hover:text-slate-900">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDralHMP9_CuQj6uNotRifTSKOijSlzcfCxbCulQJsBZN7J-7Bus9Sp0beCliKcAcq89bOZU1mXJLdMHt23WZAEBoHB0-Ut0rl2OD1wrmDWJ1z65Ec4CDGi9OuC6-xohZf-QBGo_JztQNtohs81zp6lQEsmM4XidwP7RFats4RGqYpiSTcKlOQmw_AOxIfy50RxNuORSMNYom6vQtEvOuEYIcCjiLjScNzoifbqwi1sFcItVgjTuj6vaMBU51YDOLfuyazYoohOewPg"
          />
        </div>
      </div>
    </header>
  );
}
