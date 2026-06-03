import PageHeader from "@/components/PageHeader";
import { tweets, getSentimenStats, COLOR_MAP } from "@/lib/tweets-data";
import { TrendingUp, MessageSquare, Heart, Repeat2, Users } from "lucide-react";
import SentimenPieChart from "@/components/sentimen/PieChart";

export default function SentimenOverviewPage() {
  const stats = getSentimenStats();
  const total = tweets.length;
  const totalLikes = tweets.reduce((s, t) => s + t.likes, 0);
  const totalRT = tweets.reduce((s, t) => s + t.retweet, 0);
  const topTweets = [...tweets].sort((a, b) => b.likes - a.likes).slice(0, 5);

  const sentimenList = [
    { label: "Positif 😊", count: stats.Positif, color: "bg-emerald-500", pct: ((stats.Positif/total)*100).toFixed(1) },
    { label: "Netral 😐",  count: stats.Netral,  color: "bg-indigo-500",  pct: ((stats.Netral/total)*100).toFixed(1) },
    { label: "Negatif 😔", count: stats.Negatif, color: "bg-red-500",     pct: ((stats.Negatif/total)*100).toFixed(1) },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Dashboard Sentimen Islami" subtitle="Analisis minat membaca konten Islami di Twitter/X Indonesia" />
      <main className="flex-1 p-8 space-y-6">

        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">☪️</span>
            <h2 className="text-lg font-semibold">Penelitian S3 — Komunikasi & Penyiaran Islam</h2>
          </div>
          <p className="text-emerald-100 text-sm">
            Analisis sentimen berbasis IndoBERT terhadap {total} tweet tentang minat membaca konten Islami di Indonesia.
            Rentang data: <strong>1 April – 20 Mei 2026</strong>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { icon: MessageSquare, label: "Total Tweet",    value: total.toLocaleString(),         color: "bg-indigo-500" },
            { icon: Heart,         label: "Total Likes",    value: totalLikes.toLocaleString(),    color: "bg-rose-500" },
            { icon: Repeat2,       label: "Total Retweet",  value: totalRT.toLocaleString(),       color: "bg-amber-500" },
            { icon: Users,         label: "Pengguna Unik",  value: new Set(tweets.map(t=>t.username)).size.toString(), color: "bg-cyan-500" },
            { icon: TrendingUp,    label: "Tweet/Hari",     value: "2.0",                          color: "bg-purple-500" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                <s.icon size={15} className="text-white" />
              </div>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Sentimen cards + pie */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 space-y-3">
            <h2 className="font-semibold text-slate-800">Distribusi Sentimen</h2>
            {sentimenList.map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{s.label}</span>
                  <span className="text-lg font-bold text-slate-900">{s.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.pct}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{s.pct}% dari total tweet</p>
              </div>
            ))}
          </div>

          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Visualisasi Distribusi Sentimen</h2>
            <SentimenPieChart stats={stats} total={total} />
          </div>
        </div>

        {/* Top tweets */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Tweet Paling Viral (Top Likes)</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Pengguna</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Tweet</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Sentimen</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Likes</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Retweet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topTweets.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm font-medium text-slate-700">{t.username}</td>
                  <td className="px-6 py-3 text-sm text-slate-600 max-w-xs"><p className="truncate">{t.teks}</p></td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: COLOR_MAP[t.sentimen] + "22", color: COLOR_MAP[t.sentimen] }}>
                      {t.sentimen}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-slate-700">❤️ {t.likes}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-slate-700">🔁 {t.retweet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
