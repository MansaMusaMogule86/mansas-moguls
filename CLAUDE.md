\# Mansas Moguls



Mansas Moguls is the Empire.



The Empire contains Moguls.

Moguls contain Projects.

Projects can become Portfolio Companies.



\## Core Brand



Mansas Moguls is an AI-powered holding empire that builds, acquires, automates, scales, and compounds intelligent businesses.



\## Product Rule



Do not build a generic SaaS.

Do not build a Firebase-style startup dashboard.

Build a luxury AI empire command center.



\## Brand Architecture



Mansas Moguls = The Empire



Moguls = permanent strategic divisions



Projects = things being built



Portfolio = things owned



\## Main Moguls



1\. Intelligence Mogul

2\. AI Mogul

3\. Venture Mogul

4\. Capital Mogul

5\. Growth Mogul

6\. Studio Mogul

7\. Innovation Mogul

8\. Knowledge Mogul



\## Design Direction



Luxury dark mode.

Black, gold, royal blue.

Glass panels.

Cinematic 3D.

Command center UI.

Premium dashboard.

Bento grids.

Sharp spacing.

Mobile first.

No childish colors.

No generic SaaS templates.



\## Stack



Next.js

TypeScript

TailwindCSS

shadcn/ui

Framer Motion

Supabase

Vercel

Cloudflare

OpenRouter later



\## Build Rule



Always inspect before editing.

Always build in small sprints.

Always run lint and build after changes.

Never delete files without permission.

Never expose private client projects publicly.



\## Visibility Rules



Public

Anonymous

Private

Stealth



\## First Sprint



Create app shell.

Create public routes.

Create design system.

Create homepage.

Create Moguls page.

Create Projects page.

Use static data first.

No auth yet.

No database yet.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **mansas-moguls** (908 symbols, 2014 relationships, 60 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/mansas-moguls/context` | Codebase overview, check index freshness |
| `gitnexus://repo/mansas-moguls/clusters` | All functional areas |
| `gitnexus://repo/mansas-moguls/processes` | All execution flows |
| `gitnexus://repo/mansas-moguls/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
