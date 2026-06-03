import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

from src.utils import require_analysis
from src.sentiment import COLOR_MAP

st.set_page_config(page_title="Tren & Pola", page_icon="📈", layout="wide")

st.title("📈 Tren & Pola Waktu")
st.caption("Analisis temporal aktivitas tweet konten Islami")
st.divider()

df = require_analysis()

# ── Volume tweet harian ───────────────────────────────────────────────────────
st.subheader("📅 Volume Tweet Harian")

daily = df.groupby(["hari", "sentimen"]).size().reset_index(name="jumlah")
daily["hari"] = pd.to_datetime(daily["hari"])

fig_daily = px.area(
    daily, x="hari", y="jumlah", color="sentimen",
    color_discrete_map=COLOR_MAP,
    labels={"hari": "Tanggal", "jumlah": "Jumlah Tweet", "sentimen": "Sentimen"},
    title="Volume Tweet per Hari",
)
fig_daily.update_layout(height=350, hovermode="x unified",
                        legend=dict(orientation="h", y=1.1))
st.plotly_chart(fig_daily, use_container_width=True)

# ── Pola jam & hari ──────────────────────────────────────────────────────────
col1, col2 = st.columns(2)

with col1:
    st.subheader("🕐 Pola Tweet per Jam")
    hourly = df.groupby(["jam", "sentimen"]).size().reset_index(name="jumlah")
    fig_hour = px.bar(
        hourly, x="jam", y="jumlah", color="sentimen",
        color_discrete_map=COLOR_MAP,
        labels={"jam": "Jam", "jumlah": "Jumlah Tweet"},
        title="Distribusi Tweet berdasarkan Jam",
        barmode="stack",
    )
    fig_hour.update_layout(height=320, showlegend=True,
                           legend=dict(orientation="h", y=1.1))
    st.plotly_chart(fig_hour, use_container_width=True)

with col2:
    st.subheader("📆 Pola Tweet per Hari")
    day_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    day_id = {"Monday": "Senin", "Tuesday": "Selasa", "Wednesday": "Rabu",
              "Thursday": "Kamis", "Friday": "Jumat", "Saturday": "Sabtu", "Sunday": "Minggu"}

    weekly = df.copy()
    weekly["hari_nama_id"] = weekly["hari_nama"].map(day_id)
    weekly_grp = (
        weekly.groupby(["hari_nama", "hari_nama_id", "sentimen"])
        .size()
        .reset_index(name="jumlah")
    )
    weekly_grp["order"] = weekly_grp["hari_nama"].map(lambda x: day_order.index(x) if x in day_order else 7)
    weekly_grp = weekly_grp.sort_values("order")

    fig_week = px.bar(
        weekly_grp, x="hari_nama_id", y="jumlah", color="sentimen",
        color_discrete_map=COLOR_MAP,
        labels={"hari_nama_id": "Hari", "jumlah": "Jumlah Tweet"},
        title="Distribusi Tweet berdasarkan Hari",
        barmode="stack",
        category_orders={"hari_nama_id": list(day_id.values())},
    )
    fig_week.update_layout(height=320, showlegend=True,
                           legend=dict(orientation="h", y=1.1))
    st.plotly_chart(fig_week, use_container_width=True)

# ── Tren engagement ──────────────────────────────────────────────────────────
st.subheader("💥 Tren Engagement (Likes + Retweet)")

eng_daily = (
    df.groupby("hari")
    .agg(total_likes=("likes", "sum"), total_retweet=("retweet", "sum"))
    .reset_index()
)
eng_daily["hari"] = pd.to_datetime(eng_daily["hari"])

fig_eng = go.Figure()
fig_eng.add_trace(go.Scatter(
    x=eng_daily["hari"], y=eng_daily["total_likes"],
    name="Likes", mode="lines+markers",
    line=dict(color="#f59e0b", width=2),
    fill="tozeroy", fillcolor="rgba(245,158,11,0.1)"
))
fig_eng.add_trace(go.Scatter(
    x=eng_daily["hari"], y=eng_daily["total_retweet"],
    name="Retweet", mode="lines+markers",
    line=dict(color="#6366f1", width=2),
    fill="tozeroy", fillcolor="rgba(99,102,241,0.1)"
))
fig_eng.update_layout(
    height=320, hovermode="x unified",
    legend=dict(orientation="h", y=1.1),
    xaxis_title="Tanggal",
    yaxis_title="Jumlah Interaksi",
)
st.plotly_chart(fig_eng, use_container_width=True)

# ── Heatmap aktivitas ─────────────────────────────────────────────────────────
st.subheader("🗓️ Heatmap Aktivitas Jam × Hari")

heatmap_data = (
    df.groupby(["jam", "hari_nama"])
    .size()
    .reset_index(name="jumlah")
)
heatmap_pivot = heatmap_data.pivot(index="jam", columns="hari_nama", values="jumlah").fillna(0)

day_order_present = [d for d in ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
                     if d in heatmap_pivot.columns]
heatmap_pivot = heatmap_pivot[day_order_present]
heatmap_pivot.columns = [{"Monday":"Sen","Tuesday":"Sel","Wednesday":"Rab",
                           "Thursday":"Kam","Friday":"Jum","Saturday":"Sab","Sunday":"Min"}.get(c, c)
                          for c in heatmap_pivot.columns]

fig_heat = px.imshow(
    heatmap_pivot,
    labels=dict(x="Hari", y="Jam", color="Jumlah Tweet"),
    color_continuous_scale="Greens",
    aspect="auto",
    title="Aktivitas Tweet per Jam dan Hari",
)
fig_heat.update_layout(height=400)
st.plotly_chart(fig_heat, use_container_width=True)
