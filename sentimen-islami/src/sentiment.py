import streamlit as st
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification

MODEL_NAME = "mdhugol/indonesia-bert-sentiment-classification"

LABEL_MAP = {
    "LABEL_0": "Positif",
    "LABEL_1": "Netral",
    "LABEL_2": "Negatif",
}

COLOR_MAP = {
    "Positif": "#10b981",
    "Netral":  "#6366f1",
    "Negatif": "#ef4444",
}

EMOJI_MAP = {
    "Positif": "😊",
    "Netral":  "😐",
    "Negatif": "😔",
}


@st.cache_resource(show_spinner="Memuat model IndoBERT sentimen...")
def load_model():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    return pipeline(
        "text-classification",
        model=model,
        tokenizer=tokenizer,
        device=-1,  # CPU
    )


@st.cache_data(show_spinner=False)
def _analyze_batch(texts: tuple) -> list:
    classifier = load_model()
    results = []
    batch_size = 32
    texts_list = list(texts)
    for i in range(0, len(texts_list), batch_size):
        batch = [t[:400] for t in texts_list[i : i + batch_size]]
        preds = classifier(batch, truncation=True, max_length=128)
        results.extend(preds)
    return [
        {
            "sentimen": LABEL_MAP.get(r["label"], "Netral"),
            "skor": round(r["score"], 4),
        }
        for r in results
    ]


def run_sentiment_analysis(df):
    import pandas as pd
    texts = tuple(df["teks_bersih"].tolist())
    total = len(texts)
    progress = st.progress(0, text="Memulai analisis...")

    batch_size = 32
    all_results = []
    texts_list = list(texts)
    classifier = load_model()

    for i in range(0, total, batch_size):
        batch = [t[:400] for t in texts_list[i : i + batch_size]]
        preds = classifier(batch, truncation=True, max_length=128)
        all_results.extend(preds)
        pct = min(int((i + batch_size) / total * 100), 100)
        progress.progress(pct, text=f"Menganalisis tweet {min(i+batch_size, total)}/{total}...")

    progress.empty()

    df = df.copy()
    df["sentimen"] = [LABEL_MAP.get(r["label"], "Netral") for r in all_results]
    df["skor_sentimen"] = [round(r["score"], 4) for r in all_results]
    return df
