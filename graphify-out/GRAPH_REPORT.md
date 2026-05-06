# Graph Report - .  (2026-05-06)

## Corpus Check
- 30 files · ~66,422 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 116 nodes · 125 edges · 17 communities detected
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Todo 도메인 모델|Todo 도메인 모델]]
- [[_COMMUNITY_Bugatti 비주얼 자산|Bugatti 비주얼 자산]]
- [[_COMMUNITY_로그인 UI 시스템|로그인 UI 시스템]]
- [[_COMMUNITY_Auth Route Handlers|Auth Route Handlers]]
- [[_COMMUNITY_Bugatti 디자인 토큰 & Layout|Bugatti 디자인 토큰 & Layout]]
- [[_COMMUNITY_Todo Server Actions|Todo Server Actions]]
- [[_COMMUNITY_프로젝트 규칙 & Auth Flow|프로젝트 규칙 & Auth Flow]]
- [[_COMMUNITY_Window 아이콘 자산|Window 아이콘 자산]]
- [[_COMMUNITY_Globe 아이콘 자산|Globe 아이콘 자산]]
- [[_COMMUNITY_Vercel 로고 자산|Vercel 로고 자산]]
- [[_COMMUNITY_Next.js 로고 자산|Next.js 로고 자산]]
- [[_COMMUNITY_PostCSS Config (Tailwind v4)|PostCSS Config (Tailwind v4)]]
- [[_COMMUNITY_Next.js 타입 참조 노드|Next.js 타입 참조 노드]]
- [[_COMMUNITY_ESLint Config 노드|ESLint Config 노드]]
- [[_COMMUNITY_Next.js Config 노드|Next.js Config 노드]]
- [[_COMMUNITY_Proxy Matcher 설정|Proxy Matcher 설정]]
- [[_COMMUNITY_File 아이콘 자산|File 아이콘 자산]]

## God Nodes (most connected - your core abstractions)
1. `TodoListClient component` - 14 edges
2. `Todo type` - 7 edges
3. `getUserOrThrow` - 7 edges
4. `Server createClient (Supabase, cookies)` - 7 edges
5. `getUserOrThrow()` - 6 edges
6. `Page (protected todo home)` - 6 edges
7. `EmailMagicLinkForm` - 6 edges
8. `Bugatti Austere Luxury Design System` - 6 edges
9. `createClient()` - 5 edges
10. `GoogleSignInButton` - 5 edges

## Surprising Connections (you probably didn't know these)
- `getUserOrThrow` --implements--> `Data Security (RLS + getUserOrThrow)`  [INFERRED]
  src/app/_actions/todos.ts → AGENTS.md
- `Page (protected todo home)` --shares_data_with--> `public.todos schema + RLS policies`  [INFERRED]
  src/app/page.tsx → README.md
- `Page (protected todo home)` --implements--> `Auth gate in Server Component (not proxy)`  [INFERRED]
  src/app/page.tsx → README.md
- `TodoListClient component` --implements--> `hero-photo-band component`  [INFERRED]
  src/app/_components/TodoListClient.tsx → DESIGN.md
- `LoginPage` --implements--> `hero-photo-band component`  [INFERRED]
  src/app/login/page.tsx → DESIGN.md

## Hyperedges (group relationships)
- **End-to-end Auth Flow** — proxy_proxy, page_page, page_loginpage, emailmagiclinkform_emailmagiclinkform, googlesigninbutton_googlesigninbutton, route_callback_get, route_signout_post, server_createclient, client_createclient [EXTRACTED 0.95]
- **Todo Mutation Server Actions** — todos_addtodo, todos_toggletodo, todos_renametodo, todos_removetodo, todos_getuserorthrow [EXTRACTED 0.95]
- **Bugatti Design Tokens Applied to Todo UI** — layout_rootlayout, todoinput_todoinput, todolistclient_todolistclient, todolistclient_speccell, emailmagiclinkform_emailmagiclinkform, googlesigninbutton_googlesigninbutton, design_bugatti_system [INFERRED 0.85]

## Communities

### Community 0 - "Todo 도메인 모델"
Cohesion: 0.25
Nodes (15): FilterTabs, Page (protected todo home), Auth gate in Server Component (not proxy), public.todos schema + RLS policies, Todo type, TodoFilter type (all|active|completed), TodoItem (inline edit), dayKey (+7 more)

