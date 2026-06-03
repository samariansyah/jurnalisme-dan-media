"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = { Positif: "#10b981", Netral: "#6366f1", Negatif: "#ef4444" };

export default function SentimenPieChart({ stats, total }: { stats: Record<string, number>; total: number }) {
  const data = Object.entries(stats).map(([name, value]) => ({ name, value, pct: ((value/total)*100).toFixed(1) }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value"
          label={({ name, pct }) => `${name} ${pct}%`} labelLine={false}>
          {data.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />)}
        </Pie>
        <Tooltip formatter={(v: number) => [`${v} tweet`, "Jumlah"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
