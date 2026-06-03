"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = { Positif: "#10b981", Netral: "#6366f1", Negatif: "#ef4444" };

export default function SentimenBarEngagement({ data }: { data: { sentimen: string; avgLikes: number; avgRT: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="sentimen" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="avgLikes" name="Rata-rata Likes" fill="#f59e0b" radius={[4,4,0,0]} />
        <Bar dataKey="avgRT" name="Rata-rata Retweet" fill="#6366f1" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
