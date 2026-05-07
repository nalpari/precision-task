# Graph Report - .  (2026-05-07)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 196 nodes · 176 edges · 31 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
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
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `My Todo` - 43 edges
2. `getUserOrThrow()` - 7 edges
3. `Auth flow (proxy refresh -> page gate -> /login -> callback -> signout)` - 7 edges
4. `revalidateTodoRoutes()` - 6 edges
5. `createClient()` - 6 edges
6. `Bugatti Austere Luxury Design System` - 5 edges
7. `5. 데이터베이스 스키마 마이그레이션 적용` - 5 edges
8. `supabase/migrations/ 디렉터리` - 5 edges
9. `0001_init_todos.sql` - 5 edges
10. `renameTodo()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `createClient()`  [INFERRED]
  src/app/auth/signout/route.ts → src/lib/supabase/server.ts
- `GET()` --calls--> `createClient()`  [INFERRED]
  src/app/auth/callback/route.ts → src/lib/supabase/server.ts
- `getUserOrThrow()` --calls--> `createClient()`  [INFERRED]
  src/app/_actions/todos.ts → src/lib/supabase/server.ts
- `handleSubmit()` --calls--> `createClient()`  [INFERRED]
  src/app/_components/login/EmailMagicLinkForm.tsx → src/lib/supabase/server.ts
- `handleClick()` --calls--> `createClient()`  [INFERRED]
  src/app/_components/login/GoogleSignInButton.tsx → src/lib/supabase/server.ts

## Hyperedges (group relationships)
- **Reorder same-group invariant defenders** — agents_todo_list_view, agents_server_local_day_key, agents_reorder_todo, agents_tz_offset_minutes [EXTRACTED 0.95]
- **Self-attack threat acceptance** — agents_rls_policy, agents_reorder_todo, agents_self_attack_acceptance, agents_same_day_group_invariant [EXTRACTED 0.90]
- **Auth gate pattern (proxy refresh + page-level getUser)** — agents_proxy_ts, agents_page_tsx, agents_active_page, agents_get_user_or_throw [EXTRACTED 0.90]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (40): app/layout.tsx, app/page.tsx (보호된 todo 페이지), app/auth/callback/route.ts, 인증 게이트 위치 = Server Component, app/auth/signout/route.ts, EmailMagicLinkForm.tsx, 이메일 매직링크 로그인, FilterTabs.tsx (+32 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (15): app/_actions/todos.ts (Server Actions), Supabase Dashboard SQL Editor 적용, supabase db push (CLI 적용), 데이터 격리 다층 방어 (RLS + getUserOrThrow), 0001_init_todos.sql, 0002_add_todos_position.sql, 코드 배포 전 마이그레이션 선적용 요구사항, position double precision 컬럼 (DnD 정렬) (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (15): src/app/_actions/*.ts server actions, Fractional position precision collision risk, getUserOrThrow() helper, public.todos.position (double precision NOT NULL, single sort key), position default extract(epoch from now()), reorderTodo(id, prevId, nextId, tzOffsetMinutes) server action, public.todos RLS with (select auth.uid()) = user_id, Same-day group reorder invariant (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (11): src/app/active/page.tsx, AppHeader component, /auth/callback Route Handler, Auth flow (proxy refresh -> page gate -> /login -> callback -> signout), /auth/signout POST handler, EmailMagicLinkForm, GoogleSignInButton, Next.js 16 breaking changes notice (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (5): GET(), handleSubmit(), handleClick(), POST(), createClient()

### Community 5 - "Community 5"
Cohesion: 0.56
Nodes (8): addTodo(), getUserOrThrow(), localDayKey(), removeTodo(), renameTodo(), reorderTodo(), revalidateTodoRoutes(), toggleTodo()

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (7): ActiveDashboardClient, Client-first cross-group block (per-group DndContext), dayKey() SSR/client TZ drift, isClient guard (useSyncExternalStore), TodoListView (DnDContext + SortableContext per group), todoReducer (useOptimistic add/toggle/rename/remove/reorder), useOptimistic + Server Action client state

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (6): Bugatti Austere Luxury Design System, hero-photo-band component, button-primary (transparent pill, white outline), spec-cell component, text-input (transparent, hairline underline), Bugatti Typography Trinity (Display/Text/Mono)

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (4): austere luxury black UI, public/images/business-hero.png, DESIGN.md, 디자인 시스템 적용 (Bugatti식 토큰 차용)

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (4): NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_URL, service_role 키 사용 금지, 2. 환경변수 (.env.local)

### Community 14 - "Community 14"
Cohesion: 0.5
Nodes (4): pnpm package manager, Multi-user todo app purpose, Tech stack (Next 16.2.4 / React 19.2.4 / Tailwind v4 / TS / Supabase), Supabase project ref tprewdmslvayiihukefg

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (3): Git commit message format (type: subject Korean), karpathy-guidelines policy, Segmented commit policy

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (3): AGENTS/README/graphify update on task end, graphify-out/GRAPH_REPORT.md, graphify workflow (query/path/explain/update)

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (2): _components/dashboard/Charts.tsx (self-built SVG), External chart library ban

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (2): execute_sql + get_advisors workflow, supabase/migrations/ ordered SQL

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (1): CLAUDE.md (delegates to AGENTS.md)

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (1): File Icon

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (1): Vercel Logo (Triangle Mark)

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (1): Next.js Wordmark Logo (SVG)

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (1): Globe Icon (globe.svg)

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (1): Window Icon (browser/window UI glyph)

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (1): Business Hero Image - Modern Executive Office at Night

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (1): Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (1): Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (1): Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (1): Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (1): Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (1): Korean language reasoning policy

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (1): src/lib/supabase/client.ts

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (1): src/app/_components/ UI components

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (1): src/types/ domain types

## Knowledge Gaps
- **87 isolated node(s):** `Bugatti Typography Trinity (Display/Text/Mono)`, `button-primary (transparent pill, white outline)`, `hero-photo-band component`, `spec-cell component`, `text-input (transparent, hairline underline)` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 24`** (2 nodes): `_components/dashboard/Charts.tsx (self-built SVG)`, `External chart library ban`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `execute_sql + get_advisors workflow`, `supabase/migrations/ ordered SQL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `CLAUDE.md (delegates to AGENTS.md)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `Vercel Logo (Triangle Mark)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `Next.js Wordmark Logo (SVG)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `Globe Icon (globe.svg)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `Window Icon (browser/window UI glyph)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `Business Hero Image - Modern Executive Office at Night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `Korean language reasoning policy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `src/lib/supabase/client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `src/app/_components/ UI components`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `src/types/ domain types`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `My Todo` connect `Community 0` to `Community 1`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `supabase/migrations/ 디렉터리` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `src/app/active/page.tsx` connect `Community 3` to `Community 6`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `createClient()` (e.g. with `POST()` and `GET()`) actually correct?**
  _`createClient()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Bugatti Typography Trinity (Display/Text/Mono)`, `button-primary (transparent pill, white outline)`, `hero-photo-band component` to the rest of the system?**
  _87 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._