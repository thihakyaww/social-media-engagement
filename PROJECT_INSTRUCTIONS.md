# Social Media Engagement Data Mining Website

## URGENT PROJECT INSTRUCTION

Build a complete working MVP website for my Data Mining project.

My deadline is today.

Do not stop after each step to ask for permission.
Inspect the existing files and make reasonable implementation decisions.

Focus on functionality and a professional academic design.

Do not waste time on complex animations or unnecessary features.

---

# EXISTING PROJECT FILES

The project folder contains:

- Logistic Regression model (.joblib)
- Decision Tree model (.joblib)
- Random Forest model (.joblib)
- new_social_media_engagement_cleaned.csv
- final_data_mining.ipynb

First inspect all existing files.

IMPORTANT:

Do not invent:

- Dataset statistics
- Model metrics
- Feature importance
- Association rules
- Clustering results
- ROC-AUC values
- Accuracy values

Use actual results from the dataset, notebook, and model files.

---

# PROJECT TITLE

Social Media Engagement Analysis and Prediction Using Data Mining Techniques

---

# PROJECT GOAL

Create a professional web application that demonstrates the complete data mining workflow and allows users to predict whether a social media post will receive:

- Low Engagement
- High Engagement

---

# TECHNOLOGY STACK

Frontend:

- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

Backend:

- Python
- FastAPI
- Uvicorn
- Pandas
- Scikit-learn
- Joblib

---

# REQUIRED ARCHITECTURE

Create this structure:

social-media-engagement/

frontend/
backend/

Keep the existing model files and dataset available.

Backend structure:

backend/
├── main.py
├── requirements.txt
├── models/
└── data/

Frontend structure:

frontend/
├── app/
├── components/
├── lib/
├── public/
└── package.json

---

# PHASE 1: INSPECT FILES

First inspect:

1. CSV dataset
2. Jupyter notebook
3. All joblib models

Determine:

## Dataset

- Total rows
- Total columns
- Column names
- Data types
- Missing values
- Actual categorical values

## Notebook

Extract actual:

- Feature engineering
- Target creation
- Selected features
- Clustering algorithm
- Cluster labels
- Association rules
- Model evaluation
- ROC-AUC
- Accuracy
- Feature importance

## Models

Verify:

- Models load successfully
- Expected input features
- Whether preprocessing is included
- predict() works
- predict_proba() works

---

# PHASE 2: BACKEND

Create FastAPI backend.

Create endpoints:

GET /

GET /health

POST /predict

POST /predict-all

---

# PREDICTION FEATURES

Use these six selected features:

- Platform
- Follower_Count
- Content_Type
- Content_Length
- Category
- Time_Period

Target:

Engagement_Class

Classes:

0 = Low Engagement

1 = High Engagement

---

# SINGLE MODEL PREDICTION

POST /predict

Request:

{
  "model_name": "random_forest",
  "Platform": "value",
  "Follower_Count": 10000,
  "Content_Type": "value",
  "Content_Length": 100,
  "Category": "value",
  "Time_Period": "value"
}

Supported models:

- logistic_regression
- decision_tree
- random_forest

Return:

- Model name
- Prediction
- Prediction label
- High Engagement probability

---

# COMPARE ALL MODELS

POST /predict-all

Use the same six inputs.

Run:

1. Logistic Regression
2. Decision Tree
3. Random Forest

Return results for all models.

Example:

{
  "logistic_regression": {
    "prediction": "High Engagement",
    "probability": 0.82
  },

  "decision_tree": {
    "prediction": "High Engagement",
    "probability": 0.91
  },

  "random_forest": {
    "prediction": "High Engagement",
    "probability": 0.88
  }
}

---

# IMPORTANT PREPROCESSING RULE

First inspect the saved models.

Determine whether:

- One-hot encoding
- Scaling
- Column transformation

is already included.

Do NOT apply preprocessing twice.

The backend must use the correct input format required by the saved models.

If models require preprocessing, reproduce the preprocessing based on the notebook and training pipeline.

---

# BACKEND TESTING

Test:

GET /health

POST /predict

POST /predict-all

Test all three models.

Fix errors before building the frontend connection.

---

# PHASE 3: FRONTEND

Create a modern professional academic website.

Pages:

1. Home
2. Dashboard
3. Analysis
4. Descriptive Mining
5. Predictive Mining
6. Live Predictor

---

# HOME PAGE

Route:

/

Show:

Title:

Social Media Engagement Intelligence

Subtitle:

Analyze social media engagement patterns and predict post performance using Data Mining and Machine Learning.

Buttons:

- Explore Analysis
- Predict Engagement

Show actual project statistics only.

---

# DASHBOARD

Route:

/dashboard

Show:

## Dataset Overview

