"use client";

import { useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
} from "recharts";
import { Download, TrendingUp, Heart, Eye, MessageSquare, Share2 } from "lucide-react";
import { SENTIMENT_COLORS, getWordFrequency, type SentimenLabel } from "@/lib/client-sentiment";
import type { AnalyzedRow } from "./UploadWizard";
import type { PlatformConfig } from "@/lib/platforms";
import WordCloudView from "@/components/sentimen/WordCloudView";

interface Props {
  data: AnalyzedRow[];
  platform: PlatformConfig;
  fileName: string;
}

export default function AnalysisResult({ data, platform, fileName }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "wordcloud" | "tren" | "data">("overview");
  const [sentFilter, setSentFilter] = useState<SentimenLabel | "Semua">("Semua");
  const [search, setSearch] = useState("");

  const total = data.length;
  const counts = useMemo(() => ({
    Positif: data.filter(d => d._sentimen === "Positif").length,
    Netral:  data.filter(d => d._sentimen === "Netral").length,
    Negatif: data.filter(d => d._sentimen === "Negatif").length,
  }), [data]);

  const totalLikes    = useMemo(() => data.reduce((s,d)=>s+d._likes,0), [data]);
  const totalViews    = useMemo(() => data.reduce((s,d)=>s+d._views,0), [data]);
  const totalComments = useMemo(() => data.reduce((s,d)=>s+d._comments,0), [data]);
  const totalShares   = useMemo(() => data.reduce((s,d)=>s+d._shares,0), [data]);

  const pieData = (["Positif","Netral","Negatif"] as SentimenLabel[]).map(s => ({
    name: s, value: counts[s], pct: ((counts[s]/total)*100).toFixed(1)
  }));

  const engData = (["Positif","Netral","Negatif"] as SentimenLabel[]).map(s => {
    const sub = data.filter(d=>d._sentimen===s);
    return {
      s,
      likes:    sub.length ? +(sub.reduce((a,d)=>a+d._likes,0)/sub.length).toFixed(1) : 0,
      views:    sub.length ? +(sub.reduce((a,d)=>a+d._views,0)/sub.length).toFixed(1) : 0,
      comments: sub.length ? +(sub.reduce((a,d)=>a+d._comments,0)/sub.length).toFixed(1) : 0,
    };
  });

  const trendData = useMemo(() => {
    const grouped: Record<string, Record<string, number>> = {};
    data.forEach(d => {
      const date = d._date ? d._date.slice(0,10) : "N/A";
      if (!grouped[date]) grouped[date] = { Positif:0, Netral:0, Negatif:0 };
      grouped[date][d._sentimen]++;
    });
    return Object.entries(grouped).sort(([a],[b])=>a.localeCompare(b))
      .map(([date,v]) => ({ date, ...v }));
  }, [data]);

  const allWords = useMemo(() => getWordFrequency(data.map(d=>d._text)), [data]);
  const posWords = useMemo(() => getWordFrequency(data.filter(d=>d._sentimen==="Positif").map(d=>d._text)), [data]);
  const negWords = useMemo(() => getWordFrequency(data.filter(d=>d._sentimen==="Negatif").map(d=>d._text)), [data]);

  const filteredData = data
    .filter(d => sentFilter === "Semua" || d._sentimen === sentFilter)
    .filter(d => !search || d._text.toLowerCase().includes(search.toLowerCase()) || d._user.toLowerCase().includes(search.toLowerCase()));

  const topPosts = [...data].sort((a,b)=>b._likes-a._likes).slice(0,5);

  function downloadCSV() {
    const headers = ["_user","_date","_text","_sentimen","_skor","_likes","_views","_comments","_shares"];
    const rows = data.map(d => headers.map(h => `"${String(d[h]??'').replace(/"/g,'""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `hasil-sentimen-${platform.id}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const tabs = [
    { id:"overview",  label:"📊 Overview" },
    { id:"wordcloud", label:"☁️ Word Cloud" },
    { id:"tren",      label:"📈 Tren" },
    { id:"data",      label:"🔍 Data" },
  ] as const;

  return (
    <div className="space-y-5">
      {/* Header result */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{platform.icon}</span>
          <div>
            <h2 className="font-bold text-slate-800">{platform.name} — {fileName}</h2>
            <p className="text-sm text-slate-500">{total.toLocaleString()} baris dianalisis · Sentimen berbasis lexikon Indonesia</p>
          </div>
        </div>
        <button onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
          <Download size={15} /> Download CSV
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Heart,        label:"Total Likes",    value: totalLikes.toLocaleString(),    color:"bg-rose-500" },
          { icon: Eye,          label:"Total Views",    value: totalViews.toLocaleString(),    color:"bg-blue-500" },
          { icon: MessageSquare,label:"Total Komentar", value: totalComments.toLocaleString(), color:"bg-amber-500" },
          { icon: Share2,       label:"Total Share",    value: totalShares.toLocaleString(),   color:"bg-purple-500" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center mb-2`}>
              <s.icon size={15} className="text-white" />
            </div>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Sentimen summary */}
      <div className="grid grid-cols-3 gap-4">
        {(["Positif","Netral","Negatif"] as SentimenLabel[]).map(s => (
          <div key={s} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">{s==="Positif"?"😊":s==="Netral"?"😐":"😔"} {s}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: SENTIMENT_COLORS[s]+"22", color: SENTIMENT_COLORS[s] }}>
                {((counts[s]/total)*100).toFixed(1)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{counts[s].toLocaleString()}</p>
            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full">
              <div className="h-1.5 rounded-full" style={{ width:`${(counts[s]/total)*100}%`, background: SENTIMENT_COLORS[s] }} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-6 py-3.5 text-sm font-medium transition-colors ${
                activeTab===t.id ? "border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── Overview ── */}
          {activeTab==="overview" && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-4">Distribusi Sentimen</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={3} dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent??0)*100).toFixed(1)}%`} labelLine={false}>
                      {pieData.map(e => <Cell key={e.name} fill={SENTIMENT_COLORS[e.name as SentimenLabel]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v} data`, "Jumlah"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-4">Rata-rata Engagement per Sentimen</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={engData} barSize={22}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="s" tick={{ fontSize:12, fill:"#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize:11, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize:12, borderRadius:8, border:"1px solid #e2e8f0" }} />
                    <Legend wrapperStyle={{ fontSize:12 }} />
                    <Bar dataKey="likes"    name="Likes"    fill="#f59e0b" radius={[4,4,0,0]} />
                    <Bar dataKey="views"    name="Views"    fill="#6366f1" radius={[4,4,0,0]} />
                    <Bar dataKey="comments" name="Komentar" fill="#10b981" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-slate-700 mb-3">Top 5 Konten Terpopuler (Likes)</h3>
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-100 text-left">
                    {["Pengguna","Konten","Sentimen","Likes","Views"].map(h=>(
                      <th key={h} className="pb-2 px-2 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {topPosts.map((d,i)=>(
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-2 text-xs text-slate-600 whitespace-nowrap">{d._user||"—"}</td>
                        <td className="py-2.5 px-2 text-slate-700 max-w-xs"><p className="line-clamp-2 text-xs">{d._text}</p></td>
                        <td className="py-2.5 px-2">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                            style={{ background: SENTIMENT_COLORS[d._sentimen]+"22", color: SENTIMENT_COLORS[d._sentimen] }}>
                            {d._sentimen}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-sm font-semibold text-slate-700">❤️ {d._likes.toLocaleString()}</td>
                        <td className="py-2.5 px-2 text-sm text-slate-600">👁 {d._views.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Word Cloud ── */}
          {activeTab==="wordcloud" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-4">☁️ Semua Konten</h3>
                <WordCloudView words={allWords} color="#6366f1" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">😊 Konten Positif</h3>
                  <WordCloudView words={posWords.slice(0,30)} color={SENTIMENT_COLORS.Positif} compact />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">😔 Konten Negatif</h3>
                  <WordCloudView words={negWords.slice(0,30)} color={SENTIMENT_COLORS.Negatif} compact />
                </div>
              </div>
            </div>
          )}

          {/* ── Tren ── */}
          {activeTab==="tren" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700">📈 Tren Sentimen per Tanggal</h3>
              {trendData.length > 1 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={trendData}>
                    <defs>
                      {[["Positif","#10b981"],["Netral","#6366f1"],["Negatif","#ef4444"]].map(([k,c])=>(
                        <linearGradient key={k} id={`gt${k}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={c} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={c} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize:11, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize:11, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize:12, borderRadius:8, border:"1px solid #e2e8f0" }} />
                    <Legend wrapperStyle={{ fontSize:12 }} />
                    {[["Positif","#10b981"],["Netral","#6366f1"],["Negatif","#ef4444"]].map(([k,c])=>(
                      <Area key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} fill={`url(#gt${k})`} />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-slate-400 text-sm text-center py-10">Kolom tanggal tidak dipetakan atau data tidak cukup untuk tren waktu.</p>
              )}
            </div>
          )}

          {/* ── Data Table ── */}
          {activeTab==="data" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Cari konten atau pengguna..."
                  className="flex-1 min-w-48 px-3 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400" />
                <div className="flex gap-2">
                  {(["Semua","Positif","Netral","Negatif"] as const).map(s => (
                    <button key={s} onClick={()=>setSentFilter(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        sentFilter===s ? "text-white" : "bg-slate-100 text-slate-600"
                      }`}
                      style={sentFilter===s && s!=="Semua" ? { background: SENTIMENT_COLORS[s] } :
                             sentFilter===s ? { background:"#0f172a", color:"white" } : {}}>
                      {s}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-400">{filteredData.length.toLocaleString()} hasil</span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>{["Pengguna","Tanggal","Konten","Sentimen","Skor","Likes","Views"].map(h=>(
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredData.slice(0,100).map((d,i)=>(
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 text-xs text-slate-600 whitespace-nowrap">{d._user||"—"}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">{d._date||"—"}</td>
                        <td className="px-4 py-2.5 max-w-xs"><p className="text-xs text-slate-700 line-clamp-2">{d._text}</p></td>
                        <td className="px-4 py-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                            style={{ background: SENTIMENT_COLORS[d._sentimen]+"22", color: SENTIMENT_COLORS[d._sentimen] }}>
                            {d._sentimen}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-500">{d._skor.toFixed(2)}</td>
                        <td className="px-4 py-2.5 text-xs font-medium text-slate-700">{d._likes.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{d._views.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredData.length>100 && (
                  <p className="text-center text-xs text-slate-400 py-3 border-t border-slate-50">
                    Menampilkan 100 dari {filteredData.length.toLocaleString()} hasil
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
