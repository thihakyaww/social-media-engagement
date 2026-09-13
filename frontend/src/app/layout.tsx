import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SidebarProvider } from "@/components/SidebarProvider";
import LayoutContent from "./LayoutContent";

export const metadata: Metadata = {
  title: "Social Media Engagement Intelligence",
  description:
    "Analyze social media engagement patterns and predict post performance using Data Mining and Machine Learning.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SidebarProvider>
          <Navigation />
          <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
}