- Total Posts
- Total Features
- Selected Features
- Classification Models

Use actual values.

Show Data Mining Workflow:

Data Collection
↓
Data Cleaning
↓
Feature Engineering
↓
EDA
↓
Feature Selection
↓
Clustering
↓
Association Rules
↓
Classification
↓
Evaluation
↓
Prediction

---

# ANALYSIS PAGE

Route:

/analysis

Show actual EDA results.

Include:

- Dataset overview
- Missing values
- Numerical analysis
- Categorical analysis
- Correlation analysis

Explain actual findings simply.

---

# FEATURE ENGINEERING

Explain:

Engagement_Class

Low Engagement = 0

High Engagement = 1

Use actual median threshold methodology from the notebook.

Also explain Time_Period if created from Hour_of_Day.

---

# DESCRIPTIVE MINING

Route:

/descriptive

Include:

## Clustering

Show:

- Algorithm
- Features
- Number of clusters
- Cluster labels
- Cluster distribution

Use actual notebook results.

## Association Rule Mining

Show actual rules.

Columns:

- Antecedent
- Consequent
- Support
- Confidence
- Lift

Explain:

Support = how frequently a pattern occurs.

Confidence = probability of the consequent given the antecedent.

Lift = strength compared with random occurrence.

Do not invent rules.

---

# PREDICTIVE MINING

Route:

/predictive

Show:

## Target

Engagement_Class

## Selected Features

Display:

1. Platform
2. Follower_Count
3. Content_Type
4. Content_Length
5. Category
6. Time_Period

Explain that feature selection used:

- Mutual Information
- Random Forest Feature Importance

---

# DATA LEAKAGE

Explain that post-publication features were excluded:

- Likes
- Comments
- Shares
- Saves
- Views

Explain simply:

These features are only known after publishing, so they cannot be used to predict engagement before publishing.

---

# CLASSIFICATION MODELS

Display:

## Logistic Regression

Linear probabilistic baseline.

## Decision Tree

Interpretable decision rules.

## Random Forest

Ensemble model using multiple decision trees.

Use actual performance results.

---

# MODEL PERFORMANCE

Display actual:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC
- 10-Fold Cross Validation

Do not invent values.

Display comparison table.

---

# LIVE PREDICTOR

Route:

/predict

Create a professional prediction form.

Inputs:

## Platform

Dropdown using actual dataset values.

## Follower Count

Number input.

Minimum:

0

## Content Type

Dropdown using actual dataset values.

## Content Length

Number input.

## Category

Dropdown using actual dataset values.

## Time Period

Dropdown using actual dataset values.

---

# PREDICTION MODE

Provide two options.

## Option 1

Single Model Prediction.

Allow user to choose:

- Logistic Regression
- Decision Tree
- Random Forest

## Option 2

Compare All Models.

Run the same input through all three models.

---

# RESULT DISPLAY

Single model result:

Prediction:

High Engagement

or

Low Engagement

Show:

High Engagement Probability

Show:

Model Used

---

# MODEL COMPARISON

Display:

| Model | Prediction | High Engagement Probability |
|------|------------|-----------------------------|
| Logistic Regression | High/Low | Percentage |
| Decision Tree | High/Low | Percentage |
| Random Forest | High/Low | Percentage |

Highlight the best model only if actual evaluation results confirm it.

---

# FRONTEND API CONNECTION

Use environment variable:

NEXT_PUBLIC_API_URL

Example local:

NEXT_PUBLIC_API_URL=http://localhost:8000

Use:

process.env.NEXT_PUBLIC_API_URL

Do not hardcode API URLs.

---

# CORS

Configure FastAPI for:

http://localhost:3000

Use environment variables for production URLs.

---

# DESIGN REQUIREMENTS

Design should be:

- Modern
- Professional
- Academic
- Clean
- Responsive
- Data focused

Use:

- Cards
- Tables
- Charts
- Icons
- Good spacing
- Clear typography

Avoid:

- Excessive animations
- Fake data
- Unnecessary features

---

# ERROR HANDLING

Add:

- Loading states
- API errors
- Form validation
- Invalid input messages

Prediction loading message:

Analyzing engagement patterns...

---

# FINAL TESTING

Verify:

## Backend

- Models load
- Health works
- Single prediction works
- Compare all models works

## Frontend

- Navigation works
- Forms work
- Prediction works
- Mobile responsive
- No broken pages

## Data

Verify:

No fake metrics.

No fake charts.

No fake association rules.

No fake clustering results.

---

# FINAL PRIORITY

Priority order:

1. Models must load
2. Backend prediction must work
3. Frontend must work
4. All project results must display
5. Live predictor must work
6. Responsive design
7. Deployment preparation

Do not spend too much time on animations.

Build a working MVP first.