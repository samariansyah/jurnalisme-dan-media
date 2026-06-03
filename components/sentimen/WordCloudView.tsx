"use client";

interface Word { text: string; value: number }

export default function WordCloudView({ words, color, compact = false }: { words: Word[]; color: string; compact?: boolean }) {
  if (!words.length) return <p className="text-sm text-slate-400 text-center py-8">Tidak ada data</p>;

  const max = words[0].value;
  const min = words[words.length - 1].value;

  function fontSize(v: number) {
    const range = max - min || 1;
    const base = compact ? 12 : 14;
    const maxSize = compact ? 28 : 40;
    return base + ((v - min) / range) * (maxSize - base);
  }

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `${r},${g},${b}`;
  };

  const rgb = hexToRgb(color);

  return (
    <div className={`flex flex-wrap gap-2 justify-center items-center ${compact ? "min-h-[160px]" : "min-h-[200px]"}`}>
      {words.map(w => {
        const size = fontSize(w.value);
        const opacity = 0.4 + ((w.value - min) / (max - min || 1)) * 0.6;
        return (
          <span
            key={w.text}
            title={`${w.text}: ${w.value}x`}
            className="cursor-default transition-transform hover:scale-110 font-semibold leading-tight"
            style={{ fontSize: size, color: `rgba(${rgb},${opacity})` }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
}
