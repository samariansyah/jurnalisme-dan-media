export type SentimenLabel = "Positif" | "Netral" | "Negatif";

export const SENTIMENT_COLORS: Record<SentimenLabel, string> = {
  Positif: "#10b981",
  Netral:  "#6366f1",
  Negatif: "#ef4444",
};

const POSITIVE = new Set([
  "bagus","baik","senang","suka","hebat","mantap","keren","indah","luar biasa",
  "bermanfaat","inspiratif","menyentuh","berkah","alhamdulillah","subhanallah",
  "masyaallah","allahu akbar","tenang","damai","semangat","rajin","giat","sukses",
  "berhasil","recommended","wajib","cinta","sayang","termotivasi","mencerahkan",
  "mudah","praktis","lengkap","terbaik","istimewa","mulia","bijak","cerdas",
  "terpercaya","positif","bangga","bersyukur","nikmat","barakah","amazing","great",
  "excellent","good","love","wonderful","fantastic","helpful","useful","informative",
  "menarik","seru","asik","asyik","wow","kece","top","kualitas","memuaskan",
  "membantu","mendukung","menginspirasi","memotivasi","menyenangkan","nyaman",
  "aman","gratis","murah","mudah","cepat","akurat","lengkap","jelas","bagus banget",
  "keren banget","mantap jiwa","luar biasa","lanjutkan","teruskan","terimakasih",
  "jazakallah","syukron","terima kasih","makasih","thanks","thankyou",
]);

const NEGATIVE = new Set([
  "jelek","buruk","susah","sulit","malas","bosan","boring","gagal","kecewa",
  "sedih","menyesal","rugi","clickbait","hoax","palsu","bohong","manipulasi",
  "provokatif","membosankan","tidak menarik","kurang","rendah","lemah","benci",
  "males","ogah","enggan","antipati","keluhan","masalah","ribet","rumit","absurd",
  "sia-sia","percuma","mengecewakan","menyebalkan","annoying","spam","sampah",
  "payah","ancur","hancur","gagal total","tidak berguna","tidak bermanfaat",
  "tidak jelas","tidak akurat","salah","error","rusak","lambat","lemot","macet",
  "ditipu","penipuan","scam","fake","palsu","hoaks","fitnah","hasut","provokasi",
  "radikal","ekstrem","berbahaya","bahaya","hati-hati","waspada","takut","cemas",
  "khawatir","stress","depresi","sedih banget","kecewa banget","sakit","parah",
  "parah banget","zonk","nyebelin","sebel","bete","bad","worst","terrible","awful",
  "horrible","disgusting","waste","useless","stupid","dumb","idiot","bodoh","tolol",
]);

function cleanText(text: string): string {
  return text.toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/@\w+/g, " ")
    .replace(/#(\w+)/g, "$1")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function analyzeSentiment(text: string): { sentimen: SentimenLabel; skor: number } {
  const cleaned = cleanText(text);
  const words = cleaned.split(/\s+/);
  let pos = 0;
  let neg = 0;

  for (const word of words) {
    if (POSITIVE.has(word)) pos++;
    if (NEGATIVE.has(word)) neg++;
  }

  // cek bigrams
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i+1]}`;
    if (POSITIVE.has(bigram)) pos++;
    if (NEGATIVE.has(bigram)) neg++;
  }

  const total = pos + neg;
  if (total === 0) return { sentimen: "Netral", skor: 0.60 };
  if (pos > neg)   return { sentimen: "Positif", skor: Math.min(0.95, 0.65 + (pos / total) * 0.3) };
  if (neg > pos)   return { sentimen: "Negatif", skor: Math.min(0.95, 0.65 + (neg / total) * 0.3) };
  return { sentimen: "Netral", skor: 0.60 };
}

const STOPWORDS = new Set([
  "yang","dan","di","ke","dari","ini","itu","dengan","untuk","adalah","pada","ada",
  "juga","tidak","bisa","dalam","akan","sudah","saya","kami","kita","mereka","dia",
  "ia","anda","kamu","nya","pun","nih","sih","deh","dong","loh","kan","ya","yg",
  "yah","ga","gak","nggak","ngga","gk","udah","udh","mau","buat","kalau","kalo",
  "tapi","atau","karena","karna","sama","lebih","sangat","banget","sekali","paling",
  "jadi","lagi","lg","masih","belum","emang","memang","aja","saja","hanya","cuma",
  "punya","maka","jika","bila","ketika","saat","waktu","setelah","sebelum","tentang",
  "oleh","bagi","atas","bawah","lain","semua","setiap","para","the","a","an","is",
  "in","of","to","and","or","for","with","on","at","by","that","this","are","was",
  "were","be","been","have","has","had","do","does","did","will","would","could",
  "should","may","might","shall","can","its","it","we","they","he","she","you","i",
  "me","him","her","us","them","my","your","his","our","their",
]);

export function extractWords(text: string): string[] {
  return cleanText(text)
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOPWORDS.has(w));
}

export function getWordFrequency(texts: string[], limit = 50): { text: string; value: number }[] {
  const freq: Record<string, number> = {};
  texts.forEach(t => {
    extractWords(t).forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  });
  return Object.entries(freq)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
