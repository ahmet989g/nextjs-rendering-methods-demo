import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RenderingNavigation from "@/components/Navigation/RenderingNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Rendering Methods Demo",
  description: "CSR, SSR, SSG, ISR, PPR rendering methods comparison and performance monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <RenderingNavigation />
        <main className="min-h-screen bg-gray-50 text-gray-600">
          {children}
        </main>
      </body>
    </html>
  );
}