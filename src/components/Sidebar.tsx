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
    <nav className="fixed left-0 top-0 bottom-0 flex flex-col p-4 h-screen w-64 border-r border-gray-200 bg-white z-50">
      {/* Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 px-2 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-[20px]">radar</span>
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tighter text-slate-900">Technical Radar</h1>
          <p className="font-label text-label text-outline">V1.0.4-beta</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 ease-in-out active:scale-[0.98] ${
                isActive 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'fill-current' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              <span className="font-body-sm text-body-sm">{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Links */}
      <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-gray-100">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-all duration-200 ease-in-out active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">
              {link.icon}
            </span>
            <span className="font-body-sm text-body-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
