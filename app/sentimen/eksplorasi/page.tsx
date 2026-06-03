"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { tweets, COLOR_MAP, type Sentimen } from "@/lib/tweets-data";
import { Search, Download } from "lucide-react";

export default function EksplorasiPage() {
  const [sentFilter, setSentFilter] = useState<Sentimen | "Semua">("Semua");
  const [keyword, setKeyword] = useState("");
  const [minLikes, setMinLikes] = useState(0);
  const [sortBy, setSortBy] = useState<"likes" | "retweet" | "skor" | "tanggal">("likes");

  const filtered = tweets
    .filter(t => sentFilter === "Semua" || t.sentimen === sentFilter)
    .filter(t => !keyword || t.teks.toLowerCase().includes(keyword.toLowerCase()) || t.username.toLowerCase().includes(keyword.toLowerCase()))
    .filter(t => t.likes >= minLikes)
    .sort((a, b) => {
      if (sortBy === "likes")   return b.likes - a.likes;
      if (sortBy === "retweet") return b.retweet - a.retweet;
      if (sortBy === "skor")    return b.skor - a.skor;
      return b.tanggal.localeCompare(a.tanggal);
    });

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Eksplorasi Data" subtitle="Filter dan jelajahi data tweet secara interaktif" />
      <main className="flex-1 p-8 space-y-5">

        {/* Filter bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Cari kata kunci atau username..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div className="flex gap-2">
              {(["Semua","Positif","Netral","Negatif"] as const).map(s => (
                <button key={s} onClick={() => setSentFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    sentFilter === s ? "text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  style={sentFilter === s && s !== "Semua" ? { background: COLOR_MAP[s] } :
                         sentFilter === s ? { background: "#0f172a" } : {}}>
                  {s}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400">
              <option value="likes">Urutkan: Likes</option>
              <option value="retweet">Urutkan: Retweet</option>
              <option value="skor">Urutkan: Skor</option>
              <option value="tanggal">Urutkan: Tanggal</option>
            </select>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="shrink-0">Min likes:</span>
              <input type="number" value={minLikes} onChange={e => setMinLikes(Number(e.target.value))}
                className="w-20 px-2 py-1.5 border border-slate-200 rounded-lg text-sm outline-none" min={0} />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Menampilkan <strong className="text-slate-800">{filtered.length}</strong> dari {tweets.length} tweet</span>
            <span className="text-slate-400">
              Likes: {filtered.reduce((a,t)=>a+t.likes,0).toLocaleString()} · RT: {filtered.reduce((a,t)=>a+t.retweet,0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats ringkas */}
        <div className="grid grid-cols-3 gap-4">
          {(["Positif","Netral","Negatif"] as const).map(s => {
            const cnt = filtered.filter(t=>t.sentimen===s).length;
            return (
              <div key={s} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
                <div className="w-3 h-10 rounded-full shrink-0" style={{ background: COLOR_MAP[s] }} />
                <div>
                  <p className="text-xl font-bold text-slate-900">{cnt}</p>
                  <p className="text-xs text-slate-500">{s} · {filtered.length ? ((cnt/filtered.length)*100).toFixed(1) : 0}%</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-left">
                  {["Tanggal","Pengguna","Tweet","Sentimen","Skor","Likes","Retweet"].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.slice(0, 50).map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{t.tanggal}</td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-700 whitespace-nowrap">{t.username}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-xs"><p className="line-clamp-2">{t.teks}</p></td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: COLOR_MAP[t.sentimen]+"22", color: COLOR_MAP[t.sentimen] }}>
                        {t.sentimen}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{t.skor.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">❤️ {t.likes}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">🔁 {t.retweet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 50 && (
            <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400 text-center">
              Menampilkan 50 dari {filtered.length} hasil. Gunakan filter untuk mempersempit pencarian.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
