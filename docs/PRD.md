{

&#x20; "prd": {

&#x20;   "1\_product\_title": {

&#x20;     "name": "Mansas Moguls",

&#x20;     "tagline": "The Empire Operating System for building, acquiring, scaling, and compounding intelligent businesses."

&#x20;   },

&#x20;   "2\_main\_user\_goal": {

&#x20;     "primary\_goal": "Create a premium public website and private dashboard for Mansas Moguls, positioning it as an AI-powered holding empire with multiple Moguls, internal ventures, partner projects, stealth projects, portfolio companies, and future investment infrastructure.",

&#x20;     "problem\_being\_solved": "Most holding companies, agencies, AI startups, and venture studios look disconnected, boring, or unclear. Mansas Moguls needs one powerful digital home that shows the empire vision, explains each Mogul division, displays selected projects without exposing sensitive client work, and gives partners/private users a dashboard to track projects, progress, tasks, AI agents, milestones, and growth.",

&#x20;     "key\_value\_proposition": "Mansas Moguls is not a normal agency or startup. It is an empire that creates, operates, automates, invests in, and scales businesses through AI, capital, growth systems, creative production, venture building, and strategic intelligence."

&#x20;   },

&#x20;   "3\_tech\_stack": {

&#x20;     "frontend": \["Next.js", "TypeScript", "TailwindCSS", "shadcn/ui", "Framer Motion", "React Hook Form", "Zod"],

&#x20;     "backend": \["Supabase Postgres", "Supabase Edge Functions"],

&#x20;     "authentication": \["Google OAuth", "JWT", "Supabase Auth", "Role Based Access Control"],

&#x20;     "database": "Postgres",

&#x20;     "hosting\_infra": \["Vercel", "Cloudflare", "Supabase"],

&#x20;     "integrations": \[

&#x20;       "OpenAI API or OpenRouter for AI agents",

&#x20;       "Resend for transactional emails",

&#x20;       "Stripe or Whop for payments later",

&#x20;       "Google Analytics",

&#x20;       "PostHog",

&#x20;       "Cloudflare Turnstile",

&#x20;       "Calendly or custom booking",

&#x20;       "Notion or Linear sync later",

&#x20;       "GoHighLevel CRM optional later"

&#x20;     ]

&#x20;   },

&#x20;   "4\_authentication\_and\_login": {

&#x20;     "user\_roles": {

&#x20;       "public\_visitor": "Can view public pages only.",

&#x20;       "partner": "Can view approved partner projects, shared milestones, documents, and updates.",

&#x20;       "client": "Can view only their own project dashboard.",

&#x20;       "team\_member": "Can manage assigned tasks and internal project updates.",

&#x20;       "admin": "Can manage projects, pages, users, roles, content, and visibility.",

&#x20;       "founder": "Full empire command access."

&#x20;     },

&#x20;     "login\_pages": {

&#x20;       "public\_login": "/login",

&#x20;       "dashboard": "/dashboard",

&#x20;       "admin": "/admin",

&#x20;       "partner\_portal": "/partner"

&#x20;     },

&#x20;     "security\_rules": \[

&#x20;       "All private routes require authentication.",

&#x20;       "Every project must have visibility: public, anonymous, private, or stealth.",

&#x20;       "Clients can never access other clients' projects.",

&#x20;       "Stealth projects are visible only to founder/admin roles.",

&#x20;       "Public project pages must expose only approved fields."

&#x20;     ]

&#x20;   },

&#x20;   "5\_backend\_database\_schema": {

&#x20;     "profiles": {

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "email": "text unique",

&#x20;         "full\_name": "text",

&#x20;         "avatar\_url": "text nullable",

&#x20;         "role": "enum: public\_visitor, partner, client, team\_member, admin, founder",

&#x20;         "company\_name": "text nullable",

&#x20;         "created\_at": "timestamp"

&#x20;       }

&#x20;     },

&#x20;     "moguls": {

&#x20;       "description": "Permanent empire divisions.",

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "name": "text",

&#x20;         "slug": "text unique",

&#x20;         "short\_description": "text",

&#x20;         "full\_description": "text",

&#x20;         "category": "text",

&#x20;         "icon": "text",

&#x20;         "hero\_image": "text",

&#x20;         "accent\_color": "text",

&#x20;         "order\_index": "integer",

&#x20;         "is\_active": "boolean"

&#x20;       },

&#x20;       "default\_moguls": \[

&#x20;         "Intelligence Mogul",

&#x20;         "AI Mogul",

&#x20;         "Venture Mogul",

&#x20;         "Capital Mogul",

&#x20;         "Growth Mogul",

&#x20;         "Studio Mogul",

&#x20;         "Innovation Mogul",

&#x20;         "Knowledge Mogul"

&#x20;       ]

&#x20;     },

&#x20;     "projects": {

&#x20;       "description": "All internal, partner, client, stealth, and venture projects.",

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "mogul\_id": "uuid foreign key",

&#x20;         "name": "text",

&#x20;         "slug": "text unique",

&#x20;         "type": "enum: empire\_project, partner\_project, client\_project, stealth\_project, portfolio\_company",

&#x20;         "visibility": "enum: public, anonymous, private, stealth",

&#x20;         "status": "enum: idea, research, design, building, alpha, beta, launched, revenue, scaled, archived",

&#x20;         "progress\_percent": "integer",

&#x20;         "short\_description": "text",

&#x20;         "full\_description": "text",

&#x20;         "industry": "text",

&#x20;         "hero\_image": "text",

&#x20;         "cover\_image": "text",

&#x20;         "client\_name": "text nullable",

&#x20;         "is\_client\_name\_public": "boolean",

&#x20;         "started\_at": "date",

&#x20;         "target\_launch\_date": "date nullable",

&#x20;         "created\_at": "timestamp"

&#x20;       }

&#x20;     },

&#x20;     "project\_milestones": {

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "project\_id": "uuid foreign key",

&#x20;         "title": "text",

&#x20;         "description": "text",

&#x20;         "status": "enum: pending, in\_progress, completed, blocked",

&#x20;         "due\_date": "date nullable",

&#x20;         "order\_index": "integer"

&#x20;       }

&#x20;     },

&#x20;     "tasks": {

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "project\_id": "uuid foreign key",

&#x20;         "assigned\_to": "uuid nullable",

&#x20;         "title": "text",

&#x20;         "description": "text",

&#x20;         "status": "enum: todo, doing, review, done",

&#x20;         "priority": "enum: low, medium, high, urgent",

&#x20;         "due\_date": "date nullable"

&#x20;       }

&#x20;     },

&#x20;     "ai\_agents": {

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "name": "text",

&#x20;         "role": "text",

&#x20;         "project\_id": "uuid nullable",

&#x20;         "status": "enum: idle, active, paused, error",

&#x20;         "last\_run\_at": "timestamp nullable",

&#x20;         "output\_summary": "text nullable"

&#x20;       }

&#x20;     },

&#x20;     "portfolio\_companies": {

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "name": "text",

&#x20;         "industry": "text",

&#x20;         "ownership\_type": "enum: owned, invested, acquired, incubated, partner",

&#x20;         "valuation\_estimate": "numeric nullable",

&#x20;         "revenue\_estimate": "numeric nullable",

&#x20;         "location": "text",

&#x20;         "public\_description": "text",

&#x20;         "logo\_url": "text",

&#x20;         "website\_url": "text nullable"

&#x20;       }

&#x20;     },

&#x20;     "content\_posts": {

&#x20;       "fields": {

&#x20;         "id": "uuid primary key",

&#x20;         "title": "text",

&#x20;         "slug": "text unique",

&#x20;         "type": "enum: article, announcement, video, podcast, research, case\_study",

&#x20;         "content": "text",

&#x20;         "cover\_image": "text",

&#x20;         "published": "boolean",

&#x20;         "created\_at": "timestamp"

&#x20;       }

&#x20;     }

&#x20;   },

&#x20;   "6\_pages\_and\_navigation": {

&#x20;     "main\_navigation": {

&#x20;       "left\_logo": "Mansas Moguls crown monogram with Empire wordmark",

&#x20;       "nav\_items": \[

&#x20;         "Empire",

&#x20;         "Moguls",

&#x20;         "Projects",

&#x20;         "Portfolio",

&#x20;         "Intelligence",

&#x20;         "Media",

&#x20;         "Join The Empire"

&#x20;       ],

&#x20;       "cta\_button": "Enter Dashboard"

&#x20;     },

&#x20;     "public\_pages": {

&#x20;       "/": "Home",

&#x20;       "/empire": "Empire overview, vision, mission, values, global ambition",

&#x20;       "/moguls": "All Moguls overview",

&#x20;       "/moguls/\[slug]": "Individual Mogul division page",

&#x20;       "/projects": "Approved public project index",

&#x20;       "/projects/empire": "Internal empire projects",

&#x20;       "/projects/partners": "Approved partner projects",

&#x20;       "/projects/stealth": "Anonymous stealth showcase",

&#x20;       "/projects/\[slug]": "Project detail page",

&#x20;       "/portfolio": "Portfolio companies and investments",

&#x20;       "/intelligence": "Reports, insights, market intelligence, AI research",

&#x20;       "/media": "Articles, videos, podcasts, newsroom",

&#x20;       "/about": "Story, leadership, philosophy",

&#x20;       "/careers": "Open roles and culture",

&#x20;       "/investors": "Investor relations",

&#x20;       "/events": "Events, webinars, appearances",

&#x20;       "/contact": "Contact form",

&#x20;       "/login": "Login",

&#x20;       "/dashboard": "Private dashboard"

&#x20;     },

&#x20;     "dashboard\_pages": {

&#x20;       "/dashboard": "Empire command center",

&#x20;       "/dashboard/projects": "Project management",

&#x20;       "/dashboard/projects/\[id]": "Project workspace",

&#x20;       "/dashboard/tasks": "Tasks",

&#x20;       "/dashboard/agents": "AI agents",

&#x20;       "/dashboard/milestones": "Milestones",

&#x20;       "/dashboard/files": "Documents and assets",

&#x20;       "/dashboard/messages": "Partner/client communication",

&#x20;       "/dashboard/settings": "Account and access"

&#x20;     }

&#x20;   },

&#x20;   "7\_page\_by\_page\_component\_breakdown": {

&#x20;     "home\_page": {

&#x20;       "hero": {

&#x20;         "layout": "Full-screen cinematic black/gold hero with 3D empire visual, Dubai skyline, animated particles, and central crown mark.",

&#x20;         "headline": "Mansas Moguls",

&#x20;         "subheadline": "The Empire Operating System",

&#x20;         "copy": "We build, acquire, automate, and scale intelligent businesses.",

&#x20;         "ctas": \["Explore The Empire", "Join The Empire"],

&#x20;         "metrics": \["Active Projects", "AI Agents", "Portfolio Companies", "Markets"]

&#x20;       },

&#x20;       "sections": \[

&#x20;         "Empire flywheel: Build → Acquire → Automate → Scale → Compound",

&#x20;         "Eight Moguls grid",

&#x20;         "Featured projects",

&#x20;         "Portfolio preview",

&#x20;         "Intelligence preview",

&#x20;         "Partner CTA"

&#x20;       ]

&#x20;     },

&#x20;     "empire\_page": {

&#x20;       "purpose": "Explain the big vision.",

&#x20;       "sections": \[

&#x20;         "Mission",

&#x20;         "Why the empire exists",

&#x20;         "Operating philosophy",

&#x20;         "Berkshire Hathaway inspired capital compounding model",

&#x20;         "AI operating layer",

&#x20;         "Global expansion roadmap"

&#x20;       ]

&#x20;     },

&#x20;     "moguls\_page": {

&#x20;       "purpose": "Show the permanent divisions of the empire.",

&#x20;       "layout": "Dark card grid with each Mogul represented by a premium image, icon, description, and status.",

&#x20;       "cards": \[

&#x20;         "Intelligence Mogul",

&#x20;         "AI Mogul",

&#x20;         "Venture Mogul",

&#x20;         "Capital Mogul",

&#x20;         "Growth Mogul",

&#x20;         "Studio Mogul",

&#x20;         "Innovation Mogul",

&#x20;         "Knowledge Mogul"

&#x20;       ]

&#x20;     },

&#x20;     "individual\_mogul\_page": {

&#x20;       "layout": "Hero image, division purpose, capabilities, active projects, case studies, metrics, CTA.",

&#x20;       "components": \[

&#x20;         "Mogul hero",

&#x20;         "Capability cards",

&#x20;         "Project list",

&#x20;         "Related portfolio companies",

&#x20;         "Internal metrics",

&#x20;         "CTA to partner or apply"

&#x20;       ]

&#x20;     },

&#x20;     "projects\_page": {

&#x20;       "purpose": "Show the empire in motion without exposing sensitive client work.",

&#x20;       "filters": \[

&#x20;         "All",

&#x20;         "Empire Projects",

&#x20;         "Partner Projects",

&#x20;         "Stealth Projects",

&#x20;         "Portfolio Companies"

&#x20;       ],

&#x20;       "project\_card": {

&#x20;         "fields": \[

&#x20;           "Project image",

&#x20;           "Name or anonymous label",

&#x20;           "Type",

&#x20;           "Status",

&#x20;           "Progress bar",

&#x20;           "Mogul owner",

&#x20;           "Short description",

&#x20;           "Launch stage"

&#x20;         ]

&#x20;       }

&#x20;     },

&#x20;     "project\_detail\_page": {

&#x20;       "public\_version": \[

&#x20;         "Hero",

&#x20;         "Overview",

&#x20;         "Problem",

&#x20;         "Solution",

&#x20;         "Progress",

&#x20;         "Milestones",

&#x20;         "Screenshots",

&#x20;         "Mogul owner",

&#x20;         "CTA"

&#x20;       ],

&#x20;       "private\_version": \[

&#x20;         "Full roadmap",

&#x20;         "Tasks",

&#x20;         "Documents",

&#x20;         "AI agent logs",

&#x20;         "Client notes",

&#x20;         "Deadlines",

&#x20;         "Private comments",

&#x20;         "Files"

&#x20;       ]

&#x20;     },

&#x20;     "portfolio\_page": {

&#x20;       "purpose": "Show owned companies, investments, acquisitions, and incubated ventures.",

&#x20;       "sections": \[

&#x20;         "Portfolio metrics",

&#x20;         "Company grid",

&#x20;         "Investment thesis",

&#x20;         "Acquisition criteria",

&#x20;         "Submit a company"

&#x20;       ]

&#x20;     },

&#x20;     "intelligence\_page": {

&#x20;       "purpose": "Position Mansas Moguls as a serious strategy and market intelligence empire.",

&#x20;       "sections": \[

&#x20;         "Market reports",

&#x20;         "AI insights",

&#x20;         "Industry dashboards",

&#x20;         "Research library",

&#x20;         "Executive briefings"

&#x20;       ]

&#x20;     },

&#x20;     "media\_page": {

&#x20;       "purpose": "Content hub for articles, videos, podcasts, announcements.",

&#x20;       "sections": \[

&#x20;         "Featured story",

&#x20;         "Latest articles",

&#x20;         "Video grid",

&#x20;         "Podcast grid",

&#x20;         "Press kit"

&#x20;       ]

&#x20;     },

&#x20;     "join\_page": {

&#x20;       "purpose": "Convert partners, clients, investors, talent, and founders.",

&#x20;       "forms": \[

&#x20;         "Become a partner",

&#x20;         "Submit a company",

&#x20;         "Apply for career",

&#x20;         "Investor inquiry",

&#x20;         "Build with us"

&#x20;       ]

&#x20;     },

&#x20;     "dashboard\_page": {

&#x20;       "purpose": "Private command center.",

&#x20;       "components": \[

&#x20;         "Empire metrics",

&#x20;         "Active projects",

&#x20;         "Tasks due",

&#x20;         "AI agents running",

&#x20;         "Milestones",

&#x20;         "Revenue pipeline",

&#x20;         "Notifications",

&#x20;         "Recent activity"

&#x20;       ]

&#x20;     }

&#x20;   },

&#x20;   "8\_user\_journey": \[

&#x20;     {

&#x20;       "step": 1,

&#x20;       "name": "Discover",

&#x20;       "description": "User lands on cinematic homepage and understands Mansas Moguls is an empire, not an agency."

&#x20;     },

&#x20;     {

&#x20;       "step": 2,

&#x20;       "name": "Explore",

&#x20;       "description": "User explores Moguls to understand the empire divisions."

&#x20;     },

&#x20;     {

&#x20;       "step": 3,

&#x20;       "name": "Believe",

&#x20;       "description": "User sees projects, portfolio, intelligence, and media proof."

&#x20;     },

&#x20;     {

&#x20;       "step": 4,

&#x20;       "name": "Convert",

&#x20;       "description": "User chooses to partner, invest, apply, or request a build."

&#x20;     },

&#x20;     {

&#x20;       "step": 5,

&#x20;       "name": "Enter Private Portal",

&#x20;       "description": "Approved users access a dashboard with their projects, milestones, files, and updates."

&#x20;     }

&#x20;   ],

&#x20;   "9\_app\_file\_structure": {

&#x20;     "root": {

&#x20;       "app": {

&#x20;         "(public)": \[

&#x20;           "page.tsx",

&#x20;           "empire/page.tsx",

&#x20;           "moguls/page.tsx",

&#x20;           "moguls/\[slug]/page.tsx",

&#x20;           "projects/page.tsx",

&#x20;           "projects/\[slug]/page.tsx",

&#x20;           "portfolio/page.tsx",

&#x20;           "intelligence/page.tsx",

&#x20;           "media/page.tsx",

&#x20;           "about/page.tsx",

&#x20;           "careers/page.tsx",

&#x20;           "investors/page.tsx",

&#x20;           "events/page.tsx",

&#x20;           "contact/page.tsx",

&#x20;           "login/page.tsx"

&#x20;         ],

&#x20;         "(dashboard)": \[

&#x20;           "dashboard/page.tsx",

&#x20;           "dashboard/projects/page.tsx",

&#x20;           "dashboard/projects/\[id]/page.tsx",

&#x20;           "dashboard/tasks/page.tsx",

&#x20;           "dashboard/agents/page.tsx",

&#x20;           "dashboard/files/page.tsx",

&#x20;           "dashboard/settings/page.tsx"

&#x20;         ],

&#x20;         "api": \[

&#x20;           "auth",

&#x20;           "projects",

&#x20;           "moguls",

&#x20;           "portfolio",

&#x20;           "content",

&#x20;           "contact"

&#x20;         ]

&#x20;       },

&#x20;       "components": {

&#x20;         "layout": \[

&#x20;           "Navbar.tsx",

&#x20;           "Footer.tsx",

&#x20;           "EmpireShell.tsx",

&#x20;           "DashboardSidebar.tsx"

&#x20;         ],

&#x20;         "home": \[

&#x20;           "HeroEmpire.tsx",

&#x20;           "EmpireFlywheel.tsx",

&#x20;           "MogulsGrid.tsx",

&#x20;           "FeaturedProjects.tsx"

&#x20;         ],

&#x20;         "projects": \[

&#x20;           "ProjectCard.tsx",

&#x20;           "ProjectFilters.tsx",

&#x20;           "ProjectTimeline.tsx",

&#x20;           "ProjectProgress.tsx"

&#x20;         ],

&#x20;         "dashboard": \[

&#x20;           "MetricCard.tsx",

&#x20;           "TaskBoard.tsx",

&#x20;           "AgentStatus.tsx",

&#x20;           "MilestoneTracker.tsx"

&#x20;         ],

&#x20;         "ui": \[

&#x20;           "button.tsx",

&#x20;           "card.tsx",

&#x20;           "dialog.tsx",

&#x20;           "tabs.tsx",

&#x20;           "badge.tsx",

&#x20;           "progress.tsx"

&#x20;         ]

&#x20;       },

&#x20;       "lib": \[

&#x20;         "supabase.ts",

&#x20;         "auth.ts",

&#x20;         "permissions.ts",

&#x20;         "seo.ts",

&#x20;         "utils.ts"

&#x20;       ],

&#x20;       "styles": \[

&#x20;         "globals.css"

&#x20;       ]

&#x20;     }

&#x20;   },

&#x20;   "10\_cybersecurity\_measures": {

&#x20;     "authentication": \[

&#x20;       "Use Supabase Auth with secure session handling.",

&#x20;       "Require role based access control on all dashboard routes.",

&#x20;       "Use middleware to protect private routes.",

&#x20;       "Use server side checks for every sensitive data request."

&#x20;     ],

&#x20;     "authorization": \[

&#x20;       "Apply Row Level Security on all Supabase tables.",

&#x20;       "Project access must be checked by user role and project membership.",

&#x20;       "Stealth projects must only be visible to founder/admin.",

&#x20;       "Client users can only read their own assigned projects."

&#x20;     ],

&#x20;     "data\_protection": \[

&#x20;       "Never expose private client names unless approved.",

&#x20;       "Use visibility levels for all projects.",

&#x20;       "Store sensitive files in private Supabase buckets.",

&#x20;       "Generate signed URLs for private file access.",

&#x20;       "Encrypt secrets in environment variables only."

&#x20;     ],

&#x20;     "frontend\_security": \[

&#x20;       "Use Zod validation on all forms.",

&#x20;       "Sanitize user generated content.",

&#x20;       "Apply strict Content Security Policy.",

&#x20;       "Prevent XSS through safe rendering.",

&#x20;       "Disable public indexing on private routes."

&#x20;     ],

&#x20;     "backend\_security": \[

&#x20;       "Rate limit contact forms and login attempts.",

&#x20;       "Use Cloudflare Turnstile on public forms.",

&#x20;       "Log admin actions.",

&#x20;       "Monitor suspicious access attempts.",

&#x20;       "Use least privilege service keys."

&#x20;     ],

&#x20;     "compliance\_and\_privacy": \[

&#x20;       "Cookie consent banner.",

&#x20;       "Privacy policy.",

&#x20;       "Terms of service.",

&#x20;       "NDA aware project visibility.",

&#x20;       "Audit logs for project access."

&#x20;     ]

&#x20;   }

&#x20; }

}

