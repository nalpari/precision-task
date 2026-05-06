# Graph Report - .  (2026-05-06)

## Corpus Check
- 30 files · ~67,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 236 nodes · 250 edges · 32 communities detected
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
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
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]

## God Nodes (most connected - your core abstractions)
1. `My Todo` - 43 edges
2. `My Todo App` - 10 edges
3. `getUserOrThrow()` - 8 edges
4. `getUserOrThrow` - 6 edges
5. `TodoListClient` - 6 edges
6. `reduce (optimistic reducer)` - 6 edges
7. `public.todos table` - 6 edges
8. `revalidateTodoRoutes()` - 6 edges
9. `Supabase (Postgres + Auth)` - 6 edges
10. `src/app/page.tsx (auth gate)` - 6 edges

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
- **Same-day-group reorder invariant defenders (client SortableContext + server tzOffsetMinutes/dayKey + reorderTodo)** — agents_dnd_context, agents_reorder_todo, agents_tz_offset_minutes [EXTRACTED 1.00]
- **Mutation pipeline: server actions revalidate todo routes via shared helper** — agents_server_actions, agents_revalidate_todo_routes, agents_page_tsx [EXTRACTED 1.00]
- **Authentication gate: proxy refresh + server-side getUser + login redirect** — agents_proxy_ts, agents_get_user_or_throw, agents_login_route [EXTRACTED 1.00]
- **Optimistic todo stack: TodoListView renders, todoReducer holds useOptimistic state, server actions persist** — agents_todo_list_view, agents_todo_reducer, agents_server_actions [EXTRACTED 1.00]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (44): app/layout.tsx, app/page.tsx (보호된 todo 페이지), austere luxury black UI, app/auth/callback/route.ts, 인증 게이트 위치 = Server Component, app/auth/signout/route.ts, public/images/business-hero.png, DESIGN.md (+36 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (29): ActiveDashboardClient, src/app/active/page.tsx, AppHeader component, /auth/callback Route Handler (exchangeCodeForSession), Auth flow (proxy refresh -> getUser gate -> magic link / Google OAuth -> callback), /auth/signout (POST), dashboard/Charts.tsx (self-rendered SVG), dayKey() helper (user-local TZ grouping) (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (21): Page (Server Component), public.todos table, Todo type, TodoFilter type, TodoItem commit (inline edit), TodoItem, dayKey helper, handleAdd (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.2
Nodes (15): Browser createClient (Supabase), Bugatti Austere Luxury Design System, hero-photo-band component, button-primary (transparent pill, white outline), spec-cell component, text-input (transparent, hairline underline), Bugatti Typography Trinity (Display/Text/Mono), EmailMagicLinkForm (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (15): Git commit message convention (type: subject), Supabase MCP execute_sql + get_advisors workflow, karpathy-guidelines, Korean-only response convention, My Todo App, Next.js 16.2.4 (App Router, Turbopack), pnpm package manager, src/proxy.ts (token refresh only) (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (15): app/_actions/todos.ts (Server Actions), Supabase Dashboard SQL Editor 적용, supabase db push (CLI 적용), 데이터 격리 다층 방어 (RLS + getUserOrThrow), 0001_init_todos.sql, 0002_add_todos_position.sql, 코드 배포 전 마이그레이션 선적용 요구사항, position double precision 컬럼 (DnD 정렬) (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.58
Nodes (8): addTodo(), getUserOrThrow(), localDayKey(), removeTodo(), renameTodo(), reorderTodo(), revalidateTodoRoutes(), toggleTodo()

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (4): GET(), handleSubmit(), POST(), createClient()

### Community 9 - "Community 9"
Cohesion: 0.47
Nodes (3): computeAgeBuckets(), computeWeekly(), dayKey()

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (4): NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_URL, service_role 키 사용 금지, 2. 환경변수 (.env.local)

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (2): src/app/_components/, src/lib/supabase/client.ts

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (2): NEXT_PUBLIC_* env exposure rule, service_role key forbidden in client

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (2): graphify-out/GRAPH_REPORT.md, graphify-out/ knowledge graph workflow

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (1): PostCSS Config (Tailwind v4)

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (1): Next.js Type References

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (1): ESLint Config

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (1): Next.js Config (reactCompiler enabled)

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (1): proxy() — token refresh proxy

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (1): proxy matcher config

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (1): FilterTabs

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (1): CLAUDE.md (delegates to AGENTS.md)

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (1): File Icon

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (1): Vercel Logo (Triangle Mark)

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (1): Next.js Wordmark Logo (SVG)

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (1): Globe Icon (globe.svg)

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (1): Window Icon (browser/window UI glyph)

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (1): Business Hero Image - Modern Executive Office at Night

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (1): Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (1): Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (1): Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (1): Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (1): Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay

## Knowledge Gaps
- **89 isolated node(s):** `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config`, `Next.js Config (reactCompiler enabled)`, `proxy() — token refresh proxy` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 21`** (2 nodes): `src/app/_components/`, `src/lib/supabase/client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `NEXT_PUBLIC_* env exposure rule`, `service_role key forbidden in client`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `graphify-out/GRAPH_REPORT.md`, `graphify-out/ knowledge graph workflow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `PostCSS Config (Tailwind v4)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `Next.js Type References`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `ESLint Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `Next.js Config (reactCompiler enabled)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `proxy() — token refresh proxy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `proxy matcher config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `FilterTabs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `CLAUDE.md (delegates to AGENTS.md)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `Vercel Logo (Triangle Mark)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `Next.js Wordmark Logo (SVG)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `Globe Icon (globe.svg)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `Window Icon (browser/window UI glyph)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `Business Hero Image - Modern Executive Office at Night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `My Todo` connect `Community 0` to `Community 11`, `Community 5`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `Supabase (Postgres + Auth)` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._