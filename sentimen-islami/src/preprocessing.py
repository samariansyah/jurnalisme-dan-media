import re
import pandas as pd

STOPWORDS_ID = {
    "yang", "dan", "di", "ke", "dari", "ini", "itu", "dengan", "untuk",
    "adalah", "pada", "ada", "juga", "tidak", "bisa", "dalam", "akan",
    "sudah", "saya", "kami", "kita", "mereka", "dia", "ia", "anda",
    "kamu", "nya", "pun", "nih", "sih", "deh", "dong", "loh", "kan",
    "ya", "yg", "yah", "ga", "gak", "nggak", "ngga", "gk", "udah",
    "udh", "mau", "buat", "kalau", "kalo", "tapi", "atau", "karena",
    "karna", "sama", "lebih", "sangat", "banget", "sekali", "paling",
    "jadi", "lagi", "lg", "masih", "belum", "sdh", "blm", "emang",
    "memang", "aja", "saja", "hanya", "cuma", "punya", "maka", "jika",
    "bila", "ketika", "saat", "waktu", "setelah", "sebelum", "tentang",
    "oleh", "bagi", "atas", "bawah", "lain", "semua", "setiap", "para",
    "pak", "bu", "mas", "mba", "kak", "bang", "om", "tante", "rt",
    "nya", "ku", "mu", "si", "the", "a", "an", "is", "in", "of", "to"
}


def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)   # hapus URL
    text = re.sub(r"@\w+", "", text)                        # hapus mention
    text = re.sub(r"#(\w+)", r"\1", text)                  # simpan kata dari hashtag
    text = re.sub(r"[^\w\s]", " ", text)                   # hapus tanda baca
    text = re.sub(r"\d+", "", text)                         # hapus angka
    text = re.sub(r"\s+", " ", text).strip()               # normalize spasi
    return text


def remove_stopwords(text: str) -> str:
    return " ".join(w for w in text.split() if w not in STOPWORDS_ID and len(w) > 2)


def preprocess_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")
    df = df.dropna(subset=["tanggal", "teks"])
    df["teks_bersih"] = df["teks"].apply(clean_text)
    df["teks_wc"] = df["teks_bersih"].apply(remove_stopwords)
    df["bulan"] = df["tanggal"].dt.to_period("M").astype(str)
    df["minggu"] = df["tanggal"].dt.to_period("W").astype(str)
    df["hari"] = df["tanggal"].dt.date
    df["hari_nama"] = df["tanggal"].dt.day_name()
    df["jam"] = df["tanggal"].dt.hour
    df["engagement"] = df["likes"] + df["retweet"]
    return df
