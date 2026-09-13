const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface PredictionRequest {
  model_name: string;
  Platform: string;
  Follower_Count: number;
  Content_Type: string;
  Content_Length: number;
  Category: string;
  Time_Period: string;
}

export interface PredictionResult {
  model_name: string;
  prediction: string;
  prediction_label: number;
  high_engagement_probability: number;
}

export interface CompareAllResult {
  logistic_regression: {
    prediction: string;
    prediction_label: number;
    probability: number;
  };
  decision_tree: {
    prediction: string;
    prediction_label: number;
    probability: number;
  };
  random_forest: {
    prediction: string;
    prediction_label: number;
    probability: number;
  };
}

export interface Options {
  platforms: string[];
  content_types: string[];
  categories: string[];
  time_periods: string[];
}

export interface DatasetInfo {
  total_rows: number;
  total_columns: number;
  columns: string[];
  engagement_class_distribution: Record<string, number>;
  platform_distribution: Record<string, number>;
  content_type_distribution: Record<string, number>;
  category_distribution: Record<string, number>;
  time_period_distribution: Record<string, number>;
  numeric_stats: Record<string, Record<string, number>>;
}

async function fetchWithRetry<T>(path: string, options?: RequestInit, retries = 2, delayMs = 3000): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(error.detail || "API request failed");
      }
      return res.json();
    } catch (err) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Request failed");
}

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  return fetchWithRetry<T>(path, options);
}

export async function getHealth() {
  return fetchAPI<{ status: string; models_loaded: string[]; dataset_rows: number }>("/health");
}

export async function getOptions() {
  return fetchAPI<Options>("/options");
}

export async function predict(req: PredictionRequest) {
  return fetchAPI<PredictionResult>("/predict", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function predictAll(req: Omit<PredictionRequest, "model_name">) {
  return fetchAPI<CompareAllResult>("/predict-all", {
    method: "POST",
    body: JSON.stringify({ model_name: "random_forest", ...req }),
  });
}

export async function getDatasetInfo() {
  return fetchAPI<DatasetInfo>("/dataset-info");
}

export interface DatasetPreview {
  rows: Record<string, string | number>[];
  columns: string[];
}

export async function getDatasetPreview() {
  return fetchAPI<DatasetPreview>("/dataset-preview");
}
