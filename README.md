# Social Media Engagement Analysis and Prediction Using Data Mining Techniques

A full-stack web application that analyzes social media engagement patterns and predicts post performance using Data Mining and Machine Learning techniques.

## Live Demo

[social-media-engagement-mining.vercel.app](https://social-media-engagement-mining.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Mining Workflow](#data-mining-workflow)
- [Machine Learning Models](#machine-learning-models)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

This project applies Data Mining techniques to a social media engagement dataset of **5,000 posts** across **6 platforms** to understand what drives engagement and predict whether a post will achieve high or low engagement before publishing.

The application covers the complete data mining pipeline:

- **Exploratory Data Analysis (EDA)** — distributions, correlations, skewness analysis
- **Descriptive Mining** — K-Medoids clustering and Apriori association rule mining
- **Predictive Mining** — classification using Logistic Regression, Decision Tree, and Random Forest
- **Live Prediction** — real-time engagement prediction through an interactive form

---

## Key Features

- **6 Pages**: Home, Dashboard, Analysis, Descriptive Mining, Predictive Mining, Live Predictor
- **3 Classification Models** trained on 5 selected features with preprocessing pipelines
- **Clustering Analysis** with K-Medoids (K=3) producing meaningful engagement tiers
- **Association Rule Mining** using Apriori algorithm with 258 frequent itemsets → 31 meaningful rules
- **Interactive Prediction** — single model or compare all three models simultaneously
- **Responsive Design** — works on desktop and mobile
- **Mock Data Fallback** — works offline when backend is unavailable

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS v4 | Utility-first styling |
| Recharts | Data visualization (bar, pie, radar charts) |
| Lucide React | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| Python 3.11 | Runtime |
| FastAPI | REST API framework |
| Pandas | Data manipulation |
| Scikit-learn 1.6.1 | Machine learning models |
| Joblib | Model serialization |
| Uvicorn | ASGI server |

### Deployment

| Platform | Service |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting (Docker) |
| GitHub | Version control with auto-deploy |

---

## Project Structure

```
social-media-engagement/
├── backend/
│   ├── main.py                          # FastAPI application
│   ├── requirements.txt                 # Python dependencies
│   ├── models/
│   │   ├── logistic_regression_model.pkl
│   │   ├── decision_tree_model.pkl
│   │   └── random_forest_model.pkl
│   └── data/
│       └── new_social_media_engagement_cleaned.csv
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Home page
│   │   │   ├── layout.tsx              # Root layout
│   │   │   ├── globals.css             # Global styles
│   │   │   ├── dashboard/page.tsx      # Dashboard
│   │   │   ├── analysis/page.tsx       # EDA & Analysis
│   │   │   ├── descriptive/page.tsx    # Clustering & Association Rules
│   │   │   ├── predictive/page.tsx     # Model comparison & metrics
│   │   │   └── predict/page.tsx        # Live Predictor
│   │   ├── components/
│   │   │   ├── Navigation.tsx          # Sidebar navigation
│   │   │   └── SidebarProvider.tsx     # Sidebar state management
│   │   └── lib/
│   │       ├── api.ts                  # API client with mock fallback
│   │       └── mockData.ts            # Offline demo data
│   ├── public/
│   │   └── icon.svg                    # Application icon
│   ├── package.json
│   └── .env.local
├── final-data-mining.ipynb             # Jupyter notebook (source of truth)
├── Dockerfile                          # Backend container config
├── render.yaml                         # Render deployment config
├── runtime.txt                         # Python version for Render
└── .gitignore
```

---

## Data Mining Workflow

```
Data Collection (5,000 social media posts)
        │
        ▼
Data Cleaning (missing values, type conversion)
        │
        ▼
Feature Engineering (Engagement_Class, Time_Period)
        │
        ▼
Exploratory Data Analysis (distributions, correlations, skewness)
        │
        ▼
Feature Selection (Mutual Information + RF Importance → 5 features)
        │
        ├──▶ Clustering (K-Medoids, K=3)
        │       ├── Low Engagement (28.34%)
        │       ├── Moderate Engagement (48.58%)
        │       └── Viral (23.08%)
        │
        ├──▶ Association Rule Mining (Apriori)
        │       ├── 258 frequent itemsets
        │       └── 31 meaningful rules
        │
        └──▶ Classification (3 models)
                ├── Logistic Regression (Baseline)
                ├── Decision Tree (CART)
                └── Random Forest (Ensemble)
```

---

## Machine Learning Models

### Selected Features (5)

| Feature | Type | Description |
|---|---|---|
| Platform | Categorical | Social media platform (Instagram, YouTube, TikTok, etc.) |
| Content_Type | Categorical | Type of post (Video, Reel, Story, etc.) |
| Content_Length | Numerical | Character count of the post |
| Category | Categorical | Content category (Business, Tech, Entertainment, etc.) |
| Time_Period | Categorical | Time of posting (Morning, Afternoon, Evening, Night) |

> **Data Leakage Prevention**: Post-publication features (Likes, Comments, Shares, Saves, Views) were excluded since they are only known after publishing.

### Model Performance

| Classifier | Accuracy | Precision | Recall | F1-Score | ROC-AUC | 10-Fold CV |
|---|---|---|---|---|---|---|
| Logistic Regression | 69.6% | 79.17% | 53.2% | 63.64% | 76.94% | 0.6888 ± 0.0249 |
| Decision Tree (CART) | 68.0% | 87.50% | 42.0% | 56.76% | 75.28% | 0.6804 ± 0.0200 |
| Random Forest | 68.3% | 80.81% | 48.0% | 60.23% | 75.82% | 0.6820 ± 0.0143 |

### Feature Importance (Random Forest)

| Feature | Importance |
|---|---|
| Platform | 19.35% |
| Content_Type | 10.58% |
| Content_Length | 7.97% |
| Category | 7.65% |
| Time_Period | 3.87% |

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set environment variable
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API information |
| `GET` | `/health` | Health check and model status |
| `GET` | `/options` | Available input options (platforms, categories, etc.) |
| `GET` | `/dataset-info` | Dataset statistics and distributions |
| `GET` | `/dataset-preview` | First 10 rows of the dataset |
| `POST` | `/predict` | Single model prediction |
| `POST` | `/predict-all` | Compare predictions across all 3 models |

### Example Request

```json
POST /predict
{
  "model_name": "random_forest",
  "Platform": "Instagram",
  "Content_Type": "Video",
  "Content_Length": 500,
  "Category": "Technology",
  "Time_Period": "Evening"
}
```

### Example Response

```json
{
  "model_name": "random_forest",
  "prediction": "High Engagement",
  "prediction_label": 1,
  "high_engagement_probability": 0.7823
}
```

---

## Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set **Root Directory** to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render backend URL
4. Deploy

### Backend (Render)

1. Connect GitHub repository to Render
2. Render auto-detects the `Dockerfile`
3. Server builds with Python 3.11.8-slim
4. Models and data are bundled in the container

---

## Dataset

- **Source**: Social media engagement dataset
- **Size**: 5,000 rows × 20 columns
- **Platforms**: Instagram, YouTube, TikTok, Twitter, Facebook, LinkedIn
- **Content Types**: 17 types (Video, Reel, Story, Post, Tweet, etc.)
- **Categories**: 12 categories (Business, Health, Technology, etc.)
- **Target**: `Engagement_Class` (0 = Low, 1 = High) via median threshold binarization

---

## Authors

Built as a Data Mining course project demonstrating the complete data mining pipeline from data collection through deployment.

---

## License

This project is for academic purposes.