### Community 1 - "Bugatti 비주얼 자산"
Cohesion: 0.2
Nodes (12): Bugatti Design System, business-hero.png, Premium Productivity Branding, Executive Office Chair, Modern Executive Desk, Night City Skyline, Floor-to-Ceiling Window, Cinematic Wide Composition (+4 more)

### Community 2 - "로그인 UI 시스템"
Cohesion: 0.33
Nodes (11): Architecture Conventions Table, Browser createClient (Supabase), button-primary (transparent pill, white outline), text-input (transparent, hairline underline), EmailMagicLinkForm, GoogleSignInButton, LoginPage, auth callback GET handler (+3 more)

### Community 3 - "Auth Route Handlers"
Cohesion: 0.25
Nodes (4): GET(), handleSubmit(), POST(), createClient()

### Community 5 - "Bugatti 디자인 토큰 & Layout"
Cohesion: 0.29
Nodes (7): Bugatti Austere Luxury Design System, hero-photo-band component, spec-cell component, Bugatti Typography Trinity (Display/Text/Mono), RootLayout (fonts + html shell), My Todo (README overview), SpecCell

### Community 6 - "Todo Server Actions"
Cohesion: 0.67
Nodes (5): addTodo(), getUserOrThrow(), removeTodo(), renameTodo(), toggleTodo()

### Community 7 - "프로젝트 규칙 & Auth Flow"
Cohesion: 0.33
Nodes (6): Auth Flow (5-step), Git Commit Message Convention, Data Security (RLS + getUserOrThrow), Project Agents Rules, CLAUDE.md (delegates to AGENTS.md), proxy() — token refresh proxy

### Community 8 - "Window 아이콘 자산"
Cohesion: 0.4
Nodes (5): Next.js default public asset, window.svg, Window / Application Window Icon, Three title bar dots, Window outer frame

### Community 10 - "Globe 아이콘 자산"
Cohesion: 0.5
Nodes (4): Globe Icon, globe.svg, Likely Purpose: i18n / Web Link, public/

### Community 12 - "Vercel 로고 자산"
Cohesion: 0.67
Nodes (3): public/, Vercel, public/vercel.svg

### Community 13 - "Next.js 로고 자산"
Cohesion: 0.67
Nodes (3): next.svg, Next.js, public/

### Community 26 - "PostCSS Config (Tailwind v4)"
Cohesion: 1.0
Nodes (1): PostCSS Config (Tailwind v4)

### Community 27 - "Next.js 타입 참조 노드"
Cohesion: 1.0
Nodes (1): Next.js Type References

### Community 28 - "ESLint Config 노드"
Cohesion: 1.0
Nodes (1): ESLint Config

### Community 29 - "Next.js Config 노드"
Cohesion: 1.0
Nodes (1): Next.js Config (reactCompiler enabled)

### Community 30 - "Proxy Matcher 설정"
Cohesion: 1.0
Nodes (1): proxy matcher config

### Community 31 - "File 아이콘 자산"
Cohesion: 1.0
Nodes (1): File Icon

## Knowledge Gaps
- **14 isolated node(s):** `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config`, `Next.js Config (reactCompiler enabled)`, `proxy matcher config` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `PostCSS Config (Tailwind v4)`** (1 nodes): `PostCSS Config (Tailwind v4)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js 타입 참조 노드`** (1 nodes): `Next.js Type References`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config 노드`** (1 nodes): `ESLint Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config 노드`** (1 nodes): `Next.js Config (reactCompiler enabled)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Proxy Matcher 설정`** (1 nodes): `proxy matcher config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `File 아이콘 자산`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TodoListClient component` connect `Todo 도메인 모델` to `로그인 UI 시스템`, `Bugatti 디자인 토큰 & Layout`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `Page (protected todo home)` connect `Todo 도메인 모델` to `로그인 UI 시스템`, `프로젝트 규칙 & Auth Flow`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Server createClient (Supabase, cookies)` connect `로그인 UI 시스템` to `Todo 도메인 모델`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Todo type` (e.g. with `addTodo server action` and `toggleTodo server action`) actually correct?**
  _`Todo type` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._