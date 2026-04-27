'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: 'space_dashboard' },
    { href: '/stack-setup', label: 'Stack Setup', icon: 'layers' },
    { href: '/intelligence', label: 'Intelligence', icon: 'psychology' },
  ];

  const footerLinks = [
    { href: '/docs', label: 'Docs', icon: 'description' },
    { href: '/support', label: 'Support', icon: 'help_outline' },
  ];

  return (
    <nav className="fixed left-0 top-0 bottom-0 flex flex-col p-6 h-screen w-64 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl z-50">
      {/* Header */}
      <Link href="/" className="flex items-center gap-3 mb-10 px-2 group transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          <span className="material-symbols-outlined text-[24px]">radar</span>
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900">Technical Radar</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Enterprise Edition</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-1">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Main Menu</p>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 translate-x-1' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-1'
              }`}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 group-hover:scale-110 ${isActive ? 'fill-current' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              <span className="text-sm">{link.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Links */}
      <div className="flex flex-col gap-1 mt-auto pt-6 border-t border-slate-100">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
              {link.icon}
            </span>
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
