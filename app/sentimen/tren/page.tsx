import PageHeader from "@/components/PageHeader";
import { tweets, getTrendByDate, COLOR_MAP } from "@/lib/tweets-data";
import SentimenAreaChart from "@/components/sentimen/AreaChart";
import TrenEngagement from "@/components/sentimen/TrenEngagement";

export default function TrenPage() {
  const trendData = getTrendByDate();

  // Hitung per bulan
  const bulanMap: Record<string, { Positif: number; Netral: number; Negatif: number; likes: number; retweet: number }> = {};
  tweets.forEach(t => {
    const bulan = t.tanggal.slice(0, 7);
    if (!bulanMap[bulan]) bulanMap[bulan] = { Positif: 0, Netral: 0, Negatif: 0, likes: 0, retweet: 0 };
    bulanMap[bulan][t.sentimen]++;
    bulanMap[bulan].likes += t.likes;
    bulanMap[bulan].retweet += t.retweet;
  });
  const bulanData = Object.entries(bulanMap).sort().map(([bulan, v]) => ({ bulan, ...v }));

  // Engagement harian
  const engHarian = trendData.map(d => {
    const day = tweets.filter(t => t.tanggal === d.date);
    return { date: d.date, likes: day.reduce((a,t)=>a+t.likes,0), retweet: day.reduce((a,t)=>a+t.retweet,0) };
  });

  // Jam aktif (simulasi dari id)
  const jamData = Array.from({length: 24}, (_, h) => ({
    jam: `${String(h).padStart(2,"0")}:00`,
    tweet: tweets.filter(t => (t.id % 24) === h).length,
  }));

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Tren & Pola Waktu" subtitle="Analisis temporal aktivitas tweet konten Islami" />
      <main className="flex-1 p-8 space-y-6">

        {/* Area chart harian */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">📅 Volume Tweet Harian per Sentimen</h2>
          <SentimenAreaChart data={trendData} />
        </div>

        {/* Bulanan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">📆 Ringkasan Bulanan</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  {["Bulan","Positif","Netral","Negatif","Total Likes","Total Retweet"].map(h => (
                    <th key={h} className="pb-3 px-2 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bulanData.map(b => (
                  <tr key={b.bulan} className="hover:bg-slate-50">
                    <td className="py-3 px-2 text-sm font-medium text-slate-700">{b.bulan}</td>
                    <td className="py-3 px-2"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">{b.Positif}</span></td>
                    <td className="py-3 px-2"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">{b.Netral}</span></td>
                    <td className="py-3 px-2"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{b.Negatif}</span></td>
                    <td className="py-3 px-2 text-sm text-slate-600">{b.likes.toLocaleString()}</td>
                    <td className="py-3 px-2 text-sm text-slate-600">{b.retweet.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Engagement harian */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">💥 Tren Engagement Harian</h2>
          <TrenEngagement data={engHarian} />
        </div>

        {/* Pola jam */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">🕐 Distribusi Tweet per Jam</h2>
          <div className="flex items-end gap-1 h-32">
            {jamData.map(j => {
              const max = Math.max(...jamData.map(x=>x.tweet));
              const h = max > 0 ? (j.tweet / max) * 100 : 0;
              return (
                <div key={j.jam} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm bg-indigo-400 transition-all hover:bg-indigo-600"
                    style={{ height: `${h}%`, minHeight: j.tweet > 0 ? 4 : 0 }}
                    title={`${j.jam}: ${j.tweet} tweet`} />
                  {[0,6,12,18,23].includes(parseInt(j.jam)) && (
                    <span className="text-[9px] text-slate-400">{j.jam.slice(0,2)}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
