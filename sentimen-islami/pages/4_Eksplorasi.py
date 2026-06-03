import streamlit as st
import pandas as pd
import plotly.express as px

from src.utils import require_analysis
from src.sentiment import COLOR_MAP, EMOJI_MAP

st.set_page_config(page_title="Eksplorasi Data", page_icon="🔍", layout="wide")

st.title("🔍 Eksplorasi Data Tweet")
st.caption("Jelajahi dan filter data tweet secara interaktif")
st.divider()

df = require_analysis()

# ── Filter panel ──────────────────────────────────────────────────────────────
with st.expander("🎛️ Filter Data", expanded=True):
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        sentimen_filter = st.multiselect(
            "Sentimen", options=["Positif", "Netral", "Negatif"],
            default=["Positif", "Netral", "Negatif"]
        )
    with col2:
        min_likes = st.slider("Minimum Likes", 0, int(df["likes"].max()), 0)
    with col3:
        min_rt = st.slider("Minimum Retweet", 0, int(df["retweet"].max()), 0)
    with col4:
        keyword = st.text_input("Kata kunci dalam tweet", placeholder="cth: islami, konten")

    date_min, date_max = df["tanggal"].min().date(), df["tanggal"].max().date()
    date_range = st.date_input(
        "Rentang tanggal", value=(date_min, date_max),
        min_value=date_min, max_value=date_max,
    )

# ── Terapkan filter ──────────────────────────────────────────────────────────
filtered = df[df["sentimen"].isin(sentimen_filter)]
filtered = filtered[filtered["likes"] >= min_likes]
filtered = filtered[filtered["retweet"] >= min_rt]

if len(date_range) == 2:
    start, end = date_range
    filtered = filtered[(filtered["hari"] >= start) & (filtered["hari"] <= end)]

if keyword.strip():
    filtered = filtered[filtered["teks"].str.contains(keyword.strip(), case=False, na=False)]

# ── Ringkasan filter ─────────────────────────────────────────────────────────
c1, c2, c3, c4 = st.columns(4)
c1.metric("Hasil Filter", f"{len(filtered):,} tweet")
c2.metric("Total Likes", f"{filtered['likes'].sum():,}")
c3.metric("Total Retweet", f"{filtered['retweet'].sum():,}")
c4.metric("Pengguna Unik", f"{filtered['username'].nunique():,}")

st.divider()

# ── Scatter engagement ────────────────────────────────────────────────────────
st.subheader("💎 Peta Engagement Tweet")
fig_scatter = px.scatter(
    filtered, x="likes", y="retweet",
    color="sentimen", color_discrete_map=COLOR_MAP,
    hover_data={"username": True, "teks": True, "sentimen": True},
    labels={"likes": "Likes", "retweet": "Retweet", "sentimen": "Sentimen"},
    title="Sebaran Likes vs Retweet",
    size="engagement", size_max=20,
    opacity=0.7,
)
fig_scatter.update_layout(height=380, legend=dict(orientation="h", y=1.1))
st.plotly_chart(fig_scatter, use_container_width=True)

# ── Tabel tweet ───────────────────────────────────────────────────────────────
st.subheader("📋 Data Tweet")

sort_by = st.selectbox("Urutkan berdasarkan:", ["tanggal", "likes", "retweet", "skor_sentimen"])
sort_asc = st.checkbox("Urutan naik", value=False)

display_df = (
    filtered[["tanggal", "username", "teks", "sentimen", "skor_sentimen", "likes", "retweet"]]
    .sort_values(sort_by, ascending=sort_asc)
    .rename(columns={
        "tanggal": "Tanggal", "username": "Pengguna", "teks": "Tweet",
        "sentimen": "Sentimen", "skor_sentimen": "Skor", "likes": "Likes", "retweet": "Retweet"
    })
)

def highlight_sentimen(row):
    colors = {"Positif": "#d1fae5", "Netral": "#ede9fe", "Negatif": "#fee2e2"}
    c = colors.get(row["Sentimen"], "")
    return [f"background-color: {c}" if col == "Sentimen" else "" for col in row.index]

st.dataframe(
    display_df.style.apply(highlight_sentimen, axis=1),
    use_container_width=True, hide_index=True, height=450,
)

# ── Export ────────────────────────────────────────────────────────────────────
st.divider()
col_exp1, col_exp2 = st.columns(2)
with col_exp1:
    csv = display_df.to_csv(index=False).encode("utf-8")
    st.download_button(
        "📥 Unduh Hasil Filter (CSV)", data=csv,
        file_name="hasil_sentimen_islami.csv", mime="text/csv",
    )
with col_exp2:
    st.caption(f"Total {len(display_df):,} tweet diekspor")

# ── Top pengguna ──────────────────────────────────────────────────────────────
st.divider()
st.subheader("👥 Top 10 Pengguna Paling Aktif")

top_users = (
    filtered.groupby("username")
    .agg(
        jumlah_tweet=("id", "count"),
        total_likes=("likes", "sum"),
        total_retweet=("retweet", "sum"),
        sentimen_dominan=("sentimen", lambda x: x.value_counts().index[0]),
    )
    .reset_index()
    .nlargest(10, "jumlah_tweet")
    .rename(columns={
        "username": "Pengguna", "jumlah_tweet": "Jumlah Tweet",
        "total_likes": "Total Likes", "total_retweet": "Total Retweet",
        "sentimen_dominan": "Sentimen Dominan"
    })
)
st.dataframe(top_users, use_container_width=True, hide_index=True)
