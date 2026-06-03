"use client";

import { useState, useRef, useCallback } from "react";
import Papa from "papaparse";
import { PLATFORMS, autoDetectColumns, type PlatformId, type ColumnMapping } from "@/lib/platforms";
import { analyzeSentiment, getWordFrequency, SENTIMENT_COLORS, type SentimenLabel } from "@/lib/client-sentiment";
import AnalysisResult from "./AnalysisResult";
import { Upload, FileText, ChevronRight, RotateCcw } from "lucide-react";

type Step = "platform" | "upload" | "result";

export interface AnalyzedRow {
  [key: string]: string | number;
  _sentimen: SentimenLabel;
  _skor: number;
  _text: string;
  _likes: number;
  _views: number;
  _comments: number;
  _shares: number;
  _date: string;
  _user: string;
}

export default function UploadWizard() {
  const [step, setStep] = useState<Step>("platform");
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({ text:"", date:"", likes:"", views:"", comments:"", shares:"", user:"" });
  const [analyzed, setAnalyzed] = useState<AnalyzedRow[]>([]);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function resetAll() {
    setStep("platform");
    setPlatform(null);
    setFileName("");
    setHeaders([]);
    setRawRows([]);
    setMapping({ text:"", date:"", likes:"", views:"", comments:"", shares:"", user:"" });
    setAnalyzed([]);
  }

  function handlePlatformSelect(p: PlatformId) {
    setPlatform(p);
    setStep("upload");
  }

  function parseFile(file: File) {
    if (!platform) return;
    setFileName(file.name);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const hdrs = result.meta.fields ?? [];
        const rows = result.data;
        setHeaders(hdrs);
        setRawRows(rows);
        setMapping(autoDetectColumns(hdrs, PLATFORMS[platform]));
      },
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.name.endsWith(".csv")) parseFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
  }

  function runAnalysis() {
    setProcessing(true);
    setTimeout(() => {
      const results: AnalyzedRow[] = rawRows.map(row => {
        const text  = mapping.text     ? String(row[mapping.text] ?? "")     : "";
        const date  = mapping.date     ? String(row[mapping.date] ?? "")     : "";
        const user  = mapping.user     ? String(row[mapping.user] ?? "")     : "";
        const likes    = mapping.likes    ? Number(row[mapping.likes] ?? 0)    : 0;
        const views    = mapping.views    ? Number(row[mapping.views] ?? 0)    : 0;
        const comments = mapping.comments ? Number(row[mapping.comments] ?? 0) : 0;
        const shares   = mapping.shares   ? Number(row[mapping.shares] ?? 0)   : 0;
        const { sentimen, skor } = analyzeSentiment(text);
        return { ...row, _sentimen: sentimen, _skor: skor, _text: text, _likes: likes, _views: views, _comments: comments, _shares: shares, _date: date, _user: user };
      });
      setAnalyzed(results);
      setStep("result");
      setProcessing(false);
    }, 600);
  }

  const platformObj = platform ? PLATFORMS[platform] : null;

  // ── Step 1: Pilih Platform ────────────────────────────────────────────────
  if (step === "platform") return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800">Pilih Platform</h2>
        <p className="text-sm text-slate-500 mt-1">Pilih platform sumber data CSV yang ingin dianalisis</p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {(Object.values(PLATFORMS)).map(p => (
          <button key={p.id} onClick={() => handlePlatformSelect(p.id)}
            className="bg-white rounded-2xl border-2 border-slate-100 p-7 text-left hover:border-indigo-300 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{p.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.sampleColumns.slice(0,5).map(c => (
                <span key={c} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[11px] font-mono">{c}</span>
              ))}
              <span className="px-2 py-0.5 text-slate-400 text-[11px]">+{p.sampleColumns.length - 5} lainnya</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Step 2: Upload & Mapping ──────────────────────────────────────────────
  if (step === "upload") return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={resetAll} className="hover:text-indigo-600 font-medium">Pilih Platform</button>
        <ChevronRight size={14} />
        <span className="font-semibold text-slate-800">{platformObj?.icon} {platformObj?.name}</span>
      </div>

      {/* Info kolom */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
        <p className="text-sm font-medium text-indigo-800 mb-2">📋 Kolom yang diharapkan untuk {platformObj?.name}:</p>
        <div className="flex flex-wrap gap-1.5">
          {platformObj?.sampleColumns.map(c => (
            <span key={c} className="px-2 py-0.5 bg-white text-indigo-600 border border-indigo-200 rounded text-xs font-mono">{c}</span>
          ))}
        </div>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          dragging ? "border-indigo-400 bg-indigo-50" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
        }`}
      >
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFileInput} />
        <Upload size={32} className={`mx-auto mb-3 ${dragging ? "text-indigo-500" : "text-slate-300"}`} />
        {fileName ? (
          <div>
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium">
              <FileText size={18} />
              <span>{fileName}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{rawRows.length.toLocaleString()} baris terdeteksi</p>
          </div>
        ) : (
          <>
            <p className="text-slate-600 font-medium">Drag & drop file CSV atau klik untuk browse</p>
            <p className="text-sm text-slate-400 mt-1">Format: .csv · Maks 10MB</p>
          </>
        )}
      </div>

      {/* Column mapper */}
      {headers.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="font-semibold text-slate-800">🗂️ Pemetaan Kolom</h3>
          <p className="text-xs text-slate-500">Kolom berhasil dideteksi otomatis. Ubah jika diperlukan.</p>
          <div className="grid grid-cols-2 gap-3">
            {([
              ["text",     "Kolom Teks / Konten *"],
              ["date",     "Kolom Tanggal"],
              ["user",     "Kolom Pengguna"],
              ["likes",    "Kolom Likes"],
              ["views",    "Kolom Views"],
              ["comments", "Kolom Komentar"],
              ["shares",   "Kolom Share"],
            ] as [keyof ColumnMapping, string][]).map(([key, label]) => (
              <div key={key}>
                <label className="text-xs font-medium text-slate-600 mb-1 block">{label}</label>
                <select
                  value={mapping[key]}
                  onChange={e => setMapping(m => ({ ...m, [key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">— Tidak dipetakan —</option>
                  {headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Preview 3 baris pertama:</p>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="text-xs w-full">
                <thead className="bg-slate-50">
                  <tr>{headers.map(h => <th key={h} className="px-3 py-2 text-left text-slate-500 font-medium whitespace-nowrap">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rawRows.slice(0,3).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      {headers.map(h => (
                        <td key={h} className="px-3 py-2 text-slate-600 max-w-[180px]">
                          <p className="truncate">{String(row[h] ?? "")}</p>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={runAnalysis}
            disabled={!mapping.text || processing}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {processing ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menganalisis {rawRows.length} data...</>
            ) : (
              <>▶ Jalankan Analisis Sentimen ({rawRows.length.toLocaleString()} baris)</>
            )}
          </button>
        </div>
      )}
    </div>
  );

  // ── Step 3: Hasil ─────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={resetAll} className="hover:text-indigo-600 font-medium">Pilih Platform</button>
          <ChevronRight size={14} />
          <span className="text-slate-600">{platformObj?.name}</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-slate-800">Hasil Analisis</span>
        </div>
        <button onClick={resetAll}
          className="flex items-center gap-1.5 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
          <RotateCcw size={14} /> Upload Baru
        </button>
      </div>
      <AnalysisResult data={analyzed} platform={platformObj!} fileName={fileName} />
    </div>
  );
}
