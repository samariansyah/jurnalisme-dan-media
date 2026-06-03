export type PlatformId = "tiktok" | "instagram" | "youtube" | "googlenews";

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  textCols: string[];       // kolom teks untuk analisis sentimen
  dateCols: string[];
  likesCols: string[];
  viewsCols: string[];
  commentCols: string[];
  shareCols: string[];
  userCols: string[];
  sampleColumns: string[];  // contoh kolom CSV yang diharapkan
}

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    color: "#010101",
    bgColor: "bg-slate-900",
    borderColor: "border-slate-800",
    description: "Analisis komentar, caption, dan engagement video TikTok",
    textCols: ["teks","caption","komentar","comment","text","description","deskripsi"],
    dateCols: ["tanggal","date","created_at","timestamp","waktu"],
    likesCols: ["likes","like","suka","disukai","hearts"],
    viewsCols: ["views","view","tayangan","ditonton","plays"],
    commentCols: ["komentar","comment","comments","komen","reply"],
    shareCols: ["share","shares","bagikan","dibagikan"],
    userCols: ["username","user","akun","creator","author"],
    sampleColumns: ["id","tanggal","username","caption","likes","komentar","share","views"],
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "#e1306c",
    bgColor: "bg-pink-500",
    borderColor: "border-pink-400",
    description: "Analisis caption, komentar, dan engagement postingan Instagram",
    textCols: ["caption","teks","komentar","comment","text","description","deskripsi"],
    dateCols: ["tanggal","date","created_at","timestamp","waktu","posted_at"],
    likesCols: ["likes","like","suka","love","hearts"],
    viewsCols: ["views","view","tayangan","impressions","reach"],
    commentCols: ["komentar","comment","comments","komen"],
    shareCols: ["share","shares","bagikan","saved","simpan"],
    userCols: ["username","user","akun","author","handle"],
    sampleColumns: ["id","tanggal","username","caption","likes","komentar","views"],
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    color: "#ff0000",
    bgColor: "bg-red-500",
    borderColor: "border-red-400",
    description: "Analisis judul, deskripsi, dan komentar video YouTube",
    textCols: ["judul","title","deskripsi","description","komentar","comment","teks","text"],
    dateCols: ["tanggal","date","published_at","upload_date","timestamp","waktu"],
    likesCols: ["likes","like","suka","thumbs_up"],
    viewsCols: ["views","view","tayangan","ditonton","watch_count"],
    commentCols: ["komentar","comment","comments","komen","reply"],
    shareCols: ["share","shares"],
    userCols: ["channel","username","user","creator","author","akun"],
    sampleColumns: ["id","tanggal","channel","judul","deskripsi","views","likes","komentar"],
  },
  googlenews: {
    id: "googlenews",
    name: "Google News",
    icon: "📰",
    color: "#4285f4",
    bgColor: "bg-blue-500",
    borderColor: "border-blue-400",
    description: "Analisis sentimen berita dan artikel dari Google News",
    textCols: ["judul","title","konten","content","snippet","teks","text","deskripsi","description"],
    dateCols: ["tanggal","date","published_at","timestamp","waktu","published"],
    likesCols: ["likes","like","relevance","score"],
    viewsCols: ["views","view","tayangan","reads","click"],
    commentCols: ["komentar","comment","comments"],
    shareCols: ["share","shares"],
    userCols: ["sumber","source","media","publisher","author","penulis"],
    sampleColumns: ["id","tanggal","sumber","judul","konten","url"],
  },
};

export function detectColumn(headers: string[], candidates: string[]): string {
  const lower = headers.map(h => h.toLowerCase().trim());
  for (const c of candidates) {
    const idx = lower.findIndex(h => h === c || h.includes(c));
    if (idx !== -1) return headers[idx];
  }
  return "";
}

export interface ColumnMapping {
  text: string;
  date: string;
  likes: string;
  views: string;
  comments: string;
  shares: string;
  user: string;
}

export function autoDetectColumns(headers: string[], platform: PlatformConfig): ColumnMapping {
  return {
    text:     detectColumn(headers, platform.textCols),
    date:     detectColumn(headers, platform.dateCols),
    likes:    detectColumn(headers, platform.likesCols),
    views:    detectColumn(headers, platform.viewsCols),
    comments: detectColumn(headers, platform.commentCols),
    shares:   detectColumn(headers, platform.shareCols),
    user:     detectColumn(headers, platform.userCols),
  };
}
