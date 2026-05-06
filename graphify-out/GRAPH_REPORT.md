# Graph Report - .  (2026-05-06)

## Corpus Check
- 30 files · ~67,217 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 109 nodes · 105 edges · 25 communities detected
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Todo Domain & Conventions|Todo Domain & Conventions]]
- [[_COMMUNITY_Auth UI & Design System|Auth UI & Design System]]
- [[_COMMUNITY_Server Actions & Auth Routes|Server Actions & Auth Routes]]
- [[_COMMUNITY_Page Composition & Auth Gate|Page Composition & Auth Gate]]
- [[_COMMUNITY_PostCSS  Tailwind v4|PostCSS / Tailwind v4]]
- [[_COMMUNITY_Next-Env Types|Next-Env Types]]
- [[_COMMUNITY_ESLint Setup|ESLint Setup]]
- [[_COMMUNITY_React Compiler Flag|React Compiler Flag]]
- [[_COMMUNITY_Token Refresh Proxy|Token Refresh Proxy]]
- [[_COMMUNITY_Proxy Matcher Config|Proxy Matcher Config]]
- [[_COMMUNITY_FilterTabs UI|FilterTabs UI]]
- [[_COMMUNITY_todos Table Schema + RLS|todos Table Schema + RLS]]
- [[_COMMUNITY_Auth Gate Pattern|Auth Gate Pattern]]
- [[_COMMUNITY_CLAUDE.md Delegation|CLAUDE.md Delegation]]
- [[_COMMUNITY_File Icon Asset|File Icon Asset]]
- [[_COMMUNITY_Vercel Logo Asset|Vercel Logo Asset]]
- [[_COMMUNITY_Next.js Logo Asset|Next.js Logo Asset]]
- [[_COMMUNITY_Globe Icon Asset|Globe Icon Asset]]
- [[_COMMUNITY_Window Icon Asset|Window Icon Asset]]
- [[_COMMUNITY_Business Hero Image|Business Hero Image]]
- [[_COMMUNITY_Hero Image Subject|Hero Image Subject]]
- [[_COMMUNITY_Hero Image Mood|Hero Image Mood]]
- [[_COMMUNITY_Hero Image Palette|Hero Image Palette]]
- [[_COMMUNITY_Hero Image Design Intent|Hero Image Design Intent]]
- [[_COMMUNITY_Hero Image Composition|Hero Image Composition]]

## God Nodes (most connected - your core abstractions)
1. `getUserOrThrow()` - 7 edges
2. `TodoListClient` - 7 edges
3. `public.todos table` - 7 edges
4. `Bugatti Austere Luxury Design System` - 6 edges
5. `Page (Server Component)` - 6 edges
6. `getUserOrThrow` - 6 edges
7. `reduce (optimistic reducer)` - 6 edges
8. `createClient()` - 5 edges
9. `EmailMagicLinkForm` - 5 edges
10. `renameTodo Server Action` - 5 edges

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
- **Bugatti Design Tokens Applied to Todo UI** — layout_rootlayout, todoinput_todoinput, todolistclient_todolistclient, todolistclient_speccell, emailmagiclinkform_emailmagiclinkform, googlesigninbutton_googlesigninbutton, design_bugatti_system [INFERRED 0.85]
- **Optimistic Mutation Flow (UI -> reducer -> Server Action -> RLS)** — todolistclient_todolistclient, todolistclient_reduce, todos_addtodo, todos_toggletodo, todos_renametodo, todos_removetodo, public_todos_table [INFERRED 0.90]
- **Fractional Position Reorder Pattern** — todolistclient_handledragend, todolistclient_reduce, todos_reordertodo, agents_reorderconvention, public_todos_table [EXTRACTED 0.95]
- **Server-side Auth Gate Chain** — page_page, todos_getuserorthrow, agents_authgate, agents_datasecurity [INFERRED 0.85]

## Communities

### Community 0 - "Todo Domain & Conventions"
Cohesion: 0.24
Nodes (17): Data Security / RLS Convention, Todo Reorder / Position Convention, public.todos table, TodoItem commit (inline edit), TodoItem, handleAdd, handleDragEnd, handleRemove (+9 more)

### Community 1 - "Auth UI & Design System"
Cohesion: 0.18
Nodes (16): Browser createClient (Supabase), Bugatti Austere Luxury Design System, hero-photo-band component, button-primary (transparent pill, white outline), spec-cell component, text-input (transparent, hairline underline), Bugatti Typography Trinity (Display/Text/Mono), EmailMagicLinkForm (+8 more)

### Community 2 - "Server Actions & Auth Routes"
Cohesion: 0.19
Nodes (10): addTodo(), getUserOrThrow(), removeTodo(), renameTodo(), reorderTodo(), toggleTodo(), GET(), handleSubmit() (+2 more)

### Community 3 - "Page Composition & Auth Gate"
Cohesion: 0.25
Nodes (9): Auth Flow Convention, Auth Gate at page.tsx Convention, Client State Convention (useOptimistic + Server Action), Page (Server Component), Todo type, TodoFilter type, dayKey helper, SpecCell subcomponent (+1 more)

