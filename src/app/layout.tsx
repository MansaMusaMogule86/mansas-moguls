import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Cinematic serif for empire headlines / wordmark.
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mansasmoguls.com"),
  title: {
    default: "Mansas Moguls — The Empire Operating System",
    template: "%s — Mansas Moguls",
  },
  description:
    "Mansas Moguls is an AI-powered holding empire that builds, acquires, automates, scales, and compounds intelligent businesses.",
  keywords: [
    "Mansas Moguls",
    "AI holding company",
    "venture studio",
    "AI empire",
    "portfolio companies",
    "AI agents",
  ],
  openGraph: {
    title: "Mansas Moguls — The Empire Operating System",
    description:
      "An AI-powered holding empire that builds, acquires, automates, scales, and compounds intelligent businesses.",
    siteName: "Mansas Moguls",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
