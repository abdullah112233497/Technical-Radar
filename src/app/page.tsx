export default function Home() {
  return (
    <main className="flex-1 p-8 lg:p-12 max-w-[1280px] mx-auto w-full flex flex-col gap-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="font-h1 text-h1 text-on-surface">AI CTO Radar</h2>
        <p className="font-body-sm text-body-sm text-outline">Last updated: Just now</p>
      </div>

      {/* Hero Panel: Today for you */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">auto_awesome</span>
              <span className="font-label text-label text-secondary uppercase tracking-wider font-semibold">Today for you</span>
            </div>
            <h3 className="font-h2 text-h2 text-on-surface">Gemini 1.5 Flash pricing has dropped by 50%</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Based on your current usage patterns, consider migrating from Pro for non-critical background tasks. 
              This could save your organization approximately $1,200/month with negligible impact on latency.
            </p>
            <div className="flex items-center gap-6 mt-4">
              <button className="bg-slate-900 text-white font-label text-label px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2">
                View Migration Details
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label text-label">98%</span>
                <span className="font-body-sm text-body-sm text-outline">Confidence Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Layout for Summaries & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary Cards */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Risks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-h3 text-h3 text-on-surface">Risks</h4>
              <div className="flex items-center gap-2 bg-error-container/50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-error"></div>
                <span className="font-label text-label text-error font-bold">3</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Critical vulnerabilities or deprecations requiring immediate attention.</p>
          </div>

          {/* Opportunities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-h3 text-h3 text-on-surface">Opportunities</h4>
              <div className="flex items-center gap-2 bg-secondary-container/50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="font-label text-label text-secondary font-bold">5</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Cost savings, performance improvements, or architectural upgrades.</p>
          </div>

          {/* Updates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-h3 text-h3 text-on-surface">Updates</h4>
              <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-outline"></div>
                <span className="font-label text-label text-on-surface font-bold">12</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Routine dependency updates and minor ecosystem news.</p>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-surface-bright">
            <h4 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">history</span>
              Recent Activity
            </h4>
            <button className="font-label text-label text-slate-600 hover:text-slate-900 transition-colors">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Feed Item 1 */}
            <div className="p-6 border-b border-gray-100 hover:bg-surface-container-lowest transition-colors flex gap-4">
              <div className="mt-1 w-8 h-8 rounded-full bg-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px] text-error">warning</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h5 className="font-body-lg text-body-lg font-medium text-on-surface">MongoDB 7.0 breaking change detected</h5>
                  <span className="font-label text-label text-outline shrink-0">2h ago</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Your production cluster utilizes aggregation pipelines that are deprecated in v7.0.</p>
                <div className="bg-surface p-3 rounded-md font-code text-code text-on-surface border border-gray-100 inline-block">
                  db.collection.aggregate([ &#123; $out: ... &#125; ]) // Action required
                </div>
              </div>
            </div>
            {/* Feed Item 2 */}
            <div className="p-6 border-b border-gray-100 hover:bg-surface-container-lowest transition-colors flex gap-4">
              <div className="mt-1 w-8 h-8 rounded-full bg-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px] text-error">sync_problem</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h5 className="font-body-lg text-body-lg font-medium text-on-surface">Firebase Auth migration required</h5>
                  <span className="font-label text-label text-outline shrink-0">5h ago</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Legacy authentication endpoints will be disabled in 45 days. Codebase scan indicates 3 affected files.</p>
              </div>
            </div>
            {/* Feed Item 3 */}
            <div className="p-6 hover:bg-surface-container-lowest transition-colors flex gap-4">
              <div className="mt-1 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px] text-outline">update</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h5 className="font-body-lg text-body-lg font-medium text-on-surface">React 19 RC available</h5>
                  <span className="font-label text-label text-outline shrink-0">1d ago</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">New concurrent features available for testing. No immediate action required for current stack.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
