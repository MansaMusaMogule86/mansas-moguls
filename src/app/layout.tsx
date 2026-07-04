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

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mansasmoguls.com"),
  title: {
    default: "Mansas Moguls | AI Business Operating System",
    template: "%s | Mansas Moguls",
  },
  description:
    "Mansas Moguls is an AI business operating system and venture studio for entrepreneurs, startups, brands, and companies to build, automate, launch, scale, and compound digital businesses.",
  keywords: [
    "Mansas Moguls",
    "Mansa Moguls",
    "Mansas Mogules",
    "AI business operating system",
    "AI venture studio",
    "AI automation platform",
    "business automation",
    "startup operating system",
    "digital business platform",
    "AI agents",
    "SaaS builder",
    "company builder",
    "growth systems",
  ],
  openGraph: {
    title: "Mansas Moguls | AI Business Operating System",
    description:
      "Build, automate, launch, scale, and compound digital businesses with the Mansas Moguls AI business operating system.",
    siteName: "Mansas Moguls",
    type: "website",
    url: "https://mansasmoguls.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mansas Moguls | AI Business Operating System",
    description:
      "Build, automate, launch, scale, and compound digital businesses with Mansas Moguls.",
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