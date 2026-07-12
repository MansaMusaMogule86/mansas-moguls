// src/app/layout.tsx
// Add global schema to root layout

import type { Metadata } from "next";
import { Inter, Geist, Cinzel } from "next/font/google";
import "./globals.css";
import { globalGraph } from "@/lib/seo-schema";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { AppChrome } from "@/components/layout/AppChrome";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-display", weight: ["400", "600", "700", "800"] });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mansas Moguls | Founder-First AI Strategy & Automation Studio",
    template: "%s | Mansas Moguls",
  },
  description: "Build, acquire, automate, and scale AI-driven businesses. 24 portfolio companies. $1.2B+ valuation. Dubai-based, globally operating.",
  metadataBase: new URL("https://mansasmoguls.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mansas Moguls",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans dark", geist.variable, cinzel.variable)}>
      <head>
        {/* Global Organization Schema */}
        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalGraph()) }}
        />
      </head>
      <body className={inter.className}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}