### Community 19 - "PostCSS / Tailwind v4"
Cohesion: 1.0
Nodes (1): PostCSS Config (Tailwind v4)

### Community 20 - "Next-Env Types"
Cohesion: 1.0
Nodes (1): Next.js Type References

### Community 21 - "ESLint Setup"
Cohesion: 1.0
Nodes (1): ESLint Config

### Community 22 - "React Compiler Flag"
Cohesion: 1.0
Nodes (1): Next.js Config (reactCompiler enabled)

### Community 23 - "Token Refresh Proxy"
Cohesion: 1.0
Nodes (1): proxy() — token refresh proxy

### Community 24 - "Proxy Matcher Config"
Cohesion: 1.0
Nodes (1): proxy matcher config

### Community 25 - "FilterTabs UI"
Cohesion: 1.0
Nodes (1): FilterTabs

### Community 26 - "todos Table Schema + RLS"
Cohesion: 1.0
Nodes (1): public.todos schema + RLS policies

### Community 27 - "Auth Gate Pattern"
Cohesion: 1.0
Nodes (1): Auth gate in Server Component (not proxy)

### Community 28 - "CLAUDE.md Delegation"
Cohesion: 1.0
Nodes (1): CLAUDE.md (delegates to AGENTS.md)

### Community 29 - "File Icon Asset"
Cohesion: 1.0
Nodes (1): File Icon

### Community 30 - "Vercel Logo Asset"
Cohesion: 1.0
Nodes (1): Vercel Logo (Triangle Mark)

### Community 31 - "Next.js Logo Asset"
Cohesion: 1.0
Nodes (1): Next.js Wordmark Logo (SVG)

### Community 32 - "Globe Icon Asset"
Cohesion: 1.0
Nodes (1): Globe Icon (globe.svg)

### Community 33 - "Window Icon Asset"
Cohesion: 1.0
Nodes (1): Window Icon (browser/window UI glyph)

### Community 34 - "Business Hero Image"
Cohesion: 1.0
Nodes (1): Business Hero Image - Modern Executive Office at Night

### Community 35 - "Hero Image Subject"
Cohesion: 1.0
Nodes (1): Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night

### Community 36 - "Hero Image Mood"
Cohesion: 1.0
Nodes (1): Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting

### Community 37 - "Hero Image Palette"
Cohesion: 1.0
Nodes (1): Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh

### Community 38 - "Hero Image Design Intent"
Cohesion: 1.0
Nodes (1): Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product

### Community 39 - "Hero Image Composition"
Cohesion: 1.0
Nodes (1): Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay

## Knowledge Gaps
- **30 isolated node(s):** `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config`, `Next.js Config (reactCompiler enabled)`, `proxy() — token refresh proxy` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `PostCSS / Tailwind v4`** (1 nodes): `PostCSS Config (Tailwind v4)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next-Env Types`** (1 nodes): `Next.js Type References`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Setup`** (1 nodes): `ESLint Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Compiler Flag`** (1 nodes): `Next.js Config (reactCompiler enabled)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Token Refresh Proxy`** (1 nodes): `proxy() — token refresh proxy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Proxy Matcher Config`** (1 nodes): `proxy matcher config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FilterTabs UI`** (1 nodes): `FilterTabs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `todos Table Schema + RLS`** (1 nodes): `public.todos schema + RLS policies`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Gate Pattern`** (1 nodes): `Auth gate in Server Component (not proxy)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CLAUDE.md Delegation`** (1 nodes): `CLAUDE.md (delegates to AGENTS.md)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `File Icon Asset`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vercel Logo Asset`** (1 nodes): `Vercel Logo (Triangle Mark)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Logo Asset`** (1 nodes): `Next.js Wordmark Logo (SVG)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Globe Icon Asset`** (1 nodes): `Globe Icon (globe.svg)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Window Icon Asset`** (1 nodes): `Window Icon (browser/window UI glyph)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Business Hero Image`** (1 nodes): `Business Hero Image - Modern Executive Office at Night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Image Subject`** (1 nodes): `Subject: Minimalist executive office interior with sleek dark desk, ergonomic leather chair, and floor-to-ceiling windows overlooking a city skyline at night`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Image Mood`** (1 nodes): `Mood: Premium, sophisticated, focused, and calm - conveying productivity, professionalism, and quiet ambition through dark cinematic lighting`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Image Palette`** (1 nodes): `Color Palette: Dark monochrome with deep blacks, charcoal grays, and subtle warm accent lighting (under-desk LED glow) plus distant city light bokeh`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Image Design Intent`** (1 nodes): `Design Intent: Hero image for a landing page targeting professionals - signals serious business productivity tool, late-night focus, and high-end lifestyle aesthetic suitable for a todo/work-management product`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Image Composition`** (1 nodes): `Composition: Wide cinematic framing with desk on the right, illuminated cityscape visible through large window panels, strong horizontal lines and negative space on the left for text overlay`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Page (Server Component)` connect `Page Composition & Auth Gate` to `Todo Domain & Conventions`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `TodoListClient` connect `Page Composition & Auth Gate` to `Todo Domain & Conventions`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `PostCSS Config (Tailwind v4)`, `Next.js Type References`, `ESLint Config` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._