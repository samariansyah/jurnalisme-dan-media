import streamlit as st
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from collections import Counter
import pandas as pd

from src.utils import require_analysis
from src.sentiment import COLOR_MAP

st.set_page_config(page_title="Word Cloud", page_icon="☁️", layout="wide")

st.title("☁️ Word Cloud & Frekuensi Kata")
st.caption("Visualisasi kata yang paling sering muncul berdasarkan sentimen")
st.divider()

df = require_analysis()


def make_wordcloud(text: str, color: str) -> plt.Figure:
    if not text.strip():
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.text(0.5, 0.5, "Tidak ada data", ha="center", va="center", fontsize=14)
        ax.axis("off")
        return fig

    def color_func(*args, **kwargs):
        return color

    wc = WordCloud(
        width=800, height=400,
        background_color="white",
        color_func=color_func,
        max_words=100,
        collocations=False,
        min_word_length=3,
    ).generate(text)

    fig, ax = plt.subplots(figsize=(8, 4))
    ax.imshow(wc, interpolation="bilinear")
    ax.axis("off")
    plt.tight_layout(pad=0)
    return fig


# ── Pilih mode ────────────────────────────────────────────────────────────────
mode = st.radio("Tampilkan word cloud untuk:",
                ["Semua Tweet", "Positif", "Netral", "Negatif"],
                horizontal=True)

if mode == "Semua Tweet":
    all_text = " ".join(df["teks_wc"].dropna())
    st.subheader("☁️ Word Cloud — Semua Tweet")
    fig = make_wordcloud(all_text, "#6366f1")
    st.pyplot(fig)

    col1, col2, col3 = st.columns(3)
    sentimen_list = ["Positif", "Netral", "Negatif"]
    cols = [col1, col2, col3]
    hex_colors = [COLOR_MAP["Positif"], COLOR_MAP["Netral"], COLOR_MAP["Negatif"]]

    for col, sent, color in zip(cols, sentimen_list, hex_colors):
        subset = df[df["sentimen"] == sent]["teks_wc"].dropna()
        text = " ".join(subset)
        with col:
            st.markdown(f"**{sent}** ({len(subset)} tweet)")
            fig_s = make_wordcloud(text, color)
            st.pyplot(fig_s)
else:
    subset = df[df["sentimen"] == mode]
    text = " ".join(subset["teks_wc"].dropna())
    st.subheader(f"☁️ Word Cloud — Sentimen {mode}")
    fig = make_wordcloud(text, COLOR_MAP[mode])
    st.pyplot(fig)

st.divider()

# ── Top kata per sentimen ──────────────────────────────────────────────────────
st.subheader("📊 Top 20 Kata Terbanyak per Sentimen")

cols = st.columns(3)
for col, sent, color in zip(
    cols,
    ["Positif", "Netral", "Negatif"],
    [COLOR_MAP["Positif"], COLOR_MAP["Netral"], COLOR_MAP["Negatif"]]
):
    subset_text = " ".join(df[df["sentimen"] == sent]["teks_wc"].dropna())
    words = subset_text.split()
    counter = Counter(words).most_common(20)
    if not counter:
        col.warning(f"Tidak ada data untuk sentimen {sent}")
        continue
    df_freq = pd.DataFrame(counter, columns=["Kata", "Frekuensi"])
    with col:
        import plotly.express as px
        fig_bar = px.bar(
            df_freq.sort_values("Frekuensi"),
            x="Frekuensi", y="Kata",
            orientation="h",
            color_discrete_sequence=[color],
            title=f"Sentimen {sent}",
        )
        fig_bar.update_layout(height=500, margin=dict(t=40, b=0),
                              yaxis=dict(autorange="reversed"))
        st.plotly_chart(fig_bar, use_container_width=True)
