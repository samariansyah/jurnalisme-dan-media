"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Bell, CheckCheck, Trash2, Filter, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type NType = "info" | "success" | "warning" | "error";

interface Notif {
  id: number;
  type: NType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const initialNotifs: Notif[] = [
  { id: 1, type: "success", title: "Deployment Berhasil", body: "Versi v2.4.1 berhasil di-deploy ke lingkungan produksi.", time: "Baru saja", read: false },
  { id: 2, type: "warning", title: "Bandwidth Mendekati Batas", body: "Penggunaan bandwidth saat ini 80% dari kapasitas total.", time: "30 menit lalu", read: false },
  { id: 3, type: "error", title: "Koneksi API Gagal", body: "Gagal terhubung ke layanan API eksternal #3. Coba lagi nanti.", time: "1 jam lalu", read: false },
  { id: 4, type: "info", title: "Jadwal Maintenance", body: "Server akan menjalani maintenance Sabtu, 07 Juni 2026 pukul 02.00 WIB.", time: "2 jam lalu", read: true },
  { id: 5, type: "success", title: "Backup Selesai", body: "Backup database otomatis berhasil diselesaikan.", time: "3 jam lalu", read: true },
  { id: 6, type: "info", title: "Pengguna Baru Terdaftar", body: "12 pengguna baru telah mendaftar dalam 24 jam terakhir.", time: "5 jam lalu", read: true },
  { id: 7, type: "warning", title: "Sertifikat SSL Akan Habis", body: "Sertifikat SSL domain utama akan berakhir dalam 14 hari.", time: "Kemarin", read: true },
  { id: 8, type: "error", title: "Login Mencurigakan", body: "Terdeteksi percobaan login dari IP tidak dikenal (192.168.x.x).", time: "Kemarin", read: true },
  { id: 9, type: "success", title: "Laporan Bulanan Siap", body: "Laporan analitik bulan Mei 2026 sudah dapat diunduh.", time: "2 hari lalu", read: true },
  { id: 10, type: "info", title: "Pembaruan Sistem", body: "Pembaruan sistem ke v3.0 akan dirilis minggu depan.", time: "3 hari lalu", read: true },
];

const iconMap: Record<NType, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap: Record<NType, { bg: string; icon: string; badge: string }> = {
  info: { bg: "bg-blue-50", icon: "text-blue-500", badge: "bg-blue-100 text-blue-700" },
  success: { bg: "bg-emerald-50", icon: "text-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  warning: { bg: "bg-amber-50", icon: "text-amber-500", badge: "bg-amber-100 text-amber-700" },
  error: { bg: "bg-red-50", icon: "text-red-500", badge: "bg-red-100 text-red-700" },
};

type Filter = "all" | "unread" | NType;

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const visible = notifs.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "all") return true;
    return n.type === filter;
  });

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function remove(id: number) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Semua" },
    { key: "unread", label: "Belum Dibaca" },
    { key: "info", label: "Info" },
    { key: "success", label: "Sukses" },
    { key: "warning", label: "Peringatan" },
    { key: "error", label: "Error" },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Notifikasi" subtitle="Kelola semua pemberitahuan sistem" />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-slate-500" />
              <span className="text-sm text-slate-600">
                {unreadCount > 0 ? (
                  <><span className="font-semibold text-indigo-600">{unreadCount}</span> belum dibaca</>
                ) : (
                  "Semua sudah dibaca"
                )}
              </span>
            </div>
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <CheckCheck size={14} />
              Tandai semua dibaca
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-400" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === f.key
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Notification list */}
          <div className="space-y-2">
            {visible.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">Tidak ada notifikasi</div>
            )}
            {visible.map((n) => {
              const Icon = iconMap[n.type];
              const c = colorMap[n.type];
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    n.read ? "bg-white border-slate-100" : `${c.bg} border-transparent shadow-sm`
                  }`}
                >
                  <div className={`mt-0.5 ${c.icon}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-slate-800">{n.title}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase ${c.badge}`}>
                        {n.type}
                      </span>
                      {!n.read && <span className="w-2 h-2 bg-indigo-500 rounded-full ml-auto" />}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.body}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
