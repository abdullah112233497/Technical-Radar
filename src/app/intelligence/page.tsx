'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntelligenceHub() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [intelligence, setIntelligence] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIntelligence() {
      try {
        const res = await fetch('/api/intelligence');
        const data = await res.json();
        setIntelligence(data);
      } catch (e) {
        console.error('Failed to fetch intelligence', e);
      } finally {
        setLoading(false);
      }
    }
    fetchIntelligence();
  }, []);

  const sections = [
    { id: 'risks', title: 'Critical Alerts', data: intelligence?.risks || [], color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'opportunities', title: 'Strategic Opportunities', data: intelligence?.opportunities || [], color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'info', title: 'System Updates & Info', data: intelligence?.info || [], color: 'text-blue-500', bg: 'bg-blue-500/10' }
  ];

  const filteredSections = activeFilter === 'all' 
    ? sections 
    : sections.filter(s => s.id === activeFilter);

  return (
    <main className="flex-1 p-8 lg:p-12 max-w-[1600px] mx-auto w-full flex flex-col gap-12">
      {/* Header with Stats Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="material-symbols-outlined text-[14px]">psychology</span>
            Intelligence Hub
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">Architecture Insights</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
            Autonomous monitoring of your entire technical stack. Active intelligence detecting risks before they become incidents.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-3 border-r border-slate-100 text-center">
            <div className="text-2xl font-black text-rose-500">{loading ? '..' : (intelligence?.risks?.length || 0)}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Risks</div>
          </div>
          <div className="px-6 py-3 border-r border-slate-100 text-center">
            <div className="text-2xl font-black text-emerald-500">{loading ? '..' : (intelligence?.opportunities?.length || 0)}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Paths</div>
          </div>
          <div className="px-6 py-3 text-center">
            <div className="text-2xl font-black text-blue-500">{loading ? '..' : (intelligence?.info?.length || 0)}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updates</div>
          </div>
        </div>
      </motion.div>

      {/* Global Filter & Search Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="flex-1 relative w-full group">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">filter_list</span>
          <input 
            type="text" 
            placeholder="Search intelligence feed..." 
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-200 shadow-sm w-full md:w-auto">
          {['all', 'risks', 'opportunities', 'info'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${activeFilter === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Intelligence Sections Grid */}
      <div className={`grid grid-cols-1 ${activeFilter === 'all' ? 'xl:grid-cols-3' : ''} gap-10`}>
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-8 animate-pulse">
                <div className="h-6 bg-slate-100 rounded w-1/2 mx-2"></div>
                <div className="space-y-6">
                  <div className="h-48 bg-slate-50 rounded-[2.5rem]"></div>
                  <div className="h-48 bg-slate-50 rounded-[2.5rem]"></div>
                </div>
              </div>
            ))
          ) : (
            filteredSections.map((section) => (
              <motion.div 
                key={section.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 px-2">
                  <div className={`w-3 h-3 rounded-full ${section.color.replace('text', 'bg')}`}></div>
                  <h4 className={`text-xl font-black tracking-tight ${section.color}`}>{section.title}</h4>
                  <div className="flex-1 h-[1px] bg-slate-100"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.data.length} ACTIVE</span>
                </div>

                <div className="space-y-6">
                  {section.data.map((item: any, idx: number) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group overflow-hidden"
                    >
                      {/* Subtle hover background gradient */}
                      <div className={`absolute top-0 right-0 w-32 h-32 ${section.bg} rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      <div className="flex items-start justify-between mb-6 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${section.bg} ${section.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                          <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.time}</div>
                          <div className={`text-[9px] font-black px-2 py-0.5 rounded mt-1 inline-block tracking-widest ${
                            section.id === 'risks' ? 'bg-rose-500 text-white animate-pulse' :
                            section.id === 'opportunities' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {section.id.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 mb-8">
                        <h5 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-slate-700 transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset Category</span>
                          <span className="text-xs font-black text-slate-900 tracking-tight">{item.category}</span>
                        </div>
                        <button className={`px-6 py-3 rounded-xl text-xs font-black transition-all duration-300 shadow-lg btn-premium ${
                          section.id === 'risks' ? 'bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600' :
                          section.id === 'opportunities' ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600' :
                          'bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800'
                        }`}>
                          Take Action
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {section.data.length === 0 && (
                    <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      No items detected
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
