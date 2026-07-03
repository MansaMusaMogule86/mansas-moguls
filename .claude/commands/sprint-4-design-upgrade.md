# Sprint 4: Empire Design Upgrade

## Sprint Goal
Transform the public website and dashboard into a luxury AI empire command center. Remove all traces of generic "AI SaaS" templating. The aesthetic must reflect a commanding, high-end private office (Dubai investment firm meets Palantir intelligence dashboard, detailed with Apple keynote polish).

## Constraints
- **Strictly UI/UX modifications.**
- DO NOT add features.
- DO NOT touch Supabase, Auth, or databases.
- DO NOT change data models.
- DO NOT remove routes.

## Design Directives
- **Palette:** Deep black, metallic gold, deep royal blue.
- **Typography:** Editorial, premium serif display mixed with clean technical sans-serif.
- **Vibe:** "Holding Empire", Palantir intelligence dashboard, Dubai private family office.
- **Anti-Vibe:** Cartoon startup, purple AI SaaS, Firebase dashboards.
- **Rules:** Less generic gradients, stronger luxury spacing, cinematic sections, deeper card hierarchy, fewer repeated badges, better hero composition and section rhythm.

---

## 1. Visual Problems Found (Current State Assessment)
1. **Generic SaaS Bleed-Through:** Extraneous glowing borders, standard border-radiuses, and "feature-grid" layouts that look like a $20/mo SaaS instead of a billion-dollar empire holding company.
2. **Badge Fatigue:** Overuse of small UI badges for metadata which clutter the interface and degrade the luxury feel.
3. **Typographic Rhythm:** Lack of strong contrast between "Editorial Headline" (premium serif) and "Terminal Data" (clean mono/sans). 
4. **Card Hierarchy:** Cards lack depth, often feeling flat or relying on standard shadow values instead of cinematic glass/dark-glass techniques.
5. **Dashboard Density:** The dashboard overview feels like a standard Next.js template rather than an exclusive intelligence terminal.

## 2. Exact Files to Edit

### Global & Shared
- `src/app/globals.css` (Refine base tokens to remove generic SaaS blues/purples for strict navy/gold)
- `src/components/shared/Section.tsx` & `SectionHeading.tsx` (Increase luxury spacing, editorial rhythm)
- `src/components/shared/PageHeader.tsx` (Deepen cinematic feel)
- `src/components/ui/card.tsx` (Adjust base card tokens to match `glass-panel` luxury styles)

### Public Pages
- **Homepage:** `src/components/home/*`, `src/app/(public)/page.tsx`
- **Empire:** `src/app/(public)/empire/page.tsx`
- **Moguls:** `src/app/(public)/moguls/page.tsx`, `src/components/moguls/MogulCard.tsx`
- **Projects:** `src/app/(public)/projects/page.tsx`, `src/app/(public)/projects/[slug]/page.tsx`, `src/components/projects/ProjectCard.tsx`
- **Portfolio:** `src/app/(public)/portfolio/page.tsx`, `src/components/portfolio/PortfolioCard.tsx`
- **Intelligence:** `src/app/(public)/intelligence/page.tsx`
- **Media:** `src/app/(public)/media/page.tsx`
- **Join:** `src/app/(public)/join/page.tsx`

### Dashboard
- **Overview:** `src/app/(dashboard)/dashboard/page.tsx`
- **Components:** `src/components/dashboard/MetricCard.tsx`, `src/components/dashboard/ActivityFeed.tsx`, `src/components/dashboard/RevenuePipeline.tsx`, `src/components/dashboard/AgentStatus.tsx`

## 3. Upgrade Plan

### Phase 1: Metric & Token Lockdown
Review `globals.css` and Tailwind configs to ensure standard shadows, radiuses, and border colors invoke "dark glass and gold" globally.

### Phase 2: Core Components & Typography
Revamp shared structural components (`PageHeader`, `SectionHeading`, `Card`) to institute the "Editorial + Terminal" typographic system. Remove excessive badging in favor of clean metadata lines (e.g., uppercase mono text with accent dots).

### Phase 3: Public Marketing Pages
Go page-by-page (Empire, Moguls, Projects, Portfolio, Intelligence, Media, Join).
- Replace flat marketing grids with asymmetrical, cinematic layouts.
- Enhance spacing (more negative space, slower breathing room).
- Apply the HUD-panel and Glass-panel logic systematically.

### Phase 4: Intelligence Dashboard
Transform the dashboard overview from a standard analytics page to a "Command Center Terminal" by using deep backgrounds, `hud-panel` borders, intense data hierarchy (focusing on typography over generic charts), and strict alignment.

---
*End of Sprint Plan*