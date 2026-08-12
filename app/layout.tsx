import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const siteUrl = "https://juze1234.github.io";

// Per-language title, description, canonical and locale live in the route files.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Sergey Senchenko — Technical Design Portfolio",
  authors: [{ name: "Sergey Senchenko", url: siteUrl }],
  creator: "Sergey Senchenko",
  keywords: [
    "technical designer",
    "gameplay scripter",
    "level designer",
    "Enforce Script",
    "DayZ modding",
    "multiplayer systems",
    "game design portfolio",
  ],
  openGraph: {
    type: "website",
    siteName: "Sergey Senchenko — Technical Design Portfolio",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
