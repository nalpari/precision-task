<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Memo
- task를 수행할때 항상 karpathy-guidelines 를 따른다.
- 모든 답변과 추론과정 및 질문은 한국어로 해줘.
- task 를 진행하면서 중간중간 흐름에 따라 뚜렷한 단락별로 commit을 진행해.
- task를 마무리 할때마다 필요에 따라 AGENTS.md, README.md 문서를 업데이트 하고, graphify graph 도 현재 상태에 맞게 업데이트 해줘.

## Project Snapshot

- **목적**: 멀티유저 todo 앱. CRUD + 상태 필터(전체/진행중/완료) + 인라인 수정.
- **스택**: Next.js 16.2.4 (App Router, Turbopack), React 19.2.4 (Compiler 활성), Tailwind v4, TypeScript, Supabase (Postgres + Auth)
- **패키지 매니저**: `pnpm` (`packageManager: pnpm@10.33.2`). `npm`/`yarn` 명령으로 의존성 추가하지 말 것.
- **Supabase 프로젝트 ref**: `tprewdmslvayiihukefg` (이름: `my-todo`, 리전: `ap-northeast-2`).

## Architecture Conventions

레이아웃은 다음을 따른다. 새 코드를 어디에 둘지 헷갈리면 이 표를 먼저 본다.

| 위치 | 책임 |
|---|---|
| `src/proxy.ts` | **토큰 리프레시 전용**. 인증 게이팅·리다이렉트 로직 추가 금지 (Next.js 16 가이드: Proxy를 풀 세션 관리에 쓰지 말 것). |
| `src/lib/supabase/server.ts` | Server Component / Server Action / Route Handler용 클라이언트. `cookies()` 사용. |
| `src/lib/supabase/client.ts` | Client Component용 브라우저 클라이언트. |
| `src/app/_actions/*.ts` | `'use server'` 서버 액션. 모두 `getUserOrThrow()`로 user 재검증 후 mutate, 끝에 `revalidatePath('/')`. |
| `src/app/_components/` | 라우팅에서 제외(`_` prefix). UI 컴포넌트 모음. |
| `src/app/page.tsx` | **인증 게이트는 여기서**. `getUser()` → null이면 `redirect('/login')`. |
| `src/types/` | 도메인 타입 (`Todo`, `TodoFilter` 등). DB 컬럼 변경 시 함께 수정. |

### Auth 흐름

1. 모든 요청 → `proxy.ts`가 `supabase.auth.getUser()` 호출 → 액세스 토큰 만료 시 자동 갱신, 응답 쿠키에 반영.
2. 보호 라우트(`/`) → Server Component 내부에서 `getUser()` 검사 → 미인증이면 `redirect('/login')`.
3. `/login` → `EmailMagicLinkForm`(이메일 매직링크) 또는 `GoogleSignInButton`(Google OAuth). 둘 다 `redirectTo: '<origin>/auth/callback'`.
4. `/auth/callback` Route Handler → `exchangeCodeForSession(code)` → `/`로 리다이렉트.
5. 로그아웃은 `/auth/signout` (POST) → `supabase.auth.signOut()` → `/login` 303.

### 데이터 보안

- `public.todos`는 **RLS enabled**, 모든 정책은 `(select auth.uid()) = user_id` 형태(InitPlan 최적화).
- Server Action에서도 `getUserOrThrow()`로 한 번 더 user를 검증한다 (RLS는 마지막 안전장치이지 1차 방어선이 아님).
- `NEXT_PUBLIC_*`만 클라이언트 노출. **`service_role` 키 사용 금지**.

### 작업 순서 가이드

- **DB 스키마 변경**: Supabase MCP `execute_sql`로 직접 적용 → 직후 `get_advisors`(security + performance) 둘 다 실행. WARN 이상 lint는 즉시 fix. 필요한 경우 `apply_migration`이 아닌 `execute_sql` 우선.
- **클라이언트 상태**: `useOptimistic` + Server Action 조합으로 처리. Zustand/Jotai/React Query 추가 금지.
- **새 라우트 추가 시**: 보호 라우트면 Server Component 진입부에 `getUser()` 검사 패턴을 그대로 복제 (proxy.ts에 추가하지 말 것).

## graphify

이 프로젝트는 `graphify-out/`에 지식 그래프를 보유한다.

- **아키텍처/코드베이스 질문에 답하기 전에** `graphify-out/GRAPH_REPORT.md`의 god nodes와 community 구조를 먼저 읽는다.
- **"X와 Y가 어떻게 엮여있나" 같은 크로스 모듈 질문**은 raw 파일을 grep하기보다 다음을 우선 사용한다:
  - `graphify query "<질문>"` — BFS 탐색, 넓은 컨텍스트
  - `graphify path "<A>" "<B>"` — 두 개념 사이 최단 경로
  - `graphify explain "<concept>"` — 단일 노드의 모든 연결 설명
- **INFERRED/AMBIGUOUS 엣지는 검증 대상**이다 — 그래프가 보여주는 연결을 인용할 때는 confidence 태그를 같이 본다.
- **코드 파일을 수정한 세션 끝에는** `graphify update .`을 실행해 그래프를 최신 상태로 유지한다 (코드만 변경됐다면 AST-only, LLM 비용 0).
- **docs/이미지를 변경했다면** `/graphify` 풀 파이프라인 재실행이 필요하다.

## Git Commit Message

### 형식

```
<type>: <subject>

<body (선택)>
```

### Type

| Type | 용도 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 구조 개선 |
| `style` | 코드 포맷팅, 세미콜론 누락 등 (동작 변경 없음) |
| `docs` | 문서 변경 |
| `chore` | 빌드, 설정, 의존성 등 기타 변경 |
| `test` | 테스트 추가/수정 |

### 규칙

- subject는 **한글**, 50자 이내, 동사 원형으로 시작 (e.g. `Add`, `Fix`, `Update`)
- body는 선택사항이며, "무엇을 왜" 변경했는지 간결하게 서술
- body 작성 시 subject와 빈 줄로 구분

### 예시

```
feat: Add user authentication with JWT

Implement login/signup API routes with JWT token generation
and middleware-based route protection.
```

```
fix: Resolve prisma client singleton leak in dev mode
```
