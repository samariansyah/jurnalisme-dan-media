import streamlit as st
import pandas as pd
import plotly.express as px

from src.utils import load_data
from src.preprocessing import preprocess_dataframe
from src.sentiment import run_sentiment_analysis, COLOR_MAP, EMOJI_MAP

st.set_page_config(
    page_title="Sentimen Konten Islami",
    page_icon="☪️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Sidebar ──────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## ☪️ Sentimen Islami")
    st.caption("Analisis minat membaca konten Islami\ndi Twitter/X Indonesia")
    st.divider()

    uploaded = st.file_uploader("Upload tweets.csv", type=["csv"],
                                help="Kolom wajib: id, tanggal, username, teks, likes, retweet")
    if uploaded:
        load_data.clear()

    st.divider()
    st.caption("🎓 Penelitian S3 Komunikasi & Penyiaran Islam")

# ── Load & preprocess ─────────────────────────────────────────────────────────
df_raw = load_data(uploaded)
df = preprocess_dataframe(df_raw)

if "df_processed" not in st.session_state:
    st.session_state["df_processed"] = df
else:
    st.session_state["df_processed"] = df

# ── Header ────────────────────────────────────────────────────────────────────
st.title("☪️ Dashboard Analisis Sentimen")
st.subheader("Minat Membaca Konten Islami di Twitter/X Indonesia")
st.caption(
    f"📅 Rentang data: **{df['tanggal'].min().date()}** s.d. **{df['tanggal'].max().date()}**  "
    f"&nbsp;|&nbsp; 📊 Total tweet: **{len(df):,}**"
)
st.divider()

# ── Statistik ringkas ─────────────────────────────────────────────────────────
c1, c2, c3, c4, c5 = st.columns(5)
c1.metric("🐦 Total Tweet", f"{len(df):,}")
c2.metric("❤️ Total Likes", f"{df['likes'].sum():,}")
c3.metric("🔁 Total Retweet", f"{df['retweet'].sum():,}")
c4.metric("👤 Pengguna Unik", f"{df['username'].nunique():,}")
c5.metric("📅 Hari Aktif", f"{df['hari'].nunique():,}")

st.divider()

# ── Run Analisis ──────────────────────────────────────────────────────────────
st.subheader("🔍 Analisis Sentimen")

col_btn, col_note = st.columns([1, 3])
with col_btn:
    run_btn = st.button("▶ Jalankan Analisis Sentimen", type="primary", use_container_width=True)
with col_note:
    st.info(
        "Model **IndoBERT** (`mdhugol/indonesia-bert-sentiment-classification`) akan menganalisis "
        "sentimen setiap tweet. Proses pertama memerlukan unduhan model (~500 MB)."
    )

if run_btn:
    with st.spinner("Sedang menganalisis sentimen tweet..."):
        df_analyzed = run_sentiment_analysis(df)
        st.session_state["df_analyzed"] = df_analyzed
    st.success("✅ Analisis selesai! Lihat halaman di sidebar untuk detail visualisasi.")
    st.balloons()

# ── Hasil Analisis ────────────────────────────────────────────────────────────
if st.session_state.get("df_analyzed") is not None:
    df_a = st.session_state["df_analyzed"]

    st.divider()
    st.subheader("📊 Ringkasan Hasil")

    sent_counts = df_a["sentimen"].value_counts().reset_index()
    sent_counts.columns = ["Sentimen", "Jumlah"]
    total = len(df_a)

    # Metric per sentimen
    cols = st.columns(3)
    for i, (_, row) in enumerate(sent_counts.iterrows()):
        pct = row["Jumlah"] / total * 100
        emoji = EMOJI_MAP.get(row["Sentimen"], "")
        cols[i].metric(
            f"{emoji} {row['Sentimen']}",
            f"{row['Jumlah']:,} tweet",
            f"{pct:.1f}%",
        )

    col_pie, col_top = st.columns([1, 2])

    with col_pie:
        fig = px.pie(
            sent_counts, values="Jumlah", names="Sentimen",
            color="Sentimen", color_discrete_map=COLOR_MAP,
            hole=0.45, title="Distribusi Sentimen"
        )
        fig.update_layout(height=320, margin=dict(t=40, b=0, l=0, r=0),
                          legend=dict(orientation="h", y=-0.1))
        st.plotly_chart(fig, use_container_width=True)

    with col_top:
        st.markdown("**Tweet Paling Viral (berdasarkan Likes)**")
        top5 = (
            df_a.nlargest(5, "likes")[["username", "teks", "likes", "retweet", "sentimen"]]
            .rename(columns={"username": "Pengguna", "teks": "Tweet",
                             "likes": "Likes", "retweet": "Retweet", "sentimen": "Sentimen"})
        )
        st.dataframe(top5, use_container_width=True, hide_index=True, height=280)

else:
    st.divider()
    st.subheader("👀 Preview Data")
    st.dataframe(
        df[["tanggal", "username", "teks", "likes", "retweet"]].head(10),
        use_container_width=True, hide_index=True,
    )
    st.caption("Jalankan analisis sentimen untuk melihat visualisasi lengkap.")
