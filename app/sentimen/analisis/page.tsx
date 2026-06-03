import PageHeader from "@/components/PageHeader";
import { tweets, getSentimenStats, COLOR_MAP, getTrendByDate } from "@/lib/tweets-data";
import SentimenAreaChart from "@/components/sentimen/AreaChart";
import SentimenPieChart from "@/components/sentimen/PieChart";
import SentimenBarEngagement from "@/components/sentimen/BarEngagement";

export default function AnalisisPage() {
  const stats = getSentimenStats();
  const total = tweets.length;
  const trendData = getTrendByDate();

  const engData = (["Positif","Netral","Negatif"] as const).map(s => {
    const subset = tweets.filter(t => t.sentimen === s);
    return {
      sentimen: s,
      avgLikes: subset.length ? +(subset.reduce((a,t)=>a+t.likes,0)/subset.length).toFixed(1) : 0,
      avgRT: subset.length ? +(subset.reduce((a,t)=>a+t.retweet,0)/subset.length).toFixed(1) : 0,
    };
  });

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Analisis Sentimen" subtitle="Distribusi, tren, dan engagement per sentimen" />
      <main className="flex-1 p-8 space-y-6">

        {/* Summary metrics */}
        <div className="grid grid-cols-3 gap-4">
          {(["Positif","Netral","Negatif"] as const).map(s => {
            const cnt = stats[s];
            const pct = ((cnt/total)*100).toFixed(1);
            const avgSkor = tweets.filter(t=>t.sentimen===s).reduce((a,t)=>a+t.skor,0) / cnt;
            return (
              <div key={s} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-600">{s === "Positif" ? "😊" : s === "Netral" ? "😐" : "😔"} {s}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: COLOR_MAP[s] + "22", color: COLOR_MAP[s] }}>{pct}%</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{cnt}</p>
                <p className="text-xs text-slate-400 mt-1">tweet · rata-rata skor {avgSkor.toFixed(3)}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                  <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: COLOR_MAP[s] }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trend chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">📈 Tren Sentimen Harian</h2>
          <SentimenAreaChart data={trendData} />
        </div>

        {/* Pie + engagement */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">🥧 Proporsi Sentimen</h2>
            <SentimenPieChart stats={stats} total={total} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">💡 Rata-rata Engagement per Sentimen</h2>
            <SentimenBarEngagement data={engData} />
          </div>
        </div>

        {/* Skor kepercayaan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">📊 Statistik Lengkap per Sentimen</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100">
                {["Sentimen","Jumlah","Persentase","Total Likes","Total Retweet","Avg Skor"].map(h => (
                  <th key={h} className="pb-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(["Positif","Netral","Negatif"] as const).map(s => {
                const subset = tweets.filter(t=>t.sentimen===s);
                const cnt = subset.length;
                return (
                  <tr key={s} className="hover:bg-slate-50">
                    <td className="py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ background: COLOR_MAP[s]+"22", color: COLOR_MAP[s] }}>{s}</span>
                    </td>
                    <td className="py-3 text-sm font-bold text-slate-800">{cnt}</td>
                    <td className="py-3 text-sm text-slate-600">{((cnt/total)*100).toFixed(1)}%</td>
                    <td className="py-3 text-sm text-slate-600">{subset.reduce((a,t)=>a+t.likes,0).toLocaleString()}</td>
                    <td className="py-3 text-sm text-slate-600">{subset.reduce((a,t)=>a+t.retweet,0).toLocaleString()}</td>
                    <td className="py-3 text-sm text-slate-600">{(subset.reduce((a,t)=>a+t.skor,0)/cnt).toFixed(4)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
