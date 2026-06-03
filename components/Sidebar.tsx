"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  BarChart3,
  Users,
  Settings,
  Radio,
  SmilePlus,
  Cloud,
  TrendingUp,
  TableProperties,
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/chat", icon: MessageSquare, label: "Pesan" },
  { href: "/notifications", icon: Bell, label: "Notifikasi" },
  { href: "/analytics", icon: BarChart3, label: "Analitik" },
  { href: "/users", icon: Users, label: "Pengguna" },
];

const sentimenItems = [
  { href: "/sentimen", icon: SmilePlus, label: "Overview Sentimen" },
  { href: "/sentimen/analisis", icon: BarChart3, label: "Analisis" },
  { href: "/sentimen/wordcloud", icon: Cloud, label: "Word Cloud" },
  { href: "/sentimen/tren", icon: TrendingUp, label: "Tren Waktu" },
  { href: "/sentimen/eksplorasi", icon: TableProperties, label: "Eksplorasi" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <Radio size={16} />
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">KomDig</p>
          <p className="text-xs text-slate-400">Komunikasi Digital</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 pt-1 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Komunikasi Digital</p>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}

        <div className="pt-3">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">☪️ Riset Sentimen</span>
          </div>
          {sentimenItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}>
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-slate-700">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Settings size={18} />
          Pengaturan
        </Link>
        <div className="flex items-center gap-3 px-3 py-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin</p>
            <p className="text-xs text-slate-400 truncate">admin@komdig.id</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
