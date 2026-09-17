import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI(
    title="Social Media Engagement Prediction API",
    description="Data Mining project - Predict social media post engagement",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
DATA_DIR = os.path.join(BASE_DIR, "data")

models = {}
df = None

MODEL_FILES = {
    "logistic_regression": "logistic_regression_model.pkl",
    "decision_tree": "decision_tree_model.pkl",
    "random_forest": "random_forest_model.pkl",
}

PLATFORM_VALUES = ["Instagram", "Twitter", "Facebook", "TikTok", "LinkedIn", "YouTube"]
CONTENT_TYPE_VALUES = [
    "Video", "Story", "Poll", "Post", "Live", "Carousel", "Photo",
    "Reel", "Stitch", "Retweet", "Duet", "Tweet", "Thread",
    "Community Post", "Document", "Short", "Article"
]
CATEGORY_VALUES = [
    "Gaming", "Lifestyle", "Technology", "Entertainment", "Fashion",
    "Food", "Education", "Sports", "Health", "Travel", "Fitness", "Business"
]
TIME_PERIOD_VALUES = ["Morning", "Afternoon", "Evening", "Night"]


@app.on_event("startup")
def load_models():
    global models, df
    for name, filename in MODEL_FILES.items():
        path = os.path.join(MODELS_DIR, filename)
        models[name] = joblib.load(path)
    csv_path = os.path.join(DATA_DIR, "new_social_media_engagement_cleaned.csv")
    df = pd.read_csv(csv_path)


class PredictionRequest(BaseModel):
    model_name: str = Field(..., description="Model to use: logistic_regression, decision_tree, or random_forest")
    Platform: str = Field(..., description="Social media platform")
    Content_Type: str = Field(..., description="Type of content")
    Content_Length: int = Field(..., ge=0, description="Content length in characters")
    Category: str = Field(..., description="Content category")
    Time_Period: str = Field(..., description="Time period: Morning, Afternoon, Evening, Night")


class SinglePredictionResponse(BaseModel):
    model_name: str
    prediction: str
    prediction_label: int
    high_engagement_probability: float


class CompareAllResponse(BaseModel):
    logistic_regression: dict
    decision_tree: dict
    random_forest: dict


@app.get("/")
def root():
    return {
        "message": "Social Media Engagement Prediction API",
        "version": "1.0.0",
        "endpoints": {
            "GET /health": "Health check",
            "POST /predict": "Single model prediction",
            "POST /predict-all": "Compare all models",
            "GET /options": "Get available input options",
        }
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "models_loaded": list(models.keys()),
        "dataset_rows": len(df) if df is not None else 0,
    }


@app.get("/options")
def get_options():
    return {
        "platforms": PLATFORM_VALUES,
        "content_types": CONTENT_TYPE_VALUES,
        "categories": CATEGORY_VALUES,
        "time_periods": TIME_PERIOD_VALUES,
    }


@app.post("/predict", response_model=SinglePredictionResponse)
def predict(req: PredictionRequest):
    if req.model_name not in models:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid model_name: {req.model_name}. Choose from: {list(models.keys())}"
        )

    model = models[req.model_name]

    input_df = pd.DataFrame([{
        "Platform": req.Platform,
        "Content_Type": req.Content_Type,
        "Content_Length": req.Content_Length,
        "Category": req.Category,
        "Time_Period": req.Time_Period,
    }])

    prediction = model.predict(input_df)[0]
    proba = model.predict_proba(input_df)[0]

    high_engagement_prob = float(proba[1])

    return SinglePredictionResponse(
        model_name=req.model_name,
        prediction="High Engagement" if prediction == 1 else "Low Engagement",
        prediction_label=int(prediction),
        high_engagement_probability=round(high_engagement_prob, 4),
    )


@app.post("/predict-all", response_model=CompareAllResponse)
def predict_all(req: PredictionRequest):
    input_df = pd.DataFrame([{
        "Platform": req.Platform,
        "Content_Type": req.Content_Type,
        "Content_Length": req.Content_Length,
        "Category": req.Category,
        "Time_Period": req.Time_Period,
    }])

    results = {}
    for name, model in models.items():
        prediction = model.predict(input_df)[0]
        proba = model.predict_proba(input_df)[0]
        results[name] = {
            "prediction": "High Engagement" if prediction == 1 else "Low Engagement",
            "prediction_label": int(prediction),
            "probability": round(float(proba[1]), 4),
        }

    return CompareAllResponse(**results)


@app.get("/dataset-preview")
def dataset_preview():
    if df is None:
        raise HTTPException(status_code=500, detail="Dataset not loaded")
    preview = df.head(10).to_dict(orient="records")
    for row in preview:
        for k, v in row.items():
            if isinstance(v, (int, float)):
                row[k] = round(v, 2) if isinstance(v, float) else v
    return {"rows": preview, "columns": df.columns.tolist()}


@app.get("/dataset-info")
def dataset_info():
    if df is None:
        raise HTTPException(status_code=500, detail="Dataset not loaded")

    numeric_stats = df.describe().to_dict()
    engagement_class_dist = df["Engagement_Class"].value_counts().to_dict() if "Engagement_Class" in df.columns else {}
    platform_dist = df["Platform"].value_counts().to_dict() if "Platform" in df.columns else {}
    content_type_dist = df["Content_Type"].value_counts().to_dict() if "Content_Type" in df.columns else {}
    category_dist = df["Category"].value_counts().to_dict() if "Category" in df.columns else {}
    time_period_dist = df["Time_Period"].value_counts().to_dict() if "Time_Period" in df.columns else {}

    return {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "columns": df.columns.tolist(),
        "engagement_class_distribution": engagement_class_dist,
        "platform_distribution": platform_dist,
        "content_type_distribution": content_type_dist,
        "category_distribution": category_dist,
        "time_period_distribution": time_period_dist,
        "numeric_stats": numeric_stats,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
