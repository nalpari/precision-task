# Graph Report - .  (2026-05-06)

## Corpus Check
- 30 files · ~67,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 187 nodes · 192 edges · 30 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Todo Domain & Conventions|Todo Domain & Conventions]]
- [[_COMMUNITY_Routing & Auth Surface|Routing & Auth Surface]]
- [[_COMMUNITY_Auth UI & Design System|Auth UI & Design System]]
- [[_COMMUNITY_Server Actions|Server Actions]]
- [[_COMMUNITY_Active Dashboard & DnD|Active Dashboard & DnD]]
- [[_COMMUNITY_Project Conventions & Graphify|Project Conventions & Graphify]]
- [[_COMMUNITY_Project Stack Overview|Project Stack Overview]]
- [[_COMMUNITY_Data Security & RLS|Data Security & RLS]]
- [[_COMMUNITY_ActiveDashboardClient Module|ActiveDashboardClient Module]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]

## God Nodes (most connected - your core abstractions)
1. `Architecture Conventions` - 13 edges
2. `Project Snapshot` - 9 edges
3. `Workflow Guide (작업 순서 가이드)` - 9 edges
4. `getUserOrThrow()` - 7 edges
5. `Bugatti Austere Luxury Design System` - 6 edges
6. `getUserOrThrow` - 6 edges
7. `TodoListClient` - 6 edges
8. `reduce (optimistic reducer)` - 6 edges
9. `public.todos table` - 6 edges
10. `Auth Flow` - 6 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout (fonts + html shell)` --implements--> `Bugatti Typography Trinity (Display/Text/Mono)`  [INFERRED]
  src/app/layout.tsx → DESIGN.md
- `TodoInput component` --implements--> `button-primary (transparent pill, white outline)`  [INFERRED]
  src/app/_components/TodoInput.tsx → DESIGN.md
- `TodoInput component` --implements--> `text-input (transparent, hairline underline)`  [INFERRED]
  src/app/_components/TodoInput.tsx → DESIGN.md
- `EmailMagicLinkForm` --implements--> `button-primary (transparent pill, white outline)`  [INFERRED]
  src/app/_components/login/EmailMagicLinkForm.tsx → DESIGN.md
- `EmailMagicLinkForm` --implements--> `text-input (transparent, hairline underline)`  [INFERRED]
  src/app/_components/login/EmailMagicLinkForm.tsx → DESIGN.md

## Hyperedges (group relationships)
- **Two-page Shared List UX** — agents_app_page_tsx, agents_app_active_page_tsx, agents_todo_list_view, agents_todo_reducer, agents_app_header, agents_active_dashboard_client [EXTRACTED 1.00]
- **Auth-gated Route Pattern** — agents_app_page_tsx, agents_app_active_page_tsx, agents_get_user, agents_login_route, agents_app_header, agents_protected_route_pattern [EXTRACTED 1.00]
- **Optimistic Reorder Flow** — agents_todo_reducer, agents_use_optimistic, agents_reorder_todo_action, agents_fractional_position, agents_group_dnd_constraint, agents_dnd_context [EXTRACTED 1.00]

## Communities

### Community 0 - "Todo Domain & Conventions"
Cohesion: 0.18
Nodes (21): Page (Server Component), public.todos table, Todo type, TodoFilter type, TodoItem commit (inline edit), TodoItem, dayKey helper, handleAdd (+13 more)

### Community 1 - "Routing & Auth Surface"
Cohesion: 0.15
Nodes (19): src/app/active/page.tsx, AppHeader (_components/AppHeader.tsx), src/app/page.tsx, Architecture Conventions, /auth/callback Route Handler, Auth Flow, src/app/_components/, EmailMagicLinkForm (+11 more)

### Community 2 - "Auth UI & Design System"
Cohesion: 0.18
Nodes (16): Browser createClient (Supabase), Bugatti Austere Luxury Design System, hero-photo-band component, button-primary (transparent pill, white outline), spec-cell component, text-input (transparent, hairline underline), Bugatti Typography Trinity (Display/Text/Mono), EmailMagicLinkForm (+8 more)

### Community 3 - "Server Actions"
Cohesion: 0.19
Nodes (10): addTodo(), getUserOrThrow(), removeTodo(), renameTodo(), reorderTodo(), toggleTodo(), GET(), handleSubmit() (+2 more)

### Community 4 - "Active Dashboard & DnD"
Cohesion: 0.19
Nodes (14): ActiveDashboardClient, dashboard/Charts.tsx (Self-SVG Charts), dayKey() (local TZ grouping), DndContext / SortableContext, get_advisors (security + performance), Same-Date Group DnD Constraint, isClient guard (useSyncExternalStore), No External Chart Library Policy (+6 more)

### Community 5 - "Project Conventions & Graphify"
Cohesion: 0.14
Nodes (13): Doc/Graphify Update on Task End, Fractional Position Algorithm, Git Commit Message Convention, graphify-out/GRAPH_REPORT.md, Graphify Usage Guide, graphify update ., karpathy-guidelines, Korean Responses Convention (+5 more)

### Community 6 - "Project Stack Overview"
Cohesion: 0.22
Nodes (9): Multi-user Todo App, pnpm package manager (10.33.2), Project Snapshot, Next.js 16.2.4 (App Router, Turbopack), React 19.2.4 (Compiler enabled), Supabase (Postgres + Auth), Tailwind v4, TypeScript (+1 more)

### Community 8 - "Data Security & RLS"
Cohesion: 0.25
Nodes (8): src/app/_actions/*.ts (Server Actions), Data Security, getUserOrThrow(), NEXT_PUBLIC_* env exposure rule, public.todos table, revalidatePath('/'), RLS Policy ((select auth.uid()) = user_id), service_role key ban

### Community 9 - "ActiveDashboardClient Module"
Cohesion: 0.47
Nodes (3): computeAgeBuckets(), computeWeekly(), dayKey()

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (1): PostCSS Config (Tailwind v4)

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (1): Next.js Type References

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (1): ESLint Config

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (1): Next.js Config (reactCompiler enabled)

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (1): proxy() — token refresh proxy

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (1): proxy matcher config

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (1): FilterTabs

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (1): public.todos schema + RLS policies

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (1): Auth gate in Server Component (not proxy)

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (1): CLAUDE.md (delegates to AGENTS.md)

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (1): File Icon

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (1): Vercel Logo (Triangle Mark)

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (1): Next.js Wordmark Logo (SVG)

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (1): Globe Icon (globe.svg)

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (1): Window Icon (browser/window UI glyph)

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (1): Business Hero Image - Modern Executive Office at Night

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (1): Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (1): Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (1): Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (1): Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (1): Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay

## Knowledge Gaps
- **60 isolated node(s):** `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config`, `Next.js Config (reactCompiler enabled)`, `proxy() — token refresh proxy` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 28`** (1 nodes): `PostCSS Config (Tailwind v4)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `Next.js Type References`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `ESLint Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `Next.js Config (reactCompiler enabled)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `proxy() — token refresh proxy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `proxy matcher config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `FilterTabs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `public.todos schema + RLS policies`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `Auth gate in Server Component (not proxy)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `CLAUDE.md (delegates to AGENTS.md)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `Vercel Logo (Triangle Mark)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `Next.js Wordmark Logo (SVG)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `Globe Icon (globe.svg)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `Window Icon (browser/window UI glyph)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `Business Hero Image - Modern Executive Office at Night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Architecture Conventions` connect `Routing & Auth Surface` to `Data Security & RLS`, `Active Dashboard & DnD`, `Project Conventions & Graphify`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `Project Snapshot` connect `Project Stack Overview` to `Project Conventions & Graphify`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `Workflow Guide (작업 순서 가이드)` connect `Active Dashboard & DnD` to `Routing & Auth Surface`, `Project Conventions & Graphify`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Conventions & Graphify` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._