"use client";

import Link from "next/link";
import { BarChart3, Zap, ArrowRight } from "lucide-react";

export default function Home() {

  const audiences = [
    {
      title: "Content Writers & Social Media Marketers",
      description: "Understand the relationships between content types and platforms, and how they affect both virality and non-virality of posts.",
      color: "border-blue-200 bg-blue-50",
      accent: "bg-blue-500",
    },
    {
      title: "Small Businesses",
      description: "Cannot afford to invest in all areas? Use the model to understand which intended posts are worth promoting for maximum ROI.",
      color: "border-emerald-200 bg-emerald-50",
      accent: "bg-emerald-500",
    },
    {
      title: "Analysts",
      description: "Get a fair benchmark since the model is built on real media data and engagement levels, setting realistic expectations for average post performance.",
      color: "border-purple-200 bg-purple-50",
      accent: "bg-purple-500",
    },
    {
      title: "Researchers & Students",
      description: "Apply the same pipeline for your research study. All aspects are described from raw data to metrics with a defined random seed at each step.",
      color: "border-amber-200 bg-amber-50",
      accent: "bg-amber-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 sm:mb-6">
          <BarChart3 size={16} />
          Data Mining Project
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
          Social Media Engagement
          <br />
          Intelligence
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
          Analyze social media engagement patterns and predict post performance
          using Data Mining and Machine Learning.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
        <Link href="/analysis" className="btn-primary justify-center">
          <BarChart3 size={18} />
          Explore Analysis
          <ArrowRight size={16} />
        </Link>
        <Link href="/predict" className="btn-secondary justify-center">
          <Zap size={18} />
          Predict Engagement
        </Link>
      </div>

      {/* Target Audience */}
      <div className="card mx-4 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Who Is This For?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {audiences.map((a) => (
            <div key={a.title} className={`rounded-xl border p-4 ${a.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${a.accent}`} />
                <h3 className="text-sm font-semibold text-slate-800">{a.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
