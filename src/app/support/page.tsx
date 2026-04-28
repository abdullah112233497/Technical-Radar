'use client';
import { motion } from 'framer-motion';

export default function SupportPage() {
  return (
    <main className="flex-1 p-8 lg:p-12 max-w-[1280px] mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
          <span className="material-symbols-outlined text-[14px]">support_agent</span>
          Help & Support
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          Find quick answers to common questions about using the Technical Radar platform.
        </p>
      </motion.div>

      <div className="max-w-4xl space-y-6">
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500">speed</span>
            How fast does the AI analyze my stack?
          </h4>
          <p className="text-slate-500 font-medium leading-relaxed">
            Our platform uses direct integration with Gemini to provide blazing fast, real-time insights tailored specifically to the technologies you've selected in your Stack Setup.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-500">warning</span>
            Why am I seeing "API Quota Exceeded"?
          </h4>
          <p className="text-slate-500 font-medium leading-relaxed">
            The AI models we use have rate limits. We've implemented a smart fallback system to automatically try different models, but during peak usage, you might need to wait a few seconds before retrying.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">database</span>
            Where is my stack data saved?
          </h4>
          <p className="text-slate-500 font-medium leading-relaxed">
            Your stack is securely saved to MongoDB Atlas. If your local network blocks the connection, the app automatically falls back to a local database so you never lose your progress.
          </p>
        </div>
      </div>
    </main>
  );
}
