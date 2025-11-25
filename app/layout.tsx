import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Chatbot Universitario Inteligente UAI",
  description:
    "Asistente universitario 24/7 para dudas académicas, administrativas y derivaciones UAI."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          inter.variable,
          "relative"
        )}
      >
        <div className="fixed inset-0 -z-10 bg-mesh-gradient opacity-80" aria-hidden />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/70" aria-hidden />
        {children}
      </body>
    </html>
  );
}
