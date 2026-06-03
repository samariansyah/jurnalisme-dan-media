import { Search, Bell } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Cari..."
            className="pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-indigo-400 w-48"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
