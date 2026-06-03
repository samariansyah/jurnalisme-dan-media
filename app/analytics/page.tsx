"use client";

import PageHeader from "@/components/PageHeader";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const msgVolume = [
  { day: "Sen", masuk: 420, keluar: 380 },
  { day: "Sel", masuk: 580, keluar: 510 },
  { day: "Rab", masuk: 490, keluar: 460 },
  { day: "Kam", masuk: 720, keluar: 680 },
  { day: "Jum", masuk: 860, keluar: 790 },
  { day: "Sab", masuk: 310, keluar: 270 },
  { day: "Min", masuk: 180, keluar: 160 },
];

const responseTime = [
  { time: "00:00", avg: 4.2 },
  { time: "04:00", avg: 2.1 },
  { time: "08:00", avg: 8.5 },
  { time: "10:00", avg: 12.3 },
  { time: "12:00", avg: 9.8 },
  { time: "14:00", avg: 11.2 },
  { time: "16:00", avg: 14.1 },
  { time: "18:00", avg: 7.6 },
  { time: "20:00", avg: 5.3 },
  { time: "22:00", avg: 3.9 },
];

const channelData = [
  { name: "Direct Message", value: 42, color: "#6366f1" },
  { name: "Grup", value: 28, color: "#10b981" },
  { name: "Broadcast", value: 18, color: "#f59e0b" },
  { name: "Bot", value: 12, color: "#ef4444" },
];

const monthlyTrend = [
  { month: "Jan", pesan: 8420, pengguna: 920 },
  { month: "Feb", pesan: 9100, pengguna: 960 },
  { month: "Mar", pesan: 10200, pengguna: 1010 },
  { month: "Apr", pesan: 9800, pengguna: 985 },
  { month: "Mei", pesan: 11500, pengguna: 1050 },
  { month: "Jun", pesan: 12480, pengguna: 1024 },
];

const kpis = [
  { label: "Pesan/Hari (rata-rata)", value: "1,780", delta: "+8%" },
  { label: "Waktu Respons (rata-rata)", value: "8.2 mnt", delta: "-12%" },
  { label: "Tingkat Baca", value: "87.4%", delta: "+3%" },
  { label: "Pengguna Aktif Harian", value: "645", delta: "+6%" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Analitik" subtitle="Metrik dan tren komunikasi digital" />
      <main className="flex-1 p-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">{k.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{k.value}</p>
              <p className={`text-xs mt-1 font-medium ${k.delta.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                {k.delta} bulan ini
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Volume pesan */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Volume Pesan Minggu Ini</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={msgVolume}>
                <defs>
                  <linearGradient id="gMasuk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gKeluar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="masuk" stroke="#6366f1" strokeWidth={2} fill="url(#gMasuk)" name="Masuk" />
                <Area type="monotone" dataKey="keluar" stroke="#10b981" strokeWidth={2} fill="url(#gKeluar)" name="Keluar" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Channel distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Distribusi Saluran</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {channelData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-1.5 mt-2">
              {channelData.map((d) => (
                <li key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-slate-600">{d.name}</span>
                  </span>
                  <span className="font-semibold text-slate-700">{d.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Response time */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Waktu Respons Hari Ini (menit)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={responseTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: "#f59e0b" }} name="Rata-rata (mnt)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly trend */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Tren 6 Bulan Terakhir</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyTrend} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="pesan" fill="#6366f1" name="Total Pesan" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="pengguna" fill="#10b981" name="Pengguna Aktif" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
