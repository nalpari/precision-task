import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Saira_Condensed,
} from "next/font/google";
import "./globals.css";

const display = Saira_Condensed({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const text = Cormorant_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

const precision = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-precision",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Todo | Precision Task Ledger",
  description: "Austere multi-user todo app built with Supabase and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${display.variable} ${text.variable} ${precision.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
