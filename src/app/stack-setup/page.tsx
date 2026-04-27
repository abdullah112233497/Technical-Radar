'use client';
import { useState } from 'react';

export default function StackSetupPage() {
  const [categories, setCategories] = useState([
    {
      title: "Databases",
      icon: "database",
      subtitle: "Primary Storage",
      accent: "from-blue-500",
      items: [
        { name: "MongoDB", active: false },
        { name: "PostgreSQL", active: false },
        { name: "Redis", active: false },
      ]
    },
    {
      title: "Authentication",
      icon: "passkey",
      subtitle: "Identity",
      accent: "from-emerald-500",
      items: [
        { name: "Firebase Auth", active: false },
        { name: "Supabase", active: false },
        { name: "Clerk", active: false },
      ]
    },
    {
      title: "AI & ML Models",
      icon: "psychology",
      subtitle: "Intelligence",
      accent: "from-purple-500",
      colSpan: "xl:col-span-2",
      items: [
        { name: "Gemini 1.5 Pro", active: false },
        { name: "Groq (Mixtral)", active: false },
        { name: "Llama 3", active: false },
        { name: "Claude 3.5 Sonnet", active: false },
      ]
    },
    {
      title: "Hosting & Compute",
      icon: "dns",
      subtitle: "Infrastructure",
      accent: "from-orange-500",
      colSpan: "xl:col-span-2",
      items: [
        { name: "Cloud Run", active: false },
        { name: "Vercel", active: false },
        { name: "AWS Lambda", active: false },
        { name: "DigitalOcean App Platform", active: false },
      ]
    }
  ]);

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    setCategories(prev => {
      const newCategories = [...prev];
      const category = { ...newCategories[categoryIndex] };
      const items = [...category.items];
      items[itemIndex] = { ...items[itemIndex], active: !items[itemIndex].active };
      category.items = items;
      newCategories[categoryIndex] = category;
      return newCategories;
    });
  };

  const totalSelected = categories.reduce((total, cat) => 
    total + cat.items.filter(item => item.active).length, 0
  );

  return (
    <main className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-[1280px] w-full mx-auto pb-20 fade-up">
      {/* Header Section */}
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
          <span className="material-symbols-outlined text-[14px]">settings_input_component</span>
          Stack Configuration
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Define Your Infrastructure</h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          Select the core technologies powering your product. Our AI will analyze your choices to generate custom insights and scaling recommendations.
        </p>
      </div>

      {/* Global Search/Filter */}
      <div className="mb-10 relative max-w-xl group">
        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">travel_explore</span>
        <input 
          className="w-full bg-white border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 shadow-sm transition-all outline-none" 
          placeholder="Quick find technology (e.g. 'Supabase')..." 
          type="text"
        />
      </div>

      {/* Bento Grid layout for Categories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className={`bg-white rounded-[2rem] border border-slate-200/60 p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl hover:border-slate-300 transition-all duration-500 ${cat.colSpan || ''}`}
          >
            {/* Subtle accent line */}
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${cat.accent} to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{cat.title}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{cat.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {cat.items.map((item, j) => (
                <button 
                  key={j}
                  onClick={() => toggleItem(i, j)}
                  className={`px-6 py-3 rounded-2xl border font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                    item.active 
                      ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' 
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-900 hover:text-slate-900 hover:translate-y-[-2px]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar at Bottom (Part of Flow - No Overlap) */}
      <div className="w-full max-w-4xl mx-auto z-30">
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl">
              <span className="text-xl font-bold">{totalSelected}</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Current Selection</h4>
              <p className="text-sm text-slate-500 font-medium">
                {totalSelected === 0 ? "Select technologies to enable analysis" : "Stack configured and ready for generation"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setCategories(categories.map(c => ({...c, items: c.items.map(it => ({...it, active: false}))})))}
              className="flex-1 md:flex-none text-slate-400 text-sm font-bold hover:text-slate-900 transition-colors px-6 py-4"
            >
              Clear All
            </button>
            <button 
              disabled={totalSelected === 0}
              className={`flex-1 md:flex-none font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-xl ${
                totalSelected === 0 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-slate-900 text-white hover:scale-105 active:scale-95 shadow-slate-900/20'
              }`}
            >
              Generate Radar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
