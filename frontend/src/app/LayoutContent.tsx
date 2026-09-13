"use client";

import { useSidebar } from "@/components/SidebarProvider";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <main
      className={`
        min-h-screen p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out
        pt-16 lg:pt-8
        ${collapsed ? "lg:ml-[78px]" : "lg:ml-60"}
      `}
    >
      {children}
    </main>
  );
}
