export default function StackSetupPage() {
  const categories = [
    {
      title: "Databases",
      icon: "database",
      subtitle: "Primary Storage",
      accent: "from-blue-400",
      items: [
        { name: "MongoDB", active: false },
        { name: "PostgreSQL", active: true },
        { name: "Redis", active: true },
      ]
    },
    {
      title: "Authentication",
      icon: "passkey",
      subtitle: "Identity",
      accent: "from-emerald-400",
      items: [
        { name: "Firebase Auth", active: false },
        { name: "Supabase", active: true },
        { name: "Clerk", active: false },
      ]
    },
    {
      title: "AI & ML Models",
      icon: "psychology",
      subtitle: "Intelligence",
      accent: "from-purple-400",
      colSpan: "xl:col-span-2",
      items: [
        { name: "Gemini 1.5 Pro", active: false },
        { name: "Groq (Mixtral)", active: true },
        { name: "Llama 3", active: false },
        { name: "Claude 3.5 Sonnet", active: false },
      ]
    },
    {
      title: "Hosting & Compute",
      icon: "dns",
      subtitle: "Infrastructure",
      accent: "from-orange-400",
      colSpan: "xl:col-span-2",
      items: [
        { name: "Cloud Run", active: false },
        { name: "Vercel", active: true },
        { name: "AWS Lambda", active: false },
        { name: "DigitalOcean App Platform", active: false },
      ]
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-[1280px] w-full mx-auto pb-32">
      {/* Header Section */}
      <div className="mb-10 max-w-3xl">
        <h2 className="font-display text-display text-on-surface mb-3">Define Your Infrastructure</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Select the core technologies powering your product. Our AI will analyze your choices to generate custom insights and scaling recommendations.
        </p>
      </div>

      {/* Global Search/Filter for Chips */}
      <div className="mb-8 relative max-w-xl">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">travel_explore</span>
        <input 
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-12 pr-4 py-3 font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all outline-none focus:ring-slate-900 focus:border-slate-900" 
          placeholder="Quick find technology (e.g. 'Supabase')..." 
          type="text"
        />
      </div>

      {/* Bento Grid layout for Categories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className={`bg-surface-container-lowest rounded-xl border border-outline-variant p-6 ambient-shadow flex flex-col gap-5 relative overflow-hidden group hover:border-outline transition-colors ${cat.colSpan || ''}`}
          >
            {/* Subtle accent line */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cat.accent} to-transparent opacity-20`}></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">{cat.icon}</span>
                <h3 className="font-h3 text-h3 text-on-surface">{cat.title}</h3>
              </div>
              <span className="font-label text-label text-outline bg-surface-container-high px-2 py-1 rounded-md">{cat.subtitle}</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-auto">
              {cat.items.map((item, j) => (
                <button 
                  key={j}
                  className={`px-4 py-2 rounded-full border font-label text-label flex items-center gap-2 transition-all duration-200 ${
                    item.active 
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm scale-[1.02]' 
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:border-outline hover:bg-surface-container-low hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {item.active && (
                    <span className="material-symbols-outlined text-[16px] text-slate-300">check_circle</span>
                  )}
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Action Bar at Bottom */}
      <div className="fixed bottom-0 left-64 right-0 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant p-4 px-8 flex justify-end z-30">
        <div className="flex items-center gap-4 max-w-[1280px] w-full mx-auto justify-end">
          <span className="font-label text-label text-outline hidden sm:block">4 items selected</span>
          <button className="font-label text-label font-medium bg-slate-900 text-white px-8 py-3 rounded-lg shadow-md hover:bg-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Stack
          </button>
        </div>
      </div>
    </main>
  );
}
