import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head";

const baseUrl = "https://www.quyech.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quyếch Concert - Sài Gòn 2025",
    template: "%s | Quyếch Concert",
  },
  description:
    "Show indie của Quyếch – Quyếch Concert - Sài Gòn 2025 | 19:30 | 17/10/2025",
  applicationName: "Quyếch Concert",
  generator: "Next.js",
  authors: [{ name: "Quyếch" }],
  openGraph: {
    title: "Quyếch Concert - Sài Gòn 2025",
    description:
      "Show indie của Quyếch – Quyếch Concert - Sài Gòn 2025 | 19:30 | 17/10/2025",
    type: "website",
    images: [
      {
        url: "https://www.quyech.com/images/quyech_event_avatar.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quyếch Concert - Sài Gòn 2025",
    description:
      "Show indie của Quyếch – Quyếch Concert - Sài Gòn 2025 | 19:30 | 17/10/2025",
    images: ["https://www.quyech.com/images/quyech_event_avatar.jpg"],
  },
  other: {
    "fb:app_id": "1241434124376586", 
  },
  icons: {
    icon: "https://www.quyech.com/images/quyech_event_avatar.jpg",
    shortcut: "https://www.quyech.com/images/quyech_event_avatar.jpg",
    apple: "https://www.quyech.com/images/quyech_event_avatar.jpg",
  },
  keywords: [
    "Quyếch",
    "Quyech",
    "Concert",
    "Sài Gòn 2025",
    "Indie",
    "Show",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head>
        <meta property="fb:app_id" content="1241434124376586" />
      </Head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

