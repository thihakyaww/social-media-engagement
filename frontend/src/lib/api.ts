import {
  mockHealth,
  mockOptions,
  mockDatasetInfo,
  mockDatasetPreview,
  mockPredict,
  mockPredictAll,
} from "./mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface PredictionRequest {
  model_name: string;
  Platform: string;
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

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || "API request failed");
  }
  return res.json();
}

export async function getHealth() {
  try {
    return await fetchAPI<{ status: string; models_loaded: string[]; dataset_rows: number }>("/health");
  } catch {
    return mockHealth;
  }
}

export async function getOptions() {
  try {
    return await fetchAPI<Options>("/options");
  } catch {
    return mockOptions;
  }
}

export async function predict(req: PredictionRequest) {
  try {
    return await fetchAPI<PredictionResult>("/predict", {
      method: "POST",
      body: JSON.stringify(req),
    });
  } catch {
    return mockPredict();
  }
}

export async function predictAll(req: Omit<PredictionRequest, "model_name">) {
  try {
    return await fetchAPI<CompareAllResult>("/predict-all", {
      method: "POST",
      body: JSON.stringify({ model_name: "random_forest", ...req }),
    });
  } catch {
    return mockPredictAll();
  }
}

export async function getDatasetInfo() {
  try {
    return await fetchAPI<DatasetInfo>("/dataset-info");
  } catch {
    return mockDatasetInfo;
  }
}

export interface DatasetPreview {
  rows: Record<string, string | number>[];
  columns: string[];
}

export async function getDatasetPreview() {
  try {
    return await fetchAPI<DatasetPreview>("/dataset-preview");
  } catch {
    return mockDatasetPreview;
  }
}
