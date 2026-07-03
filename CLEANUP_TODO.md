# Cleanup Plan

Source of truth from the prior audit:
- Routes returned 200
- No console/page errors
- No mobile horizontal overflow
- Main issue is visual/design density, not broken functionality
- Do not delete core files

## 1. SAFE TO DELETE NOW

None identified from the audit.

## 2. NEEDS REVIEW BEFORE DELETE

- Any temporary screenshots, exports, or capture artifacts in `public/` or the workspace root that are not part of the product experience.
- Any duplicate, backup, or generated files introduced during experimentation.
- Any empty placeholder files that are not wired into routes or imports.
- Any old test artifacts or abandoned mock data files if they exist outside the active content/data flow.

## 3. MUST KEEP

- Route guards
- Auth context
- Supabase files
- Navbar
- Footer
- Layouts
- All `page.tsx` files
- Dashboard components
- Home components
- Property data
- Package, config, and env files

Suggested keep list by area:

- Route guards: any middleware or route-protection logic.
- Auth context: any auth providers, hooks, session state, or user-state wrappers.
- Supabase: client, server, schema, query, and integration files.
- Layouts: `src/app/**/layout.tsx` and shared shell components.
- Pages: every `src/app/**/page.tsx` route file.
- Dashboard components: the current dashboard widget and shell components.
- Home components: the current homepage hero, sections, and card components.
- Property data: content/data modules that feed public site and dashboard content.
- Package/config/env: `package.json`, lockfiles, Next.js, TypeScript, ESLint, PostCSS, and related config files, plus any `.env*` files.

## 4. DESIGN FILES TO FIX NEXT

- [src/components/dashboard/DashboardTopbar.tsx](src/components/dashboard/DashboardTopbar.tsx)
- [src/components/dashboard/DashboardSidebar.tsx](src/components/dashboard/DashboardSidebar.tsx)
- [src/components/dashboard/Panel.tsx](src/components/dashboard/Panel.tsx)
- [src/components/dashboard/MetricCard.tsx](src/components/dashboard/MetricCard.tsx)
- [src/components/dashboard/ActivityFeed.tsx](src/components/dashboard/ActivityFeed.tsx)
- [src/components/dashboard/RevenuePipeline.tsx](src/components/dashboard/RevenuePipeline.tsx)
- [src/components/home/HeroEmpire.tsx](src/components/home/HeroEmpire.tsx)
- [src/components/home/EmpireFlywheel.tsx](src/components/home/EmpireFlywheel.tsx)
- [src/components/home/MogulsGrid.tsx](src/components/home/MogulsGrid.tsx)
- [src/components/home/FeaturedProjects.tsx](src/components/home/FeaturedProjects.tsx)
- [src/components/moguls/MogulCard.tsx](src/components/moguls/MogulCard.tsx)
- [src/components/projects/ProjectCard.tsx](src/components/projects/ProjectCard.tsx)
- [src/components/shared/Section.tsx](src/components/shared/Section.tsx)
- [src/components/shared/SectionHeading.tsx](src/components/shared/SectionHeading.tsx)
- [src/components/shared/CTASection.tsx](src/components/shared/CTASection.tsx)
- [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx)
- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)

## 5. NEXT BUILD TASKS

1. Homepage polish
2. Navbar/mobile polish
3. Dashboard density cleanup
4. Card hierarchy improvement
5. Footer/CTA polish

## Notes

- Do not delete anything yet.
- Do not redesign yet.
- Do not touch `.env` files.
- Do not touch auth.
- Do not touch Supabase.