"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const featureImportance = [
  { feature: "Platform", importance: 0.1935 },
  { feature: "Content_Type", importance: 0.1058 },
  { feature: "Content_Length", importance: 0.0797 },
  { feature: "Category", importance: 0.0765 },
  { feature: "Time_Period", importance: 0.0387 },
];

const modelPerformance = [
  {
    model: "Logistic Regression",
    accuracy: 0.696,
    precision: 0.7917,
    recall: 0.532,
    f1: 0.6364,
    rocAuc: 0.7694,
    cv: "0.6888 ± 0.0249",
  },
  {
    model: "Decision Tree",
    accuracy: 0.680,
    precision: 0.8750,
    recall: 0.420,
    f1: 0.5676,
    rocAuc: 0.7528,
    cv: "0.6804 ± 0.0200",
  },
  {
    model: "Random Forest",
    accuracy: 0.683,
    precision: 0.8081,
    recall: 0.480,
    f1: 0.6023,
    rocAuc: 0.7582,
    cv: "0.6820 ± 0.0143",
  },
];

const radarData = [
  { metric: "Accuracy", LR: 69.6, DT: 68.0, RF: 68.3 },
  { metric: "Precision", LR: 79.17, DT: 87.50, RF: 80.81 },
  { metric: "Recall", LR: 53.2, DT: 42.0, RF: 48.0 },
  { metric: "F1-Score", LR: 63.64, DT: 56.76, RF: 60.23 },
  { metric: "ROC-AUC", LR: 76.94, DT: 75.28, RF: 75.82 },
];

const targetDistribution = [
  { name: "Low Engagement (0)", value: 2499 },
  { name: "High Engagement (1)", value: 2501 },
];

const PIE_COLORS = ["#f59e0b", "#10b981"];

export default function Predictive() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        Predictive Mining
      </h1>
      <p className="text-slate-500 mb-6">
        Classification models, feature selection, and performance evaluation
      </p>

      {/* Target Distribution */}
      <div className="card mb-6 overflow-visible">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Target Distribution &amp; Transformation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-sm text-slate-600 mb-3">
              <span className="font-semibold text-slate-800">Engagement_Class</span> — binary classification derived from Engagement_Rate using median threshold binarization.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-low">0 = Low Engagement</span>
              <span className="badge badge-high">1 = High Engagement</span>
            </div>
            <div className="text-sm text-slate-500 space-y-1">
              <p>Median threshold: <strong className="text-slate-700">2.3</strong></p>
              <p>Balance: <strong className="text-slate-700">2,501 High</strong> vs <strong className="text-slate-700">2,499 Low</strong> (50.02% / 49.98%)</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={targetDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {targetDistribution.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  wrapperStyle={{ zIndex: 100 }}
                  formatter={(value, name) => {
                    const num = typeof value === "number" ? value : parseFloat(String(value ?? 0));
                    return [num.toLocaleString(), name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2 text-xs text-slate-500">
          {targetDistribution.map((entry, i) => (
            <span key={entry.name} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
              {entry.name} ({((entry.value / targetDistribution.reduce((s, d) => s + d.value, 0)) * 100).toFixed(1)}%)
            </span>
          ))}
        </div>
      </div>

      {/* Data Leakage */}
      <div className="card mb-6 border-amber-200 bg-amber-50">
        <h2 className="text-base font-semibold text-amber-800 mb-2">
          Data Leakage Prevention
        </h2>
        <p className="text-sm text-amber-700 mb-2">
          Post-publication features were excluded from the prediction model
          because they are only known after publishing and cannot be used to
          predict engagement before publishing.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Likes", "Comments", "Shares", "Saves", "Views"].map((f) => (
            <span
              key={f}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
            >
              {f} (excluded)
            </span>
          ))}
        </div>
      </div>

      {/* 5 Selected Features */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          5 Selected Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Platform", type: "categorical" },
            { name: "Content_Type", type: "categorical" },
            { name: "Content_Length", type: "numerical" },
            { name: "Category", type: "categorical" },
            { name: "Time_Period", type: "categorical" },
          ].map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  f.type === "categorical" ? "bg-blue-500" : "bg-green-500"
                }`}
              />
              <div>
                <span className="font-medium text-sm">{f.name}</span>
                <span className="text-xs text-slate-500 ml-2">
                  ({f.type})
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Selected using Mutual Information + Random Forest Feature Importance
          (aggregated normalized scores).
        </p>
      </div>

      {/* Feature Importance */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Feature Importance (Random Forest)
        </h2>
        <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              dataKey="feature"
              type="category"
              width={150}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(value) => {
                const num = typeof value === "number" ? value : parseFloat(String(value ?? 0));
                return [(num * 100).toFixed(2) + "%", "Importance"];
              }}
            />
            <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Platform dominates importance (19.35%), followed by Content_Type (10.58%).
        </p>
      </div>

      {/* Classification Models */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Classification Models
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-1">
              Logistic Regression
            </h3>
            <p className="text-xs text-blue-600">Linear probabilistic baseline</p>
            <div className="mt-2 text-xs text-slate-600">
              max_iter=1000, solver=lbfgs
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-1">Decision Tree</h3>
            <p className="text-xs text-green-600">Interpretable decision rules</p>
            <div className="mt-2 text-xs text-slate-600">
              max_depth=5, min_samples_split=10
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-1">Random Forest</h3>
            <p className="text-xs text-purple-600">Ensemble of multiple decision trees</p>
            <div className="mt-2 text-xs text-slate-600">
              n_estimators=100, max_depth=10
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance Comparison */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Model Performance Comparison
        </h2>
        <div className="table-container mb-6">
          <table>
            <thead>
              <tr>
                <th>Classifier</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
                <th>ROC-AUC</th>
                <th>10-Fold CV</th>
              </tr>
            </thead>
            <tbody>
              {modelPerformance.map((m) => (
                <tr key={m.model}>
                  <td className="font-medium">{m.model}</td>
                  <td>{(m.accuracy * 100).toFixed(1)}%</td>
                  <td>{(m.precision * 100).toFixed(2)}%</td>
                  <td>{(m.recall * 100).toFixed(1)}%</td>
                  <td>{(m.f1 * 100).toFixed(2)}%</td>
                  <td>{(m.rocAuc * 100).toFixed(2)}%</td>
                  <td>{m.cv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600">
          <span className="font-medium">Best Model:</span> Logistic Regression
          achieves the highest accuracy (69.6%), F1-Score (63.64%), and ROC-AUC
          (76.94%), making it the primary model for deployment.
        </p>
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Model Comparison (Radar)
        </h2>
        <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis tick={{ fontSize: 10 }} domain={[30, 100]} />
            <Radar
              name="Logistic Regression"
              dataKey="LR"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.15}
            />
            <Radar
              name="Decision Tree"
              dataKey="DT"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.15}
            />
            <Radar
              name="Random Forest"
              dataKey="RF"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.15}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
