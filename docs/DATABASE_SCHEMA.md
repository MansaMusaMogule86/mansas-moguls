 Mansas Moguls Database Schema

## Core Logic

Mansas Moguls = The Empire  
Moguls = permanent divisions  
Projects = things being built  
Portfolio Companies = things owned  
AI Agents = digital workforce  
Documents = knowledge layer  
Updates = project history  

---

# 1. ENUMS

```sql
create type user_role as enum (
  'visitor',
  'partner',
  'client',
  'team_member',
  'project_manager',
  'admin',
  'founder'
);

create type user_status as enum (
  'active',
  'invited',
  'suspended',
  'archived'
);

create type project_type as enum (
  'empire_project',
  'partner_project',
  'client_project',
  'stealth_project',
  'portfolio_company',
  'internal_tool',
  'ai_startup',
  'academy_program',
  'capital_deal'
);

create type project_visibility as enum (
  'public',
  'anonymous',
  'private',
  'stealth'
);

create type project_status as enum (
  'idea',
  'research',
  'strategy',
  'design',
  'building',
  'alpha',
  'beta',
  'launched',
  'revenue',
  'scaled',
  'paused',
  'archived'
);

create type task_status as enum (
  'todo',
  'doing',
  'review',
  'done',
  'blocked'
);

create type task_priority as enum (
  'low',
  'medium',
  'high',
  'urgent'
);

create type milestone_status as enum (
  'pending',
  'in_progress',
  'completed',
  'blocked'
);

create type agent_status as enum (
  'idle',
  'active',
  'paused',
  'error'
);

create type document_visibility as enum (
  'public',
  'private',
  'client',
  'team',
  'stealth'
);

create type portfolio_ownership_type as enum (
  'owned',
  'acquired',
  'incubated',
  'invested',
  'partner',
  'client'
);

create type content_type as enum (
  'article',
  'announcement',
  'video',
  'podcast',
  'research',
  'case_study',
  'investor_update',
  'build_log'
);

create type inquiry_type as enum (
  'partner',
  'client',
  'investor',
  'career',
  'media',
  'acquisition',
  'general'
);
2. PROFILES
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  phone text,
  company_name text,
  job_title text,
  role user_role not null default 'visitor',
  status user_status not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
3. MOGULS

Permanent empire divisions.

create table moguls (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type text not null,
  short_description text,
  full_description text,
  icon text,
  hero_image_url text,
  accent_color text,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

Default Moguls:

Intelligence Mogul
AI Mogul
Venture Mogul
Capital Mogul
Growth Mogul
Studio Mogul
Innovation Mogul
Knowledge Mogul
4. PROJECTS
create table projects (
  id uuid primary key default gen_random_uuid(),
  mogul_id uuid references moguls(id) on delete set null,

  name text not null,
  slug text unique not null,

  type project_type not null,
  visibility project_visibility not null default 'private',
  status project_status not null default 'idea',

  progress_percent int default 0 check (
    progress_percent >= 0 and progress_percent <= 100
  ),

  short_description text,
  full_description text,

  industry text,
  location text,

  client_name text,
  is_client_name_public boolean default false,

  hero_image_url text,
  cover_image_url text,

  started_at date,
  target_launch_date date,
  launched_at date,

  created_by uuid references profiles(id) on delete set null,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
5. PROJECT MEMBERS
create table project_members (
  id uuid primary key default gen_random_uuid(),

  project_id uuid references projects(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,

  role text not null default 'viewer',

  created_at timestamptz default now(),

  unique(project_id, user_id)
);

Roles:

viewer
client
partner
contributor
manager
owner
6. PROJECT MILESTONES
create table project_milestones (
  id uuid primary key default gen_random_uuid(),

  project_id uuid references projects(id) on delete cascade,

  title text not null,
  description text,

  status milestone_status not null default 'pending',

  due_date date,
  completed_at timestamptz,

  order_index int default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
7. TASKS
create table tasks (
  id uuid primary key default gen_random_uuid(),

  project_id uuid references projects(id) on delete cascade,
  assigned_to uuid references profiles(id) on delete set null,
  created_by uuid references profiles(id) on delete set null,

  title text not null,
  description text,

  status task_status not null default 'todo',
  priority task_priority not null default 'medium',

  due_date date,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
8. AI AGENTS
create table ai_agents (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  slug text unique not null,

  role text not null,
  description text,

  project_id uuid references projects(id) on delete set null,
  mogul_id uuid references moguls(id) on delete set null,

  status agent_status default 'idle',

  model_provider text,
  model_name text,
  system_prompt text,

  last_run_at timestamptz,
  output_summary text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
9. AI AGENT RUNS
create table ai_agent_runs (
  id uuid primary key default gen_random_uuid(),

  agent_id uuid references ai_agents(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  user_id uuid references profiles(id) on delete set null,

  input jsonb,
  output jsonb,

  status text default 'completed',
  error_message text,

  tokens_used int,
  cost_estimate numeric,

  created_at timestamptz default now()
);
10. DOCUMENTS
create table documents (
  id uuid primary key default gen_random_uuid(),

  project_id uuid references projects(id) on delete cascade,
  uploaded_by uuid references profiles(id) on delete set null,

  title text not null,
  file_url text not null,
  storage_bucket text,
  storage_path text,

  file_type text,
  file_size bigint,

  visibility document_visibility default 'private',

  summary text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
11. PROJECT UPDATES
create table project_updates (
  id uuid primary key default gen_random_uuid(),

  project_id uuid references projects(id) on delete cascade,
  author_id uuid references profiles(id) on delete set null,

  title text not null,
  body text,

  visibility document_visibility default 'private',
  update_type text default 'general',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

Update types:

general
milestone
delay
launch
risk
client_note
ai_summary
financial
12. PORTFOLIO COMPANIES
create table portfolio_companies (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  slug text unique not null,

  industry text,
  location text,

  ownership_type portfolio_ownership_type,

  ownership_percent numeric check (
    ownership_percent is null
    or ownership_percent >= 0
    and ownership_percent <= 100
  ),

  valuation_estimate numeric,
  revenue_estimate numeric,
  profit_estimate numeric,

  logo_url text,
  website_url text,

  public_description text,
  private_notes text,

  status text default 'active',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
13. CONTENT POSTS
create table content_posts (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  slug text unique not null,

  type content_type not null,

  excerpt text,
  content text,
  cover_image_url text,

  author_id uuid references profiles(id) on delete set null,

  published boolean default false,
  published_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
14. CONTACT SUBMISSIONS
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),

  full_name text not null,
  email text not null,
  phone text,
  company_name text,

  inquiry_type inquiry_type default 'general',

  message text,

  status text default 'new',

  created_at timestamptz default now()
);
15. INVESTMENT OPPORTUNITIES
create table investment_opportunities (
  id uuid primary key default gen_random_uuid(),

  company_name text not null,
  founder_name text,
  email text,

  industry text,
  country text,

  revenue numeric,
  profit numeric,
  asking_price numeric,
  funding_needed numeric,

  description text,

  status text default 'submitted',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
16. EVENTS
create table events (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  slug text unique not null,

  description text,
  event_type text,

  location text,

  starts_at timestamptz,
  ends_at timestamptz,

  cover_image_url text,
  registration_url text,

  is_public boolean default true,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
17. AUDIT LOGS
create table audit_logs (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references profiles(id) on delete set null,

  action text not null,

  entity_type text,
  entity_id uuid,

  metadata jsonb,

  ip_address text,
  user_agent text,

  created_at timestamptz default now()
);
18. INDEXES
create index idx_profiles_role on profiles(role);
create index idx_profiles_status on profiles(status);

create index idx_moguls_slug on moguls(slug);
create index idx_moguls_active on moguls(is_active);

create index idx_projects_slug on projects(slug);
create index idx_projects_mogul_id on projects(mogul_id);
create index idx_projects_type on projects(type);
create index idx_projects_visibility on projects(visibility);
create index idx_projects_status on projects(status);

create index idx_project_members_project_id on project_members(project_id);
create index idx_project_members_user_id on project_members(user_id);

create index idx_project_milestones_project_id on project_milestones(project_id);
create index idx_tasks_project_id on tasks(project_id);
create index idx_tasks_assigned_to on tasks(assigned_to);

create index idx_ai_agents_project_id on ai_agents(project_id);
create index idx_ai_agents_mogul_id on ai_agents(mogul_id);

create index idx_documents_project_id on documents(project_id);
create index idx_project_updates_project_id on project_updates(project_id);

create index idx_portfolio_companies_slug on portfolio_companies(slug);
create index idx_content_posts_slug on content_posts(slug);
create index idx_content_posts_published on content_posts(published);

create index idx_audit_logs_user_id on audit_logs(user_id);
create index idx_audit_logs_entity on audit_logs(entity_type, entity_id);
19. UPDATED_AT TRIGGER
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
before update on profiles
for each row execute function set_updated_at();

create trigger set_moguls_updated_at
before update on moguls
for each row execute function set_updated_at();

create trigger set_projects_updated_at
before update on projects
for each row execute function set_updated_at();

create trigger set_project_milestones_updated_at
before update on project_milestones
for each row execute function set_updated_at();

create trigger set_tasks_updated_at
before update on tasks
for each row execute function set_updated_at();

create trigger set_ai_agents_updated_at
before update on ai_agents
for each row execute function set_updated_at();

create trigger set_documents_updated_at
before update on documents
for each row execute function set_updated_at();

create trigger set_project_updates_updated_at
before update on project_updates
for each row execute function set_updated_at();

create trigger set_portfolio_companies_updated_at
before update on portfolio_companies
for each row execute function set_updated_at();

create trigger set_content_posts_updated_at
before update on content_posts
for each row execute function set_updated_at();

create trigger set_investment_opportunities_updated_at
before update on investment_opportunities
for each row execute function set_updated_at();

create trigger set_events_updated_at
before update on events
for each row execute function set_updated_at();
20. ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table moguls enable row level security;
alter table projects enable row level security;
alter table project_members enable row level security;
alter table project_milestones enable row level security;
alter table tasks enable row level security;
alter table ai_agents enable row level security;
alter table ai_agent_runs enable row level security;
alter table documents enable row level security;
alter table project_updates enable row level security;
alter table portfolio_companies enable row level security;
alter table content_posts enable row level security;
alter table contact_submissions enable row level security;
alter table investment_opportunities enable row level security;
alter table events enable row level security;
alter table audit_logs enable row level security;
21. HELPER FUNCTIONS
create or replace function current_user_role()
returns user_role as $$
  select role from profiles where id = auth.uid();
$$ language sql security definer;

create or replace function is_admin_or_founder()
returns boolean as $$
  select exists (
    select 1
    from profiles
    where id = auth.uid()
    and role in ('admin', 'founder')
    and status = 'active'
  );
$$ language sql security definer;

create or replace function is_project_member(project_uuid uuid)
returns boolean as $$
  select exists (
    select 1
    from project_members
    where project_id = project_uuid
    and user_id = auth.uid()
  );
$$ language sql security definer;
22. RLS POLICIES
Profiles
create policy "Users can read their own profile"
on profiles for select
using (id = auth.uid());

create policy "Admins can read all profiles"
on profiles for select
using (is_admin_or_founder());

create policy "Users can update their own profile"
on profiles for update
using (id = auth.uid());

create policy "Admins can update profiles"
on profiles for update
using (is_admin_or_founder());
Moguls
create policy "Public can read active moguls"
on moguls for select
using (is_active = true);

create policy "Admins can manage moguls"
on moguls for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Projects
create policy "Public can read public or anonymous projects"
on projects for select
using (visibility in ('public', 'anonymous'));

create policy "Project members can read assigned projects"
on projects for select
using (is_project_member(id));

create policy "Admins can manage projects"
on projects for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Project Members
create policy "Users can read their project memberships"
on project_members for select
using (user_id = auth.uid());

create policy "Admins can manage project members"
on project_members for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Milestones
create policy "Project members can read milestones"
on project_milestones for select
using (is_project_member(project_id) or is_admin_or_founder());

create policy "Admins can manage milestones"
on project_milestones for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Tasks
create policy "Project members can read tasks"
on tasks for select
using (is_project_member(project_id) or assigned_to = auth.uid() or is_admin_or_founder());

create policy "Admins can manage tasks"
on tasks for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
AI Agents
create policy "Public can read unassigned active public agents"
on ai_agents for select
using (project_id is null and status in ('idle', 'active'));

create policy "Project members can read project agents"
on ai_agents for select
using (
  project_id is not null
  and is_project_member(project_id)
  or is_admin_or_founder()
);

create policy "Admins can manage ai agents"
on ai_agents for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Documents
create policy "Public can read public documents"
on documents for select
using (visibility = 'public');

create policy "Project members can read project documents"
on documents for select
using (is_project_member(project_id) or is_admin_or_founder());

create policy "Admins can manage documents"
on documents for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Project Updates
create policy "Public can read public updates"
on project_updates for select
using (visibility = 'public');

create policy "Project members can read private updates"
on project_updates for select
using (is_project_member(project_id) or is_admin_or_founder());

create policy "Admins can manage project updates"
on project_updates for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Portfolio Companies
create policy "Public can read active portfolio companies"
on portfolio_companies for select
using (status = 'active');

create policy "Admins can manage portfolio companies"
on portfolio_companies for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Content Posts
create policy "Public can read published content"
on content_posts for select
using (published = true);

create policy "Admins can manage content"
on content_posts for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Contact Submissions
create policy "Anyone can submit contact form"
on contact_submissions for insert
with check (true);

create policy "Admins can read contact submissions"
on contact_submissions for select
using (is_admin_or_founder());

create policy "Admins can update contact submissions"
on contact_submissions for update
using (is_admin_or_founder());
Investment Opportunities
create policy "Anyone can submit investment opportunities"
on investment_opportunities for insert
with check (true);

create policy "Admins can manage investment opportunities"
on investment_opportunities for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Events
create policy "Public can read public events"
on events for select
using (is_public = true);

create policy "Admins can manage events"
on events for all
using (is_admin_or_founder())
with check (is_admin_or_founder());
Audit Logs
create policy "Admins can read audit logs"
on audit_logs for select
using (is_admin_or_founder());

create policy "System can insert audit logs"
on audit_logs for insert
with check (true);
23. SEED DATA
insert into moguls (
  name,
  slug,
  type,
  short_description,
  accent_color,
  order_index
) values
(
  'Intelligence Mogul',
  'intelligence-mogul',
  'intelligence',
  'The strategic brain of the empire: research, market intelligence, competitive analysis, and executive decision systems.',
  '#D6A84F',
  1
),
(
  'AI Mogul',
  'ai-mogul',
  'ai',
  'The digital workforce of the empire: AI agents, automation, voice systems, company memory, and intelligent workflows.',
  '#5E6CFF',
  2
),
(
  'Venture Mogul',
  'venture-mogul',
  'venture',
  'The startup factory of the empire: internal ventures, prototypes, products, and companies being built.',
  '#8B5CF6',
  3
),
(
  'Capital Mogul',
  'capital-mogul',
  'capital',
  'The capital engine of the empire: investments, acquisitions, portfolio management, real estate, and financial strategy.',
  '#F2C66D',
  4
),
(
  'Growth Mogul',
  'growth-mogul',
  'growth',
  'The revenue engine of the empire: sales systems, marketing, CRM, funnels, partnerships, and growth operations.',
  '#22C55E',
  5
),
(
  'Studio Mogul',
  'studio-mogul',
  'studio',
  'The creative engine of the empire: brand, design, websites, motion, product UI, content, and luxury digital experiences.',
  '#EC4899',
  6
),
(
  'Innovation Mogul',
  'innovation-mogul',
  'innovation',
  'The research and experimentation engine: future technology, internal tools, patents, product experiments, and moonshots.',
  '#06B6D4',
  7
),
(
  'Knowledge Mogul',
  'knowledge-mogul',
  'knowledge',
  'The education engine of the empire: founder programs, executive training, AI certifications, playbooks, and community.',
  '#F97316',
  8
);
24. FUTURE TABLES

Add later when needed:

payments
subscriptions
invoices
contracts
messages
notifications
calendar_events
crm_contacts
crm_deals
ai_memories
vector_documents
company_financials
portfolio_transactions
equity_records
investor_relations