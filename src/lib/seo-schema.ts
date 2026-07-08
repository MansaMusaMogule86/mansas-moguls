// src/lib/seo-schema.ts

const BASE_URL = "https://mansasmoguls.com";

export const globalGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": ["Organization", "Corporation"],
      "@id": `${BASE_URL}/#organization`,
      "name": "Mansas Moguls LLC-FZ",
      "alternateName": ["Mansas Moguls", "Mansas", "MM"],
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/assets/logo-dark-luxury.png`,
        "width": 512,
        "height": 512
      },
      "founder": { "@type": "Person", "@id": `${BASE_URL}/#el-mehdi` },
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "areaServed": [
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "Qatar" },
        { "@type": "Country", "name": "Kuwait" },
        { "@type": "Place", "name": "Global" }
      ],
      "knowsAbout": [
        "AI Strategy",
        "Business Automation",
        "Portfolio Company Building",
        "Digital Transformation",
        "Founder Coaching",
        "n8n Workflows",
        "LLM Implementation",
        "MCP Architecture"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/mansas-moguls",
        "https://www.instagram.com/mansasmoguls",
        "https://twitter.com/mansasmoguls"
      ]
    },

    // El Mehdi
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#el-mehdi`,
      "name": "El Mehdi",
      "jobTitle": "Founder & CEO",
      "worksFor": { "@id": `${BASE_URL}/#organization` },
      "founderOf": { "@id": `${BASE_URL}/#organization` },
      "knowsAbout": ["AI Strategy", "Business Automation", "Portfolio Management", "Founder Leadership"],
      "sameAs": [
        "https://www.linkedin.com/in/el-mehdi-mansas",
        "https://twitter.com/elmehdimansas"
      ]
    },

    // WebSite
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "Mansas Moguls",
      "publisher": { "@id": `${BASE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },

    // LocalBusiness
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${BASE_URL}/#localbusiness`,
      "name": "Mansas Moguls LLC-FZ",
      "image": `${BASE_URL}/og-image.png`,
      "url": BASE_URL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "DIFC Gate Village",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "postalCode": "00000",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.2048,
        "longitude": 55.2708
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "AED 5000 - 500000",
      "currenciesAccepted": "AED, USD"
    }
  ]
});

// Portfolio company generator
export const portfolioSchema = (company: {
  name: string;
  url: string;
  description: string;
  features?: string[];
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
      "name": company.name,
      "url": company.url,
      "parentOrganization": { "@id": `${BASE_URL}/#organization` },
      "founder": { "@id": `${BASE_URL}/#el-mehdi` },
      "description": company.description
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${company.url}/#product`,
      "name": `${company.name} Platform`,
      "applicationCategory": "BusinessApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": company.features || []
    }
  ]
});

// 9-Layer Audit HowTo
export const auditHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "The Mansas Moguls 9-Layer Business AI Audit",
  "description": "Comprehensive methodology to assess AI readiness across 9 business dimensions",
  "totalTime": "P2W",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "AED",
    "value": "5000-25000"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Strategy Layer Assessment",
      "text": "Evaluate clarity on goals, market position, and competitive advantage. Score 0-100.",
      "url": `${BASE_URL}/audit/strategy-layer`
    }
  ]
};

// Breadcrumb generator
export const generateBreadcrumbs = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const items = segments.map((segment, i) => ({
    "@type": "ListItem",
    "position": i + 2,
    "name": segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    "item": `${BASE_URL}/${segments.slice(0, i + 1).join('/')}`
  }));
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      ...items
    ]
  };
};