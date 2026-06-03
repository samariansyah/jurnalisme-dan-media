import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

from src.utils import require_analysis
from src.sentiment import COLOR_MAP, EMOJI_MAP

st.set_page_config(page_title="Analisis Sentimen", page_icon="💬", layout="wide")

st.title("💬 Analisis Sentimen")
st.caption("Distribusi dan breakdown sentimen tweet konten Islami")
st.divider()

df = require_analysis()

# ── Pilih granularitas waktu ──────────────────────────────────────────────────
granularity = st.radio(
    "Tampilkan tren per:", ["Hari", "Minggu", "Bulan"],
    horizontal=True, index=1
)
col_map = {"Hari": "hari", "Minggu": "minggu", "Bulan": "bulan"}
time_col = col_map[granularity]

# ── Tren sentimen ─────────────────────────────────────────────────────────────
st.subheader("📈 Tren Sentimen Waktu")

trend = (
    df.groupby([time_col, "sentimen"])
    .size()
    .reset_index(name="jumlah")
)
trend[time_col] = trend[time_col].astype(str)

fig_trend = px.line(
    trend, x=time_col, y="jumlah", color="sentimen",
    color_discrete_map=COLOR_MAP,
    markers=True,
    labels={time_col: granularity, "jumlah": "Jumlah Tweet", "sentimen": "Sentimen"},
    title=f"Jumlah Tweet per Sentimen ({granularity})",
)
fig_trend.update_layout(height=350, hovermode="x unified",
                        legend=dict(orientation="h", y=1.1))
st.plotly_chart(fig_trend, use_container_width=True)

# ── Distribusi & breakdown ────────────────────────────────────────────────────
col1, col2 = st.columns(2)

with col1:
    st.subheader("🥧 Distribusi Sentimen")
    sent_cnt = df["sentimen"].value_counts().reset_index()
    sent_cnt.columns = ["Sentimen", "Jumlah"]
    fig_donut = px.pie(
        sent_cnt, values="Jumlah", names="Sentimen",
        color="Sentimen", color_discrete_map=COLOR_MAP,
        hole=0.5,
    )
    fig_donut.update_traces(textinfo="percent+label")
    fig_donut.update_layout(height=320, showlegend=False,
                            margin=dict(t=10, b=0, l=0, r=0))
    st.plotly_chart(fig_donut, use_container_width=True)

with col2:
    st.subheader("📊 Skor Kepercayaan Model")
    fig_box = px.box(
        df, x="sentimen", y="skor_sentimen",
        color="sentimen", color_discrete_map=COLOR_MAP,
        labels={"sentimen": "Sentimen", "skor_sentimen": "Skor Kepercayaan"},
        points="outliers",
    )
    fig_box.update_layout(height=320, showlegend=False,
                          margin=dict(t=10, b=0))
    st.plotly_chart(fig_box, use_container_width=True)

# ── Sentimen vs Engagement ─────────────────────────────────────────────────────
st.subheader("💡 Sentimen vs Engagement")

eng = (
    df.groupby("sentimen")
    .agg(avg_likes=("likes", "mean"), avg_retweet=("retweet", "mean"),
         total=("id", "count"))
    .reset_index()
)

col3, col4 = st.columns(2)
with col3:
    fig_likes = px.bar(
        eng, x="sentimen", y="avg_likes", color="sentimen",
        color_discrete_map=COLOR_MAP,
        labels={"sentimen": "Sentimen", "avg_likes": "Rata-rata Likes"},
        title="Rata-rata Likes per Sentimen",
        text_auto=".1f",
    )
    fig_likes.update_layout(showlegend=False, height=280)
    st.plotly_chart(fig_likes, use_container_width=True)

with col4:
    fig_rt = px.bar(
        eng, x="sentimen", y="avg_retweet", color="sentimen",
        color_discrete_map=COLOR_MAP,
        labels={"sentimen": "Sentimen", "avg_retweet": "Rata-rata Retweet"},
        title="Rata-rata Retweet per Sentimen",
        text_auto=".1f",
    )
    fig_rt.update_layout(showlegend=False, height=280)
    st.plotly_chart(fig_rt, use_container_width=True)

# ── Tabel ringkasan ───────────────────────────────────────────────────────────
st.subheader("📋 Ringkasan Statistik per Sentimen")
summary = (
    df.groupby("sentimen")
    .agg(
        jumlah=("id", "count"),
        persen=("id", lambda x: f"{len(x)/len(df)*100:.1f}%"),
        total_likes=("likes", "sum"),
        total_retweet=("retweet", "sum"),
        avg_skor=("skor_sentimen", "mean"),
    )
    .reset_index()
    .rename(columns={
        "sentimen": "Sentimen", "jumlah": "Jumlah Tweet",
        "persen": "Persentase", "total_likes": "Total Likes",
        "total_retweet": "Total Retweet", "avg_skor": "Rata-rata Skor"
    })
)
summary["Rata-rata Skor"] = summary["Rata-rata Skor"].round(4)
st.dataframe(summary, use_container_width=True, hide_index=True)
