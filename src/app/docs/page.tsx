'use client';
import { motion } from 'framer-motion';

export default function DocsPage() {
  return (
    <main className="flex-1 p-8 lg:p-12 max-w-[1280px] mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
          <span className="material-symbols-outlined text-[14px]">menu_book</span>
          Documentation
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Platform Documentation</h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          Learn how to configure your tech stack, generate architecture insights, and utilize the AI assistant.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2rem] border bg-white border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
            <span className="material-symbols-outlined">settings_input_component</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">1. Stack Setup</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Navigate to the Stack Setup page to define your current infrastructure. Selecting your databases, authentication methods, and hosting providers enables the AI to give highly tailored recommendations.
          </p>
        </div>

        <div className="p-8 rounded-[2rem] border bg-white border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">2. Dashboard</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            The Dashboard aggregates real-time news from GitHub and HackerNews, running it through Gemini AI to detect potential risks and architectural growth opportunities for your selected stack.
          </p>
        </div>

        <div className="p-8 rounded-[2rem] border bg-white border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">3. Intelligence Hub</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Chat directly with your Architecture Assistant. It is fully aware of your stack and current ecosystem trends, and can help you debug or plan new feature implementations.
          </p>
        </div>

        <div className="p-8 rounded-[2rem] border bg-white border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
            <span className="material-symbols-outlined">database</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">4. Data Sync</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Your stack is securely saved to MongoDB Atlas. If connectivity fails, it gracefully falls back to a local database to ensure you never lose your progress during the Hackathon.
          </p>
        </div>
      </div>
    </main>
  );
}
