"use client";

import { useEffect, useState } from "react";
import { getDatasetInfo, type DatasetInfo } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const medianEngagementByPlatform = [
  { platform: "TikTok", median: 11.015 },
  { platform: "YouTube", median: 4.14 },
  { platform: "Instagram", median: 2.12 },
  { platform: "Facebook", median: 2.005 },
  { platform: "Twitter", median: 1.42 },
  { platform: "LinkedIn", median: 0.56 },
];

const highEngagementByContentType = [
  { type: "Stitch", pct: 96.90, count: 250, total: 258 },
  { type: "Duet", pct: 93.95, count: 233, total: 248 },
  { type: "Short", pct: 73.55, count: 89, total: 121 },
  { type: "Community Post", pct: 72.59, count: 98, total: 135 },
  { type: "Video", pct: 69.11, count: 434, total: 628 },
  { type: "Live", pct: 51.40, count: 183, total: 356 },
  { type: "Reel", pct: 45.90, count: 140, total: 305 },
  { type: "Story", pct: 45.60, count: 259, total: 568 },
  { type: "Carousel", pct: 48.35, count: 161, total: 333 },
  { type: "Photo", pct: 44.51, count: 142, total: 319 },
  { type: "Post", pct: 41.64, count: 157, total: 377 },
  { type: "Thread", pct: 34.89, count: 82, total: 235 },
  { type: "Tweet", pct: 33.47, count: 80, total: 239 },
  { type: "Retweet", pct: 31.47, count: 79, total: 251 },
  { type: "Poll", pct: 21.84, count: 83, total: 380 },
  { type: "Article", pct: 12.93, count: 15, total: 116 },
  { type: "Document", pct: 12.21, count: 16, total: 131 },
].sort((a, b) => b.pct - a.pct);

