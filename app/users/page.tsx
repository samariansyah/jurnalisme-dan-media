"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { UserPlus, Search, MoreHorizontal, Shield, User, Edit2, Trash2 } from "lucide-react";

type Role = "Admin" | "Moderator" | "Anggota" | "Tamu";
type Status = "Aktif" | "Nonaktif" | "Pending";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
  messages: number;
  avatar: string;
}

const initialUsers: UserData[] = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad@komdig.id", role: "Admin", status: "Aktif", joined: "Jan 2025", messages: 1240, avatar: "AF" },
  { id: 2, name: "Budi Santoso", email: "budi@komdig.id", role: "Moderator", status: "Aktif", joined: "Feb 2025", messages: 876, avatar: "BS" },
  { id: 3, name: "Sari Dewi", email: "sari@komdig.id", role: "Anggota", status: "Aktif", joined: "Mar 2025", messages: 543, avatar: "SD" },
  { id: 4, name: "Andi Pratama", email: "andi@komdig.id", role: "Anggota", status: "Aktif", joined: "Mar 2025", messages: 389, avatar: "AP" },
  { id: 5, name: "Rahma Putri", email: "rahma@komdig.id", role: "Anggota", status: "Nonaktif", joined: "Apr 2025", messages: 210, avatar: "RP" },
  { id: 6, name: "Doni Kurnia", email: "doni@komdig.id", role: "Moderator", status: "Aktif", joined: "Apr 2025", messages: 654, avatar: "DK" },
  { id: 7, name: "Lisa Amelia", email: "lisa@komdig.id", role: "Anggota", status: "Pending", joined: "Mei 2025", messages: 0, avatar: "LA" },
  { id: 8, name: "Rizky Hakim", email: "rizky@komdig.id", role: "Tamu", status: "Aktif", joined: "Jun 2025", messages: 45, avatar: "RH" },
  { id: 9, name: "Nadia Sari", email: "nadia@komdig.id", role: "Anggota", status: "Aktif", joined: "Jun 2025", messages: 128, avatar: "NS" },
  { id: 10, name: "Fajar Nugroho", email: "fajar@komdig.id", role: "Anggota", status: "Nonaktif", joined: "Jun 2025", messages: 67, avatar: "FN" },
];

const roleColor: Record<Role, string> = {
  Admin: "bg-rose-100 text-rose-700",
  Moderator: "bg-purple-100 text-purple-700",
  Anggota: "bg-blue-100 text-blue-700",
  Tamu: "bg-slate-100 text-slate-600",
};

const statusColor: Record<Status, string> = {
  Aktif: "bg-emerald-100 text-emerald-700",
  Nonaktif: "bg-slate-100 text-slate-500",
  Pending: "bg-amber-100 text-amber-700",
};

const avatarColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "Semua">("Semua");
  const [statusFilter, setStatusFilter] = useState<Status | "Semua">("Semua");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Semua" || u.role === roleFilter;
    const matchStatus = statusFilter === "Semua" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  function removeUser(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setOpenMenu(null);
  }

  function toggleStatus(id: number) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Aktif" ? "Nonaktif" : "Aktif" } : u
      )
    );
    setOpenMenu(null);
  }

  const roles: (Role | "Semua")[] = ["Semua", "Admin", "Moderator", "Anggota", "Tamu"];
  const statuses: (Status | "Semua")[] = ["Semua", "Aktif", "Nonaktif", "Pending"];

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader title="Manajemen Pengguna" subtitle="Kelola akun dan hak akses pengguna" />
      <main className="flex-1 p-8 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Pengguna", value: users.length, color: "text-indigo-600" },
            { label: "Pengguna Aktif", value: users.filter((u) => u.status === "Aktif").length, color: "text-emerald-600" },
            { label: "Nonaktif", value: users.filter((u) => u.status === "Nonaktif").length, color: "text-slate-500" },
            { label: "Pending", value: users.filter((u) => u.status === "Pending").length, color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters and actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari pengguna..."
                className="w-full pl-8 pr-4 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    roleFilter === r ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {statuses.slice(1).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(statusFilter === s ? "Semua" : s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                    statusFilter === s ? "border-indigo-600 text-indigo-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              <UserPlus size={15} />
              Tambah Pengguna
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pengguna</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Peran</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Bergabung</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pesan</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                      Tidak ada pengguna ditemukan
                    </td>
                  </tr>
                )}
                {filtered.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                          {u.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${roleColor[u.role]}`}>
                        {u.role === "Admin" ? <Shield size={10} /> : <User size={10} />}
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[u.status]}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{u.joined}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 font-medium">{u.messages.toLocaleString()}</td>
                    <td className="px-5 py-3.5 relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {openMenu === u.id && (
                        <div className="absolute right-8 top-2 z-10 bg-white rounded-xl shadow-lg border border-slate-200 py-1 w-44">
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <Edit2 size={13} /> Edit Profil
                          </button>
                          <button
                            onClick={() => toggleStatus(u.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            <Shield size={13} />
                            {u.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                          </button>
                          <hr className="my-1 border-slate-100" />
                          <button
                            onClick={() => removeUser(u.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={13} /> Hapus Pengguna
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
            Menampilkan {filtered.length} dari {users.length} pengguna
          </div>
        </div>
      </main>
    </div>
  );
}
