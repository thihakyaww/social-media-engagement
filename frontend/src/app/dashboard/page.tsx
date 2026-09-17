"use client";

import { useEffect, useState } from "react";
import {
  getDatasetInfo,
  getHealth,
  getDatasetPreview,
  type DatasetInfo,
  type DatasetPreview,
} from "@/lib/api";
import { Database, Layers, Target, Cpu } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const columnLabels: Record<string, string> = {
  Platform: "Platform",
  Content_Type: "Content Type",
  Category: "Category",
  Sentiment: "Sentiment",
  Influencer_Tier: "Influencer Tier",
  Follower_Count: "Followers",
  Content_Length: "Content Len.",
  Engagement_Rate: "Eng. Rate",
  Likes: "Likes",
  Comments: "Comments",
  Shares: "Shares",
  Views: "Views",
  Saves: "Saves",
  Hour_of_Day: "Hour",
  Day_of_Week: "Day",
  Hashtag_Count: "Hashtags",
  Has_Media: "Has Media",
  Is_Verified: "Verified",
  Time_Period: "Time Period",
  Engagement_Class: "Eng. Class",
};

export default function Dashboard() {
  const [info, setInfo] = useState<DatasetInfo | null>(null);
  const [preview, setPreview] = useState<DatasetPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getDatasetInfo(), getHealth(), getDatasetPreview()])
      .then(([datasetInfo, , previewData]) => {
        setInfo(datasetInfo);
        setPreview(previewData);
        setLoading(false);
      })
      .catch(() => {
        setError("Server is waking up, please wait and refresh the page.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-slate-500 mb-2">Loading dashboard...</div>
          <div className="text-xs text-slate-400">First load may take up to 60 seconds</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md">
          <div className="text-amber-800 font-semibold mb-1">Server Waking Up</div>
          <div className="text-sm text-amber-600 mb-3">{error}</div>
          <button onClick={() => window.location.reload()} className="btn-primary text-sm">
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const platformData = info
    ? Object.entries(info.platform_distribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const engagementData = info
    ? [
        { name: "Low Engagement", value: info.engagement_class_distribution["0"] || 0 },
        { name: "High Engagement", value: info.engagement_class_distribution["1"] || 0 },
      ]
    : [];

  const formatCellValue = (val: string | number | boolean, col: string) => {
    if (val === null || val === undefined) return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "string") {
      if (val === "True") return "Yes";
      if (val === "False") return "No";
    }
    if (typeof val === "number") {
      if (col === "Engagement_Class") return val.toFixed(0);
      if (col === "Follower_Count") return val.toLocaleString();
      if (col === "Engagement_Rate") return val.toFixed(2) + "%";
      if (col === "Content_Length") return val.toLocaleString();
      if (col === "Likes" || col === "Comments" || col === "Shares" || col === "Views" || col === "Saves") return val.toLocaleString();
      if (col === "Hashtag_Count") return val.toFixed(0);
      if (col === "Hour_of_Day") return val.toFixed(0);
      return val.toFixed(2);
    }
    return val;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
      <p className="text-slate-500 mb-6">Dataset overview and data mining workflow</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="stat-card">
          <Database size={24} className="mx-auto text-blue-600 mb-2" />
          <div className="text-xl sm:text-2xl font-bold text-slate-900">
            {info?.total_rows?.toLocaleString() || "5,000"}
          </div>
          <div className="text-xs sm:text-sm text-slate-500">Total Posts</div>
        </div>
        <div className="stat-card">
          <Layers size={24} className="mx-auto text-blue-600 mb-2" />
          <div className="text-xl sm:text-2xl font-bold text-slate-900">
            {info?.total_columns || 20}
          </div>
          <div className="text-xs sm:text-sm text-slate-500">Total Features</div>
        </div>
        <div className="stat-card">
          <Target size={24} className="mx-auto text-blue-600 mb-2" />
          <div className="text-xl sm:text-2xl font-bold text-slate-900">5</div>
          <div className="text-xs sm:text-sm text-slate-500">Selected Features</div>
        </div>
        <div className="stat-card">
          <Cpu size={24} className="mx-auto text-blue-600 mb-2" />
          <div className="text-xl sm:text-2xl font-bold text-slate-900">3</div>
          <div className="text-xs sm:text-sm text-slate-500">Classification Models</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="card overflow-visible">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Engagement Class Distribution
          </h2>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name || ""} (${((percent || 0) * 100).toFixed(1)}%)`
                  }
                >
                  {engagementData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
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

        <div className="card overflow-visible">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Posts by Platform
          </h2>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dataset Preview */}
      {preview && (
        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-1">
            Dataset Preview
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Preview of the first 10 records from the cleaned social media engagement dataset.
          </p>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  {preview.columns.map((col) => (
                    <th key={col}>{columnLabels[col] || col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="text-slate-400">{i + 1}</td>
                    {preview.columns.map((col) => (
                      <td key={col}>
                        {formatCellValue(row[col], col)}
                      </td>
                    ))}
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
