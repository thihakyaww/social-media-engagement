"use client";

import { useState, useEffect } from "react";
import {
  predict,
  predictAll,
  getOptions,
  type Options,
  type PredictionResult,
  type CompareAllResult,
} from "@/lib/api";
import { Zap, BarChart3, Loader2 } from "lucide-react";

export default function Predict() {
  const [options, setOptions] = useState<Options | null>(null);
  const [platform, setPlatform] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [contentType, setContentType] = useState("");
  const [contentLength, setContentLength] = useState("");
  const [category, setCategory] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [modelName, setModelName] = useState("random_forest");
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [loading, setLoading] = useState(false);
  const [singleResult, setSingleResult] =
    useState<PredictionResult | null>(null);
  const [compareResult, setCompareResult] =
    useState<CompareAllResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getOptions()
      .then(setOptions)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSingleResult(null);
    setCompareResult(null);
    setLoading(true);

    const payload = {
      model_name: modelName,
      Platform: platform,
      Follower_Count: parseInt(followerCount) || 0,
      Content_Type: contentType,
      Content_Length: parseInt(contentLength) || 0,
      Category: category,
      Time_Period: timePeriod,
    };

    try {
      if (mode === "single") {
        const result = await predict(payload);
        setSingleResult(result);
      } else {
        const result = await predictAll(payload);
        setCompareResult(result);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Prediction failed. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputWrapper = "flex flex-col gap-1";

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        Live Predictor
      </h1>
      <p className="text-slate-500 mb-6">
        Predict whether a social media post will receive high or low engagement
      </p>

      <div className="card mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mode Selection */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-2">
            <button
              type="button"
              onClick={() => setMode("single")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "single"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Zap size={16} />
              Single Model
            </button>
            <button
              type="button"
              onClick={() => setMode("compare")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "compare"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <BarChart3 size={16} />
              Compare All Models
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className={inputWrapper}>
              <label className="form-label">Platform</label>
              <select
                className="form-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="">Select platform</option>
                {options?.platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className={inputWrapper}>
              <label className="form-label">Follower Count</label>
              <input
                type="number"
                className="form-input"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
                min={0}
                placeholder="e.g. 100000"
                required
              />
            </div>

            <div className={inputWrapper}>
              <label className="form-label">Content Type</label>
              <select
                className="form-select"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                required
              >
                <option value="">Select content type</option>
                {options?.content_types.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))}
              </select>
            </div>

            <div className={inputWrapper}>
              <label className="form-label">Content Length</label>
              <input
                type="number"
                className="form-input"
                value={contentLength}
                onChange={(e) => setContentLength(e.target.value)}
                min={0}
                placeholder="e.g. 500"
                required
              />
            </div>

            <div className={inputWrapper}>
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {options?.categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={inputWrapper}>
              <label className="form-label">Time Period</label>
              <select
                className="form-select"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                required
              >
                <option value="">Select time period</option>
                {options?.time_periods.map((tp) => (
                  <option key={tp} value={tp}>
                    {tp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {mode === "single" && (
            <div className={inputWrapper}>
              <label className="form-label">Model</label>
              <select
                className="form-select"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              >
                <option value="logistic_regression">
                  Logistic Regression
                </option>
                <option value="decision_tree">Decision Tree</option>
                <option value="random_forest">Random Forest</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing engagement patterns...
              </>
            ) : (
              <>
                <Zap size={18} />
                {mode === "single" ? "Predict Engagement" : "Compare All Models"}
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="card border-red-200 bg-red-50 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Single Model Result */}
      {singleResult && (
        <div className="card mb-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Prediction Result
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-1">Prediction</div>
              <div
                className={`text-xl font-bold ${
                  singleResult.prediction_label === 1
                    ? "text-green-600"
                    : "text-amber-600"
                }`}
              >
                {singleResult.prediction}
              </div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-1">
                High Engagement Probability
              </div>
              <div className="text-xl font-bold text-blue-600">
                {(singleResult.high_engagement_probability * 100).toFixed(2)}%
              </div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-1">Model Used</div>
              <div className="text-xl font-bold text-purple-600 capitalize">
                {singleResult.model_name.replace("_", " ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare All Models Result */}
      {compareResult && (
        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Model Comparison Results
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Prediction</th>
                  <th>High Engagement Probability</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(compareResult).map(([name, result]) => (
                  <tr key={name}>
                    <td className="font-medium capitalize">
                      {name.replace(/_/g, " ")}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          result.prediction_label === 1
                            ? "badge-high"
                            : "badge-low"
                        }`}
                      >
                        {result.prediction}
                      </span>
                    </td>
                    <td className="font-medium">
                      {(result.probability * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
