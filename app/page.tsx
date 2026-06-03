import PageHeader from "@/components/PageHeader";
import {
  MessageSquare,
  Bell,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
} from "lucide-react";

const stats = [
  {
    label: "Total Pesan",
    value: "12,480",
    change: "+12%",
    up: true,
    icon: MessageSquare,
    color: "bg-indigo-500",
  },
  {
    label: "Notifikasi Aktif",
    value: "348",
    change: "+5%",
    up: true,
    icon: Bell,
    color: "bg-emerald-500",
  },
  {
    label: "Pengguna Aktif",
    value: "1,024",
    change: "-3%",
    up: false,
    icon: Users,
    color: "bg-amber-500",
  },
  {
    label: "Tingkat Respons",
    value: "94.2%",
    change: "+2%",
    up: true,
    icon: TrendingUp,
    color: "bg-rose-500",
  },
];

const recentMessages = [
  { from: "Budi Santoso", msg: "Halo, ada update terbaru soal proyek?", time: "2 menit lalu", avatar: "BS", online: true },
  { from: "Sari Dewi", msg: "Laporan sudah dikirim ke email kamu", time: "15 menit lalu", avatar: "SD", online: true },
  { from: "Andi Pratama", msg: "Meeting jam 3 sore ya, jangan lupa", time: "1 jam lalu", avatar: "AP", online: false },
  { from: "Tim Marketing", msg: "Kampanye Q2 siap diluncurkan", time: "2 jam lalu", avatar: "TM", online: true },
  { from: "Rahma Putri", msg: "File desain sudah diupdate di drive", time: "3 jam lalu", avatar: "RP", online: false },
];

const recentNotifications = [
  { type: "info", text: "Server maintenance dijadwalkan Sabtu pukul 02.00", time: "5 menit lalu" },
  { type: "success", text: "Deployment v2.4.1 berhasil dilakukan", time: "30 menit lalu" },
  { type: "warning", text: "Penggunaan bandwidth mendekati batas 80%", time: "1 jam lalu" },
  { type: "error", text: "Gagal terhubung ke API eksternal #3", time: "2 jam lalu" },
];

const typeColor: Record<string, string> = {
  info: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Dashboard" subtitle="Selamat datang kembali, Admin" />
      <main className="flex-1 p-8 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500 font-medium">{s.label}</span>
                <div className={`w-9 h-9 ${s.color} rounded-lg flex items-center justify-center`}>
                  <s.icon size={17} className="text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {s.change} dari bulan lalu
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Recent messages */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Pesan Terbaru</h2>
              <a href="/chat" className="text-xs text-indigo-600 hover:underline font-medium">Lihat semua</a>
            </div>
            <ul>
              {recentMessages.map((m, i) => (
                <li key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                      {m.avatar}
                    </div>
                    {m.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{m.from}</p>
                    <p className="text-xs text-slate-500 truncate">{m.msg}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{m.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Notifikasi</h2>
              <a href="/notifications" className="text-xs text-indigo-600 hover:underline font-medium">Lihat semua</a>
            </div>
            <ul className="p-3 space-y-2">
              {recentNotifications.map((n, i) => (
                <li key={i} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-start gap-2">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase ${typeColor[n.type]}`}>
                      {n.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Online status bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800 mb-3">Status Sistem</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "API Gateway", status: "Aktif" },
              { label: "Layanan Chat", status: "Aktif" },
              { label: "Push Notifikasi", status: "Aktif" },
              { label: "Analitik Engine", status: "Maintenance" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <Circle
                  size={8}
                  className={s.status === "Aktif" ? "fill-emerald-500 text-emerald-500" : "fill-amber-500 text-amber-500"}
                />
                <span className="text-sm text-slate-600">{s.label}</span>
                <span className={`text-xs ml-auto font-medium ${s.status === "Aktif" ? "text-emerald-600" : "text-amber-600"}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
