import type { Metadata } from "next";
import { JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import IntelligenceMogulShellNoSsr from "@/modules/intelligence-mogul/components/IntelligenceMogulShellNoSsr";
import "@/modules/intelligence-mogul/styles/intelligence-mogul.css";

/*
 * Module fonts are loaded here and scoped to the module wrapper via CSS
 * variables — the global Mansas Moguls typography (Geist/Cinzel/Inter) is
 * untouched. `font-mono` / `font-serif` utilities resolve these vars only
 * inside this subtree.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Intelligence Mogul",
  description:
    "Strategic intelligence workspace: intelligence command, empire twin, rival intelligence, scenario engine, acquisition intelligence, intervention command, and outcome verification.",
  robots: { index: false, follow: false },
};

export default function IntelligenceMogulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`intelligence-mogul-root ${jetbrainsMono.variable} ${cormorantGaramond.variable}`}
    >
      <IntelligenceMogulShellNoSsr>{children}</IntelligenceMogulShellNoSsr>
    </div>
  );
}
