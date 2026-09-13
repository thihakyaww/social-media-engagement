"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/SidebarProvider";
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Network,
  Brain,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analysis", label: "Analysis", icon: BarChart3 },
  { href: "/descriptive", label: "Descriptive Mining", icon: Network },
  { href: "/predictive", label: "Predictive Mining", icon: Brain },
  { href: "/predict", label: "Live Predictor", icon: Zap },
];

function ProjectIcon({ size = 18 }: { size?: number }) {
  return <Image src="/icon.svg" alt="" width={size} height={size} />;
}

export default function Navigation() {
  const pathname = usePathname();
  const { collapsed, mobileOpen, toggleCollapsed, openMobile, closeMobile } =
    useSidebar();

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={openMobile}
        className="fixed top-4 left-4 z-[60] p-2 bg-white rounded-lg shadow-md border border-slate-200 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} className="text-slate-700" />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] lg:hidden backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-[80]
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-[78px]" : "lg:w-60"}
          w-60
        `}
      >
        {/* Header */}
        <div className="border-b border-slate-200 p-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
              <ProjectIcon size={18} />
            </div>
            <button
              onClick={closeMobile}
              className="lg:hidden p-1.5 rounded-md hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X size={16} className="text-slate-500" />
            </button>
            <button
              onClick={toggleCollapsed}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-100"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen size={16} className="text-slate-500" />
              ) : (
                <PanelLeftClose size={16} className="text-slate-500" />
              )}
            </button>
          </div>
          {!collapsed && (
            <div className="mt-2.5">
              <h1 className="text-base font-bold text-blue-800 leading-tight">
                Social Media
              </h1>
              <h1 className="text-base font-bold text-blue-800 leading-tight">
                Engagement
              </h1>
              {/* <p className="text-xs text-slate-500 mt-0.5">
                Data Mining Project
              </p> */}
            </div>
          )}
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`nav-link ${isActive ? "active" : ""} ${
                  collapsed ? "lg:justify-center lg:px-0" : ""
                }`}
                title={collapsed ? link.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`border-t border-slate-200 ${
            collapsed ? "lg:hidden p-2" : "p-4"
          }`}
        >
          {!collapsed && (
            <p className="text-xs text-slate-400 truncate">
              ML-Based Engagement Prediction
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
