// src/components/shared/SEO.tsx
// Reusable SEO component for Next.js App Router

import Script from "next/script";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const BASE_URL = "https://mansasmoguls.com";
const BRAND_SUFFIX = "Mansas Moguls";

export default function SEO({
  title,
  description,
  path,
  ogImage = `${BASE_URL}/og-image.png`,
  jsonLd,
  noIndex = false,
}: SEOProps) {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = /mansas moguls/i.test(title) ? title : `${title} | ${BRAND_SUFFIX}`;
  
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Mansas Moguls" />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}