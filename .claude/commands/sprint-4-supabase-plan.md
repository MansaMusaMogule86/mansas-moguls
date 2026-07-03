# Sprint 4: Supabase Plan

Plan only. Do not edit app code yet. Do not apply migrations. Do not connect Supabase.

Source of truth:
- [docs/DATABASE_SCHEMA.md](../../docs/DATABASE_SCHEMA.md)
- Current route structure in the app

## Goal

Prepare the project for Supabase auth, RLS, migrations, environment variables, and route protection without changing product routes, public data, or existing UI yet.

## 1. Auth Plan

- Define the auth model around `profiles` as the source of app-level user state.
- Map `auth.users` to `profiles.id` using the schema relationship.
- Plan sign-in, sign-out, session hydration, and profile bootstrap flows.
- Define role handling from `user_role` and status handling from `user_status`.
- Confirm which routes are public, which are authenticated, and which are role-gated.

## 2. RLS Plan

- Validate RLS coverage for every table in `DATABASE_SCHEMA.md`.
- Confirm public read rules for marketing content and public empire content.
- Confirm member-based access rules for projects, milestones, tasks, documents, updates, and agents.
- Confirm admin/founder rules for management surfaces, audit logs, and internal records.
- Review helper functions before implementation:
  - `current_user_role()`
  - `is_admin_or_founder()`
  - `is_project_member(project_uuid)`
- Check for any policy gaps where inserts, updates, or deletes are not explicitly covered.

## 3. Migration Plan

- Treat schema changes as staged migrations, not one large rollout.
- Start with baseline auth support and profile bootstrap.
- Then add or reconcile tables, indexes, triggers, and RLS policies in safe batches.
- Verify each migration against the schema document before any execution.
- Keep migrations reversible where practical.
- Avoid touching app code until the migration plan is finalized.

Suggested migration order:
1. Auth and profile foundation
2. Core entity tables and constraints
3. Indexes and `updated_at` triggers
4. RLS policies and helper functions
5. Seed and content alignment

## 4. Environment Variable Plan

- Identify all required public and server-side Supabase env variables before wiring anything.
- Confirm naming for:
  - project URL
  - anon/public key
  - service role key
  - any auth callback or redirect-related variables
- Keep environment planning separate from implementation.
- Do not edit `.env` files in this sprint.

## 5. Route Protection Plan

- Protect dashboard routes with session checks once auth is wired.
- Leave public marketing routes public.
- Keep routes aligned with the schema visibility model:
  - `public`, `anonymous`, `private`, `stealth`
- Plan explicit handling for:
  - dashboard shell routes
  - project detail routes
  - mogul detail routes
  - auth pages like login
- Confirm route behavior for unauthenticated users, invited users, team members, clients, partners, founders, and admins.

## 6. Validation Plan

- Compare planned RLS behavior against current pages and data usage.
- Check that public content maps to schema visibility rules.
- Check that protected dashboard surfaces map to profile roles and project membership.
- Validate that future Supabase wiring will not require route or data reshaping.

## 7. Deliverables For Next Sprint

- Auth wiring checklist
- RLS policy matrix
- Migration sequence
- Env variable inventory
- Route protection map

## Constraints

- Do not edit app code yet.
- Do not apply migrations.
- Do not connect Supabase.
- Do not change routes or product data in this planning step.