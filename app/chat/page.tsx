"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Send, Search, Phone, Video, MoreHorizontal, Smile, Paperclip } from "lucide-react";

const contacts = [
  { id: 1, name: "Budi Santoso", role: "Product Manager", avatar: "BS", online: true, unread: 3, lastMsg: "Ada update soal proyek?", lastTime: "09:42" },
  { id: 2, name: "Sari Dewi", role: "Designer", avatar: "SD", online: true, unread: 0, lastMsg: "File sudah diupload", lastTime: "09:30" },
  { id: 3, name: "Andi Pratama", role: "Developer", avatar: "AP", online: false, unread: 1, lastMsg: "Meeting jam 3 ya", lastTime: "08:55" },
  { id: 4, name: "Tim Marketing", role: "Group • 8 anggota", avatar: "TM", online: true, unread: 5, lastMsg: "Kampanye Q2 siap!", lastTime: "08:20" },
  { id: 5, name: "Rahma Putri", role: "Analyst", avatar: "RP", online: false, unread: 0, lastMsg: "Laporan selesai", lastTime: "Kemarin" },
  { id: 6, name: "Doni Kurnia", role: "DevOps", avatar: "DK", online: true, unread: 0, lastMsg: "Server sudah oke", lastTime: "Kemarin" },
];

type Message = { id: number; from: "me" | "them"; text: string; time: string };

const initialMessages: Record<number, Message[]> = {
  1: [
    { id: 1, from: "them", text: "Halo! Ada update terbaru soal proyek dashboard?", time: "09:30" },
    { id: 2, from: "me", text: "Halo Budi! Sedang dalam pengerjaan, estimasi selesai besok.", time: "09:32" },
    { id: 3, from: "them", text: "Oke siap, kalau ada kendala kabarin ya", time: "09:35" },
    { id: 4, from: "me", text: "Tentu, akan saya update segera!", time: "09:36" },
    { id: 5, from: "them", text: "Ada update soal proyek?", time: "09:42" },
  ],
  2: [
    { id: 1, from: "them", text: "File desain sudah saya upload ke drive ya", time: "09:28" },
    { id: 2, from: "me", text: "Oke makasih Sari, nanti saya cek", time: "09:30" },
  ],
  3: [
    { id: 1, from: "them", text: "Jangan lupa meeting jam 3 sore ya!", time: "08:55" },
    { id: 2, from: "me", text: "Siap, noted!", time: "09:00" },
  ],
  4: [
    { id: 1, from: "them", text: "Kampanye Q2 sudah siap untuk diluncurkan!", time: "08:15" },
    { id: 2, from: "me", text: "Bagus! Kapan rencana launch-nya?", time: "08:18" },
    { id: 3, from: "them", text: "Rencananya minggu depan, Senin", time: "08:20" },
  ],
  5: [
    { id: 1, from: "them", text: "Laporan analytics bulan ini sudah selesai", time: "Kemarin" },
    { id: 2, from: "me", text: "Terima kasih Rahma!", time: "Kemarin" },
  ],
  6: [
    { id: 1, from: "them", text: "Server sudah kembali normal", time: "Kemarin" },
    { id: 2, from: "me", text: "Oke Doni, terima kasih!", time: "Kemarin" },
  ],
};

export default function ChatPage() {
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const active = contacts.find((c) => c.id === activeId)!;
  const chatMessages = messages[activeId] ?? [];

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "me",
      text,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }));
    setInput("");
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <PageHeader title="Pesan" subtitle="Kelola percakapan dan komunikasi tim" />
      <div className="flex flex-1 overflow-hidden">
        {/* Contact list */}
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                placeholder="Cari percakapan..."
                className="w-full pl-8 pr-3 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {contacts.map((c) => (
              <li
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${
                  activeId === c.id ? "bg-indigo-50" : "hover:bg-slate-50"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {c.avatar}
                  </div>
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 truncate">{c.name}</span>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-1">{c.lastTime}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-indigo-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">
                    {c.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                {active.avatar}
              </div>
              {active.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">{active.name}</p>
              <p className="text-xs text-slate-500">{active.online ? "Online" : "Offline"} · {active.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Phone size={17} /></button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Video size={17} /></button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><MoreHorizontal size={17} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {chatMessages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                    m.from === "me"
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-white text-slate-800 shadow-sm rounded-bl-sm"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === "me" ? "text-indigo-200" : "text-slate-400"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shrink-0">
            <button className="p-2 text-slate-400 hover:text-slate-600"><Paperclip size={18} /></button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pesan..."
              className="flex-1 text-sm outline-none bg-transparent placeholder-slate-400"
            />
            <button className="p-2 text-slate-400 hover:text-slate-600"><Smile size={18} /></button>
            <button
              onClick={sendMessage}
              className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
