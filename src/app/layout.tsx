import type { Metadata } from "next";
import { Nunito_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const primary = Nunito_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const code = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Todo | Developer Task Console",
  description: "Dark-mode multi-user todo app built with Supabase and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${primary.variable} ${code.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
