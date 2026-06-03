"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SentimenAreaChart({ data }: { data: { date: string; Positif: number; Netral: number; Negatif: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          {[["Positif","#10b981"],["Netral","#6366f1"],["Negatif","#ef4444"]].map(([k,c]) => (
            <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={c} stopOpacity={0.2} />
              <stop offset="95%" stopColor={c} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => v.slice(5)} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {[["Positif","#10b981"],["Netral","#6366f1"],["Negatif","#ef4444"]].map(([k,c]) => (
          <Area key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} fill={`url(#g${k})`} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
