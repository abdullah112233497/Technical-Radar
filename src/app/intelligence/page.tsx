export default function IntelligencePage() {
  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto p-gutter xl:p-xl flex flex-col gap-lg">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-sm">Intelligence Hub</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Unified insights and active monitoring for your technical stack. High-priority alerts demand attention.
          </p>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-sm bg-surface-container-highest p-1 rounded-lg self-stretch md:self-auto">
          <button className="px-4 py-1.5 rounded-md bg-surface text-on-surface font-label text-label shadow-sm">All</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-label text-label">Risks</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-label text-label">Opportunities</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-label text-label">Info</button>
        </div>
      </header>

      {/* Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* High Priority / Pinned Column (Bento Style) */}
        <div className="lg:col-span-1 flex flex-col gap-md">
          <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-xs">
            <span className="material-symbols-outlined text-error fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            Critical Alerts
          </h2>
          
          {/* Risk Card 1 */}
          <div className="bg-surface-container-lowest border border-error-container rounded-xl p-md shadow-[0_4px_24px_rgba(186,26,26,0.08)] flex flex-col gap-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-xs bg-error-container/30 text-error px-2 py-1 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                <span className="font-label text-label">High Risk</span>
              </div>
              <span className="font-code text-code text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">98% Confidence</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mt-xs">Postgres Connection Pool Exhaustion</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Active connections to <code className="bg-surface-container px-1 rounded">db-main-prod</code> have exceeded 90% capacity for the last 15 minutes. Potential cascading failure imminent.
            </p>
            <div className="mt-sm pt-sm border-t border-surface-variant flex justify-between items-center">
              <span className="font-label text-label text-on-surface-variant uppercase tracking-wider">Database</span>
              <button className="font-label text-label text-on-error bg-error px-3 py-1.5 rounded-md hover:bg-error/90 transition-colors">Investigate</button>
            </div>
          </div>

          {/* Risk Card 2 */}
          <div className="bg-surface-container-lowest border border-error-container rounded-xl p-md shadow-[0_4px_24px_rgba(186,26,26,0.05)] flex flex-col gap-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-xs bg-error-container/30 text-error px-2 py-1 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                <span className="font-label text-label">Security</span>
              </div>
              <span className="font-code text-code text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">92% Confidence</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mt-xs">Unpatched CVE in Next.js Dependency</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Critical vulnerability detected in <code className="bg-surface-container px-1 rounded">next-auth</code> version currently deployed to production. RCE possible.
            </p>
            <div className="mt-sm pt-sm border-t border-surface-variant flex justify-between items-center">
              <span className="font-label text-label text-on-surface-variant uppercase tracking-wider">Frontend</span>
              <button className="font-label text-label text-on-error bg-error px-3 py-1.5 rounded-md hover:bg-error/90 transition-colors">View Patch</button>
            </div>
          </div>
        </div>

        {/* General Insights Feed */}
        <div className="lg:col-span-2 flex flex-col gap-md">
          <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            Active Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Opportunity Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm hover:shadow-md transition-shadow flex flex-col gap-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-xs bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label text-label">Cost Opportunity</span>
                </div>
                <span className="font-code text-code text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">85% Confidence</span>
              </div>
              <h3 className="font-h2 text-h2 text-on-surface mt-xs text-lg">Idle EC2 Instances Detected</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Three <code className="bg-surface-container px-1 rounded">t3.medium</code> instances in <code className="bg-surface-container px-1 rounded">us-east-1</code> have had &lt; 5% CPU utilization for 7 days. Estimated savings: $145/mo.
              </p>
              <div className="mt-auto pt-sm border-t border-surface-variant flex justify-between items-center">
                <span className="font-label text-label text-on-surface-variant uppercase tracking-wider">Infrastructure</span>
                <button className="font-label text-label text-on-primary bg-primary px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">Review</button>
              </div>
            </div>

            {/* Performance Info Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm hover:shadow-md transition-shadow flex flex-col gap-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-xs bg-surface-container-high text-on-surface px-2 py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-[14px]">speed</span>
                  <span className="font-label text-label">Performance</span>
                </div>
                <span className="font-code text-code text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">78% Confidence</span>
              </div>
              <h3 className="font-h2 text-h2 text-on-surface mt-xs text-lg">API Latency Spike</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Endpoint <code className="bg-surface-container px-1 rounded">/api/v1/users</code> p95 latency increased by 120ms following yesterday&apos;s deployment. Likely missing index.
              </p>
              <div className="mt-auto pt-sm border-t border-surface-variant flex justify-between items-center">
                <span className="font-label text-label text-on-surface-variant uppercase tracking-wider">Backend</span>
                <button className="font-label text-label text-on-surface bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-md hover:bg-surface-variant transition-colors">View Traces</button>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm hover:shadow-md transition-shadow flex flex-col gap-sm md:col-span-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-xs bg-surface-container-high text-on-surface px-2 py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  <span className="font-label text-label">Update</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-md items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-h2 text-h2 text-on-surface mt-xs text-lg">Redis Cache Eviction Policy Shift</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Observed a shift in cache hit rates. Radar recommends switching from <code className="bg-surface-container px-1 rounded">volatile-lru</code> to <code className="bg-surface-container px-1 rounded">allkeys-lru</code> based on recent query patterns.
                  </p>
                </div>
                <div className="bg-surface-container p-sm rounded font-code text-code text-on-surface-variant whitespace-nowrap border border-outline-variant">
                  hit_rate: 82% → 64%
                </div>
              </div>
              <div className="mt-sm pt-sm border-t border-surface-variant flex justify-between items-center">
                <span className="font-label text-label text-on-surface-variant uppercase tracking-wider">Cache</span>
                <button className="font-label text-label text-on-surface bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-md hover:bg-surface-variant transition-colors">Apply Config</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
