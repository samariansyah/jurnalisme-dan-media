import PageHeader from "@/components/PageHeader";
import { getWordFrequency, COLOR_MAP } from "@/lib/tweets-data";
import WordCloudView from "@/components/sentimen/WordCloudView";

export default function WordCloudPage() {
  const allWords   = getWordFrequency();
  const posWords   = getWordFrequency("Positif");
  const netWords   = getWordFrequency("Netral");
  const negWords   = getWordFrequency("Negatif");

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Word Cloud" subtitle="Kata yang paling sering muncul berdasarkan sentimen" />
      <main className="flex-1 p-8 space-y-6">

        {/* All words */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-5">☁️ Semua Tweet — Top 60 Kata</h2>
          <WordCloudView words={allWords} color="#6366f1" />
        </div>

        {/* Per sentimen */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: "😊 Sentimen Positif", words: posWords, color: COLOR_MAP.Positif },
            { label: "😐 Sentimen Netral",  words: netWords, color: COLOR_MAP.Netral },
            { label: "😔 Sentimen Negatif", words: negWords, color: COLOR_MAP.Negatif },
          ].map(({ label, words, color }) => (
            <div key={label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-4">{label}</h3>
              <WordCloudView words={words.slice(0, 30)} color={color} compact />
            </div>
          ))}
        </div>

        {/* Top 20 bar per sentimen */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: "Top 10 Kata — Positif", words: posWords.slice(0,10), color: COLOR_MAP.Positif },
            { label: "Top 10 Kata — Netral",  words: netWords.slice(0,10), color: COLOR_MAP.Netral },
            { label: "Top 10 Kata — Negatif", words: negWords.slice(0,10), color: COLOR_MAP.Negatif },
          ].map(({ label, words, color }) => (
            <div key={label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-4">📊 {label}</h3>
              <ul className="space-y-2">
                {words.map(w => (
                  <li key={w.text} className="flex items-center gap-2">
                    <div className="h-5 rounded" style={{ width: `${(w.value/words[0].value)*100}%`, minWidth: 8, background: color + "88" }} />
                    <span className="text-xs text-slate-700 font-medium w-20 shrink-0">{w.text}</span>
                    <span className="text-xs text-slate-400">{w.value}x</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
