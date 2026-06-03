from pathlib import Path
import pandas as pd
import streamlit as st

DATA_PATH = Path(__file__).parent.parent / "data" / "tweets.csv"
REQUIRED_COLS = {"id", "tanggal", "username", "teks", "likes", "retweet"}


@st.cache_data(show_spinner="Memuat data...")
def load_data(file=None) -> pd.DataFrame:
    if file is not None:
        df = pd.read_csv(file)
    elif DATA_PATH.exists():
        df = pd.read_csv(DATA_PATH)
    else:
        st.error("❌ File `data/tweets.csv` tidak ditemukan. Upload file melalui sidebar.")
        st.stop()

    missing = REQUIRED_COLS - set(df.columns)
    if missing:
        st.error(f"❌ Kolom berikut tidak ditemukan di CSV: `{missing}`")
        st.stop()

    return df


def get_analyzed_df():
    """Ambil dataframe yang sudah dianalisis dari session state."""
    if "df_analyzed" not in st.session_state or st.session_state["df_analyzed"] is None:
        return None
    return st.session_state["df_analyzed"]


def require_analysis():
    """Tampilkan pesan dan hentikan halaman jika analisis belum dijalankan."""
    df = get_analyzed_df()
    if df is None:
        st.warning("⚠️ Analisis sentimen belum dijalankan. Kembali ke halaman **Beranda** dan klik tombol **Jalankan Analisis**.")
        st.stop()
    return df
