'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [intelligence, setIntelligence] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

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

  const rawData = loading ? [] : (
    activeTab === 'all' 
      ? [...(intelligence?.risks || []), ...(intelligence?.opportunities || []), ...(intelligence?.info || [])]
      : intelligence?.[activeTab] || []
  );

  const activeData = rawData.filter((item: any) => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    risks: intelligence?.risks?.length || 0,
    opportunities: intelligence?.opportunities?.length || 0,
    info: intelligence?.info?.length || 0,
  };

  return (
    <main className="flex-1 p-8 lg:p-12 max-w-[1280px] mx-auto w-full flex flex-col gap-10">
      {/* Header with Search and Date */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">Architecture Dashboard</h2>
          <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            System Health Analysis • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-slate-900/5 transition-all">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Search insights..." 
            className="bg-transparent border-none outline-none text-sm w-48 font-medium" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Hero Panel: AI Recommendation */}
      <section className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-900 to-slate-700 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative bg-slate-900 rounded-[2rem] p-10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-slate-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">auto_awesome</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Priority Recommendation</span>
              </div>
              <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">
                {intelligence?.opportunities?.[0]?.title || "Market Analysis Loading..."} <br />
                <span className="text-slate-400">{intelligence?.opportunities?.[0]?.desc?.split('.')[0]}</span>
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                Stay ahead of the curve with real-time architecture insights. Our AI analyzes global updates to provide tailored recommendations for your stack.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <button className="bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5 btn-premium">
                  Optimize Now
                </button>
                <button className="bg-white/5 text-white font-bold px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 btn-premium">
                  Read Analysis
                </button>
              </div>
            </div>

            <div className="lg:w-1/3 flex justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-5xl font-bold text-white tracking-tighter">{loading ? '...' : '98'}<span className="text-xl">%</span></span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                  Confidence
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid Layout for Analytics & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Column */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setActiveTab('risks')}
            className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer group ${activeTab === 'risks' ? 'bg-rose-50 border-rose-200 shadow-lg scale-[1.02]' : 'bg-white border-slate-200/60 shadow-sm hover:shadow-xl'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${activeTab === 'risks' ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-500'}`}>
                <span className="material-symbols-outlined">warning</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeTab === 'risks' ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600'}`}>
                {loading ? '...' : stats.risks} Risks
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Technical Risks</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">Security vulnerabilities and end-of-life notices detected in your stack.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setActiveTab('opportunities')}
            className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer group ${activeTab === 'opportunities' ? 'bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]' : 'bg-white border-slate-200/60 shadow-sm hover:shadow-xl'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${activeTab === 'opportunities' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-500'}`}>
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeTab === 'opportunities' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                {loading ? '...' : stats.opportunities} Options
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Growth Options</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">Architectural upgrades and cost-saving migrations tailored for you.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setActiveTab('info')}
            className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer group ${activeTab === 'info' ? 'bg-slate-900 border-slate-800 shadow-lg scale-[1.02]' : 'bg-white border-slate-200/60 shadow-sm hover:shadow-xl'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${activeTab === 'info' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                <span className="material-symbols-outlined">info</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeTab === 'info' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                {loading ? '...' : stats.info} Info
              </span>
            </div>
            <h4 className={`text-xl font-bold mb-2 ${activeTab === 'info' ? 'text-white' : 'text-slate-900'}`}>General Info</h4>
            <p className={`text-sm leading-relaxed font-medium ${activeTab === 'info' ? 'text-slate-400' : 'text-slate-500'}`}>Routine dependency updates and minor ecosystem news.</p>
          </motion.div>
        </div>

        {/* Feed Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]"
        >
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">psychology</span>
                Technical Intelligence
              </h4>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{activeTab} feed</span>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['all', 'risks', 'opportunities', 'info'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="p-8 border-b border-slate-50 flex gap-6 animate-pulse">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-100 rounded w-full"></div>
                      <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              ) : (
                activeData.map((item: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => item.url && window.open(item.url, '_blank')}
                    className={`p-8 border-b border-slate-50 hover:bg-slate-50/80 transition-all duration-300 flex gap-6 group ${item.url ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform ${
                      item.color === 'rose' ? 'bg-rose-50 text-rose-500' :
                      item.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <h5 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{item.title}</h5>
                          {activeTab === 'all' && (
                            <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              item.category === 'risks' ? 'bg-rose-100 text-rose-600' :
                              item.category === 'opportunities' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {item.category}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            {!loading && activeData.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-4 opacity-20">inventory_2</span>
                <p className="font-bold uppercase tracking-widest text-[10px]">No recent items for this category</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
