"use client";

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

const clusterMetrics = [
  { cluster: "Low Engagement", color: "#3b82f6", likes: 1774.82, comments: 94.66, shares: 541.37, saves: 210.27, views: 31518.71 },
  { cluster: "Moderate Engagement", color: "#10b981", likes: 4747.97, comments: 240.82, shares: 457.63, saves: 491.76, views: 43026.30 },
  { cluster: "Viral", color: "#8b5cf6", likes: 20482.2, comments: 849.56, shares: 1990.86, saves: 1969.94, views: 351533.01 },
];

const clusterDistribution = [
  { name: "Moderate Engagement", count: 2429, pct: 48.58 },
  { name: "Low Engagement", count: 1417, pct: 28.34 },
  { name: "Viral", count: 1154, pct: 23.08 },
];

const associationRules = [
  { antecedent: "Content_Type_Stitch", consequent: "Viral_Post", support: 0.0498, confidence: 0.9651, lift: 4.1816 },
  { antecedent: "Content_Type_Stitch, Sentiment_Positive", consequent: "Viral_Post", support: 0.0240, confidence: 0.9600, lift: 4.1594 },
  { antecedent: "Content_Type_Duet", consequent: "Viral_Post", support: 0.0474, confidence: 0.9556, lift: 4.1406 },
  { antecedent: "Content_Type_Duet, Sentiment_Positive", consequent: "Viral_Post", support: 0.0242, confidence: 0.9528, lift: 4.1281 },
  { antecedent: "Content_Type_Short", consequent: "Viral_Post", support: 0.0216, confidence: 0.8926, lift: 3.8673 },
  { antecedent: "Content_Type_Community Post", consequent: "Viral_Post", support: 0.0234, confidence: 0.8667, lift: 3.7551 },
  { antecedent: "Content_Type_Article", consequent: "Low_Engagement_Post", support: 0.0232, confidence: 1.0000, lift: 3.5286 },
  { antecedent: "Content_Type_Document", consequent: "Low_Engagement_Post", support: 0.0262, confidence: 1.0000, lift: 3.5286 },
  { antecedent: "Content_Type_Video, Sentiment_Positive", consequent: "Viral_Post", support: 0.0354, confidence: 0.5655, lift: 2.4502 },
  { antecedent: "Content_Type_Poll", consequent: "Low_Engagement_Post", support: 0.0494, confidence: 0.6500, lift: 2.2936 },
  { antecedent: "Content_Type_Video", consequent: "Viral_Post", support: 0.0664, confidence: 0.5287, lift: 2.2906 },
  { antecedent: "Sentiment_Positive, Content_Type_Poll", consequent: "Low_Engagement_Post", support: 0.0224, confidence: 0.6400, lift: 2.2583 },
  { antecedent: "Time_Period_Night, Content_Type_Video", consequent: "Viral_Post", support: 0.0224, confidence: 0.5161, lift: 2.2363 },
  { antecedent: "Sentiment_Neutral, Content_Type_Video", consequent: "Viral_Post", support: 0.0214, confidence: 0.4798, lift: 2.0789 },
  { antecedent: "Content_Type_Thread", consequent: "Low_Engagement_Post", support: 0.0250, confidence: 0.5319, lift: 1.8769 },
  { antecedent: "Content_Type_Reel", consequent: "Moderate_Engagement_Post", support: 0.0526, confidence: 0.8623, lift: 1.7750 },
  { antecedent: "Content_Type_Retweet", consequent: "Low_Engagement_Post", support: 0.0252, confidence: 0.5020, lift: 1.7713 },
  { antecedent: "Content_Type_Photo", consequent: "Moderate_Engagement_Post", support: 0.0548, confidence: 0.8589, lift: 1.7681 },
  { antecedent: "Content_Type_Reel, Sentiment_Positive", consequent: "Moderate_Engagement_Post", support: 0.0242, confidence: 0.8582, lift: 1.7665 },
  { antecedent: "Content_Type_Carousel", consequent: "Moderate_Engagement_Post", support: 0.0566, confidence: 0.8498, lift: 1.7494 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

const clusterBarMetrics = [
  { label: "Likes", key: "likes" },
  { label: "Comments", key: "comments" },
  { label: "Shares", key: "shares" },
  { label: "Saves", key: "saves" },
  { label: "Views", key: "views" },
];

export default function Descriptive() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        Descriptive Mining
      </h1>
      <p className="text-slate-500 mb-6">
        Descriptive analysis, clustering, and association rule mining results
      </p>

      {/* Clustering Analysis */}
      <div className="card mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Clustering Analysis (K-Medoids)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Cluster Selection */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-5">
              <h3 className="text-sm font-semibold text-amber-800 mb-1">Cluster Selection Rationale</h3>
              <p className="text-sm text-amber-700">
                K=2 was rejected due to severe imbalance (<strong>76.34% vs 23.66%</strong>), compressing
                low and moderate engagement posts into a single undifferentiated cluster.
                K=3 provides a balanced three-tier partition with meaningful business interpretation.
              </p>
            </div>

            {/* Cluster Distribution Chart */}
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Cluster Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={clusterDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value, name) => {
                    const num = typeof value === "number" ? value : parseFloat(String(value ?? 0));
                    return [num.toLocaleString(), "Posts"];
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {clusterDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Distribution percentage cards */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {clusterDistribution.map((c, i) => (
                <div key={c.name} className="rounded-lg p-2.5 text-center border" style={{ borderColor: COLORS[i] + "40", backgroundColor: COLORS[i] + "08" }}>
                  <div className="text-lg font-bold" style={{ color: COLORS[i] }}>{c.pct}%</div>
                  <div className="text-xs text-slate-500">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.count.toLocaleString()} posts</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Cluster Metrics - Bar visualization */}
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Cluster Mean Interaction Metrics
            </h3>
            {clusterMetrics.map((row) => (
              <div key={row.cluster} className="mb-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                  <span className="text-sm font-semibold text-slate-800">{row.cluster}</span>
                </div>
                {clusterBarMetrics.map((m) => {
                  const val = row[m.key as keyof typeof row] as number;
                  const maxVal = Math.max(...clusterMetrics.map((c) => c[m.key as keyof typeof c] as number));
                  const pct = (val / maxVal) * 100;
                  return (
                    <div key={m.key} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500 w-16 shrink-0">{m.label}</span>
                      <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: row.color }} />
                      </div>
                      <span className="text-xs font-medium text-slate-700 w-14 text-right shrink-0">
                        {val >= 1000 ? (val / 1000).toFixed(1) + "K" : val.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
            <p className="text-xs text-slate-500 mt-1">
              Viral posts average <strong>20,482 likes</strong> and <strong>351,533 views</strong> —
              roughly 4x the likes and 8x the views of moderate engagement posts.
            </p>
          </div>
        </div>
      </div>

      {/* Association Rule Mining */}
      <div className="card">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Association Rule Mining (Apriori)
        </h2>

        {/* Config as visual cards */}
        <div className="text-sm mb-4 space-y-2">
          <p>
            <span className="font-semibold text-slate-800">Configuration:</span>{" "}
            <span className="text-blue-600">min_support=0.02</span>,{" "}
            <span className="text-indigo-600">max_len=3</span>,{" "}
            <span className="text-purple-600">min_confidence=0.30</span>,{" "}
            <span className="text-emerald-600">lift&ge;1.20</span>
          </p>
          <p>
            <span className="font-semibold text-slate-800">Basket Columns:</span>{" "}
            <span className="text-slate-600">Content_Type, Category, Sentiment, Time_Period, Cluster_Label</span>
          </p>
          <p>
            <span className="font-semibold text-slate-800">Results:</span>{" "}
            <span className="font-semibold text-slate-900">258</span>{" "}
            <span className="text-slate-500">frequent itemsets</span>{" "}
            <span className="text-slate-400">&rarr;</span>{" "}
            <span className="font-semibold text-slate-900">31</span>{" "}
            <span className="text-slate-500">meaningful rules</span>
          </p>
        </div>

        {/* Metric definitions */}
        <div className="flex flex-wrap gap-4 text-xs mb-5">
          <span>
            <strong className="text-blue-700">Support</strong>{" "}
            <span className="text-slate-500">= how frequently a pattern occurs</span>
          </span>
          <span>
            <strong className="text-emerald-700">Confidence</strong>{" "}
            <span className="text-slate-500">= P(consequent | antecedent)</span>
          </span>
          <span>
            <strong className="text-purple-700">Lift</strong>{" "}
            <span className="text-slate-500">= strength vs random occurrence</span>
          </span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Antecedent</th>
                <th>Consequent</th>
                <th>Support</th>
                <th>Confidence</th>
                <th>Lift</th>
              </tr>
            </thead>
            <tbody>
              {associationRules.map((rule, i) => (
                <tr key={i}>
                  <td className="text-slate-400">{i + 1}</td>
                  <td className="font-medium text-sm">{rule.antecedent}</td>
                  <td>
                    <span
                      className={`badge ${
                        rule.consequent === "Viral_Post"
                          ? "badge-high"
                          : rule.consequent === "Low_Engagement_Post"
                          ? "badge-low"
                          : "badge-info"
                      }`}
                    >
                      {rule.consequent.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td>{(rule.support * 100).toFixed(2)}%</td>
                  <td>{(rule.confidence * 100).toFixed(2)}%</td>
                  <td className="font-medium">{rule.lift.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Findings as visual cards */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Key Findings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Strongest Viral Predictors", finding: "Stitch and Duet content types have the highest viral potential (lift > 4.1)", color: "border-purple-200 bg-purple-50", accent: "bg-purple-500" },
              { title: "Always Low Engagement", finding: "Article and Document content types result in low engagement (confidence = 100%, lift = 3.53)", color: "border-red-200 bg-red-50", accent: "bg-red-500" },
              { title: "Moderate Engagement Predictors", finding: "Reels and Photos predict moderate engagement consistently (lift ~1.77)", color: "border-blue-200 bg-blue-50", accent: "bg-blue-500" },
              { title: "Sentiment Amplifier", finding: "Positive sentiment reinforces viral potential for Stitch and Duet content", color: "border-emerald-200 bg-emerald-50", accent: "bg-emerald-500" },
            ].map((f) => (
              <div key={f.title} className={`rounded-lg border p-3 ${f.color}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${f.accent}`} />
                  <span className="text-xs font-semibold text-slate-800">{f.title}</span>
                </div>
                <p className="text-xs text-slate-600">{f.finding}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
