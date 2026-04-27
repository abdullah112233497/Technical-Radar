'use client';
import { useState } from 'react';

export default function IntelligenceHub() {
  const [activeFilter, setActiveFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      title: "Critical Connection Pool Exhaustion",
      desc: "Postgres connection limits reached 94% on main-prod-db. Imminent service disruption detected in write operations.",
      category: "DATABASE",
      urgency: "CRITICAL",
      time: "12m ago",
      icon: "warning",
      color: "rose",
      action: "Scale Up"
    },
    {
      id: 2,
      title: "Unauthorized API Access Patterns",
      desc: "Anomalous traffic detected from 14.2.19.4 originating in Eastern Europe. 403 response rate up by 400%.",
      category: "SECURITY",
      urgency: "HIGH",
      time: "45m ago",
      icon: "shield_lock",
      color: "rose",
      action: "Block IP"
    }
  ];

  const opportunities = [
    {
      id: 3,
      title: "Migrate to S3 Intelligent-Tiering",
      desc: "Analysis of 4TB storage bucket shows 70% of objects haven't been accessed in 30 days. Save ~$85/mo.",
      category: "COST",
      urgency: "MEDIUM",
      time: "1d ago",
      icon: "savings",
      color: "emerald",
      action: "Optimize"
    },
    {
      id: 4,
      title: "Enable Cloudflare Early Hints",
      desc: "Server timing data suggests Early Hints could reduce Largest Contentful Paint (LCP) by up to 300ms.",
      category: "PERFORMANCE",
      urgency: "LOW",
      time: "2d ago",
      icon: "speed",
      color: "emerald",
      action: "Activate"
    }
  ];

  const info = [
    {
      id: 5,
      title: "Node.js 22 LTS Released",
      desc: "Official LTS support for v22 is now active. Includes significant V8 engine performance boosts.",
      category: "ECOSYSTEM",
      urgency: "INFO",
      time: "3d ago",
      icon: "info",
      color: "blue",
      action: "Docs"
    },
    {
      id: 6,
      title: "Next.js Security Middleware",
      desc: "New middleware pattern released for improved CSRF protection. Integration recommended for all routes.",
      category: "UPDATES",
      urgency: "INFO",
      time: "4d ago",
      icon: "update",
      color: "blue",
      action: "Review"
    }
  ];

  const sections = [
    { id: 'alerts', title: 'Critical Alerts', data: alerts, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'opportunities', title: 'Strategic Opportunities', data: opportunities, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'info', title: 'System Updates & Info', data: info, color: 'text-blue-500', bg: 'bg-blue-500/10' }
  ];

  return (
    <main className="flex-1 p-8 lg:p-12 max-w-[1600px] mx-auto w-full flex flex-col gap-12 fade-up">
      {/* Header with Stats Overlay */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
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
            <div className="text-2xl font-black text-rose-500">02</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Risks</div>
          </div>
          <div className="px-6 py-3 border-r border-slate-100 text-center">
            <div className="text-2xl font-black text-emerald-500">05</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Paths</div>
          </div>
          <div className="px-6 py-3 text-center">
            <div className="text-2xl font-black text-blue-500">12</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updates</div>
          </div>
        </div>
      </div>

      {/* Global Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
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
      </div>

      {/* Intelligence Sections Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {sections.map((section) => (
          <div key={section.id} className="space-y-8">
            <div className="flex items-center gap-4 px-2">
              <div className={`w-3 h-3 rounded-full ${section.color.replace('text', 'bg')}`}></div>
              <h4 className={`text-xl font-black tracking-tight ${section.color}`}>{section.title}</h4>
              <div className="flex-1 h-[1px] bg-slate-100"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.data.length} ACTIVE</span>
            </div>

            <div className="space-y-6">
              {section.data.map((item) => (
                <div 
                  key={item.id} 
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
                        item.urgency === 'CRITICAL' ? 'bg-rose-500 text-white animate-pulse' :
                        item.urgency === 'HIGH' ? 'bg-rose-100 text-rose-600' :
                        item.urgency === 'MEDIUM' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.urgency}
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
                    <button className={`px-6 py-3 rounded-xl text-xs font-black transition-all duration-300 shadow-lg ${
                      section.id === 'alerts' ? 'bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600' :
                      section.id === 'opportunities' ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600' :
                      'bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800'
                    }`}>
                      {item.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