export default function Analysis() {
  const [info, setInfo] = useState<DatasetInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatasetInfo()
      .then(setInfo)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading analysis...</div>
      </div>
    );
  }

  const platformData = info
    ? Object.entries(info.platform_distribution)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  const contentTypeData = info
    ? Object.entries(info.content_type_distribution)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  const categoryData = info
    ? Object.entries(info.category_distribution)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  const timePeriodData = info
    ? Object.entries(info.time_period_distribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const numericStats = info?.numeric_stats || {};
  const numericCols = [
    "Likes",
    "Comments",
    "Shares",
    "Views",
    "Saves",
    "Follower_Count",
    "Engagement_Rate",
    "Hour_of_Day",
    "Hashtag_Count",
    "Content_Length",
  ];

  const getBarColor = (pct: number) => {
    if (pct >= 70) return "#16a34a";
    if (pct >= 50) return "#3b82f6";
    if (pct >= 30) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        Exploratory Data Analysis
      </h1>
      <p className="text-slate-500 mb-6">
        Dataset overview, missing values, distributions, and correlations
      </p>

      {/* Dataset Overview */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Dataset Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{info?.total_rows?.toLocaleString() || "5,000"}</div>
            <div className="text-xs text-blue-600 font-medium mt-1">Rows</div>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-700">{info?.total_columns || 20}</div>
            <div className="text-xs text-indigo-600 font-medium mt-1">Columns</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{((info?.total_rows || 5000) * (info?.total_columns || 20)).toLocaleString()}</div>
            <div className="text-xs text-purple-600 font-medium mt-1">Total Cells</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700">0</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">Duplicates</div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-slate-700 mb-3">Missing Values</h3>
        <div className="space-y-2.5">
          {[
            { col: "Content_Type", count: 17, pct: 0.34, color: "bg-amber-400" },
            { col: "Category", count: 17, pct: 0.34, color: "bg-amber-400" },
            { col: "Hashtag_Count", count: 16, pct: 0.32, color: "bg-orange-400" },
          ].map((item) => (
            <div key={item.col} className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-600 w-32 shrink-0">{item.col}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.max(item.pct * 10, 4)}%` }} />
              </div>
              <span className="text-xs text-slate-500 w-16 text-right shrink-0">{item.count} ({item.pct}%)</span>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600 w-32 shrink-0">All others</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "2%" }} />
            </div>
            <span className="text-xs text-slate-500 w-16 text-right shrink-0">0 (0%)</span>
          </div>
        </div>
        <p className="text-slate-400 mt-3 text-xs">
          Handled using mode (categorical) and median (numerical) imputation.
        </p>
      </div>

      {/* Feature Engineering */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Feature Engineering
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v20M2 12h20"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-700">Target Variable</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              <span className="font-semibold text-slate-600">Engagement_Class</span> — binarized at median threshold
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-high text-xs">1 = High</span>
                <span className="text-xs text-slate-500">Engagement_Rate &ge; median</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-low text-xs">0 = Low</span>
                <span className="text-xs text-slate-500">Engagement_Rate &lt; median</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500" style={{ width: "50.02%" }} />
                <div className="h-full bg-orange-400" style={{ width: "49.98%" }} />
              </div>
              <span className="text-xs text-slate-500 shrink-0">~50/50 split</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">2,501 High vs 2,499 Low</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-700">Time_Period Feature</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">Derived from Hour_of_Day using time bins:</p>
            <div className="space-y-2">
              {[
                { label: "Morning", time: "5:00 - 11:59", color: "bg-yellow-400", icon: "☀" },
                { label: "Afternoon", time: "12:00 - 16:59", color: "bg-orange-400", icon: "🌤" },
                { label: "Evening", time: "17:00 - 20:59", color: "bg-blue-400", icon: "🌅" },
                { label: "Night", time: "21:00 - 4:59", color: "bg-indigo-500", icon: "🌙" },
              ].map((period) => (
                <div key={period.label} className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-md ${period.color} flex items-center justify-center text-xs`}>
                    {period.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-700 w-16">{period.label}</span>
                  <span className="text-xs text-slate-500">{period.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Analysis */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Numerical Analysis
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Count</th>
                <th>Mean</th>
                <th>Std</th>
                <th>Min</th>
                <th>25%</th>
                <th>50%</th>
                <th>75%</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {numericCols.map((col) => {
                const s = numericStats[col];
                if (!s) return null;
                return (
                  <tr key={col}>
                    <td className="font-medium">{col}</td>
                    <td>{s["count"]?.toLocaleString()}</td>
                    <td>{s["mean"]?.toFixed(2)}</td>
                    <td>{s["std"]?.toFixed(2)}</td>
                    <td>{s["min"]?.toFixed(2)}</td>
                    <td>{s["25%"]?.toFixed(2)}</td>
                    <td>{s["50%"]?.toFixed(2)}</td>
                    <td>{s["75%"]?.toFixed(2)}</td>
                    <td>{s["max"]?.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categorical Distributions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Platform Distribution
          </h2>
          <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Time Period Distribution
          </h2>
          <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timePeriodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Content Type Distribution
        </h2>
        <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={contentTypeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Category Distribution
        </h2>
        <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Skewness */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Skewness Analysis
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Column</th>
                <th>Skewness</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {[
                { col: "Engagement_Rate", skew: 28.723, level: "Highly Positive" },
                { col: "Views", skew: 2.625, level: "Highly Positive" },
                { col: "Likes", skew: 2.467, level: "Highly Positive" },
                { col: "Saves", skew: 2.273, level: "Highly Positive" },
                { col: "Comments", skew: 2.25, level: "Highly Positive" },
                { col: "Shares", skew: 2.053, level: "Highly Positive" },
                { col: "Content_Length", skew: 0.65, level: "Positive" },
                { col: "Hour_of_Day", skew: -0.006, level: "Symmetric" },
                { col: "Follower_Count", skew: -0.018, level: "Symmetric" },
                { col: "Hashtag_Count", skew: -0.031, level: "Symmetric" },
              ].map((row) => (
                <tr key={row.col}>
                  <td className="font-medium">{row.col}</td>
                  <td>{row.skew.toFixed(3)}</td>
                  <td>
                    <span
                      className={`badge ${
                        row.level === "Highly Positive"
                          ? "badge-low"
                          : row.level === "Positive"
                          ? "badge-info"
                          : "badge-high"
                      }`}
                    >
                      {row.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Correlation Analysis
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Pearson correlation coefficients between numerical features and the target variable.
          No high correlation pairs (&gt;0.7) were found — features capture different aspects
          of social media engagement without excessive multicollinearity.
        </p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Correlation</th>
                <th>Strength</th>
                <th>Direction</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Follower_Count", corr: -0.5181, strength: "Moderate", dir: "Negative" },
                { feature: "Content_Length", corr: -0.1979, strength: "Weak", dir: "Negative" },
                { feature: "Engagement_Rate", corr: 0.1521, strength: "Weak", dir: "Positive" },
                { feature: "Hour_of_Day", corr: 0.0283, strength: "Negligible", dir: "Positive" },
                { feature: "Hashtag_Count", corr: -0.0028, strength: "Negligible", dir: "Negative" },
              ].map((row) => {
                const absC = Math.abs(row.corr);
                const barColor =
                  absC >= 0.5 ? "#ef4444" :
                  absC >= 0.3 ? "#f59e0b" :
                  absC >= 0.1 ? "#3b82f6" : "#94a3b8";
                const strengthColor =
                  row.strength === "Moderate" ? "badge-low" :
                  row.strength === "Weak" ? "badge-info" : "badge-high";
                return (
                  <tr key={row.feature}>
                    <td className="font-medium">{row.feature}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(absC * 100, 100)}%`,
                              backgroundColor: barColor,
                            }}
                          />
                        </div>
                        <span className="text-sm font-mono" style={{ color: barColor }}>
                          {row.corr > 0 ? "+" : ""}{row.corr.toFixed(4)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${strengthColor}`}>
                        {row.strength}
                      </span>
                    </td>
                    <td>
                      <span className={row.dir === "Positive" ? "text-green-600" : "text-red-500"}>
                        {row.dir === "Positive" ? "↑" : "↓"} {row.dir}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Moderate (|r| &ge; 0.5)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Weak (0.3 - 0.5)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Low (0.1 - 0.3)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> Negligible (&lt; 0.1)
          </span>
        </div>
      </div>

      {/* Additional Engagement Analysis - last section */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Additional Engagement Analysis
        </h2>

        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Median Engagement Rate by Platform
        </h3>
        <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={medianEngagementByPlatform} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              dataKey="platform"
              type="category"
              width={80}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(value) => [
                typeof value === "number" ? value.toFixed(3) : value,
                "Median Engagement Rate",
              ]}
            />
            <Bar dataKey="median" radius={[0, 4, 4, 0]}>
              {medianEngagementByPlatform.map((entry) => (
                <Cell
                  key={entry.platform}
                  fill={entry.platform === "TikTok" ? "#8b5cf6" : "#3b82f6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          TikTok dominates with a median engagement rate of 11.015%, nearly 3x higher than YouTube (4.14%).
        </p>

        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          High Engagement Rate by Content Type
        </h3>
        <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={highEngagementByContentType} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              dataKey="type"
              type="category"
              width={120}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(value, _name, props) => {
                const num = typeof value === "number" ? value : parseFloat(String(value ?? 0));
                const item = props.payload;
                return [
                  `${num.toFixed(2)}% (${item.count}/${item.total} posts)`,
                  "% High Engagement",
                ];
              }}
            />
            <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
              {highEngagementByContentType.map((entry) => (
                <Cell key={entry.type} fill={getBarColor(entry.pct)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          The percentage of posts within each content type that are classified as High Engagement
          (Engagement_Rate &ge; median). Stitch (96.9%) and Duet (93.95%) have the highest rates.
          This represents actual class distribution, not ML model predictions.
        </p>
      </div>
    </div>
  );
}
