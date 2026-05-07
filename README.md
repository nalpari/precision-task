# My Todo

Supabase로 인증·데이터를 처리하는 Next.js 16 / React 19 기반의 멀티유저 todo 앱입니다.

## 기능

- 이메일 매직링크 + Google OAuth 로그인
- 할 일 CRUD (추가 / 완료 토글 / 인라인 편집 / 삭제)
- 상태 필터 (전체 / 진행중 / 완료)
- `useOptimistic` 기반 즉시 반영 UX
- RLS로 사용자별 데이터 격리
- `DESIGN.md` 기반 Supabase식 다크 UI (에메랄드 액센트, pill 탭/CTA, 경계선 중심 표면)
- reduced-motion-aware CSS reveal 애니메이션 (hero, todo 카운트, active 차트)

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Next.js 16.2.4 (App Router, Turbopack) |
| UI | React 19.2.4 (React Compiler 활성), Tailwind CSS v4 |
| 백엔드 | Supabase (Postgres + Auth) |
| Auth | Supabase Auth (Email Magic Link + Google OAuth) |
| 언어 | TypeScript |
| 패키지 매니저 | pnpm |

## 사전 준비

### 1. Supabase 프로젝트

[Supabase 대시보드](https://supabase.com/dashboard)에서 새 프로젝트를 생성합니다.

### 2. 환경변수

프로젝트 루트에 `.env.local` 파일을 만들고 다음 두 값을 채웁니다 (`.env.example` 참고).

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

> `service_role` 키는 절대 사용하지 마세요. publishable key(또는 legacy anon key)만 사용합니다.

### 3. Google OAuth provider 등록 (선택, 매직링크만 쓸 거면 생략 가능)

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials)에서 OAuth 2.0 Client ID 생성 (Application type: Web application).
2. **승인된 리디렉션 URI**에 다음을 등록:
   - `https://<PROJECT-REF>.supabase.co/auth/v1/callback`
3. Supabase 대시보드 → **Authentication → Providers → Google** → 위에서 발급받은 Client ID/Secret 입력 후 활성화.

### 4. Redirect URL 등록

Supabase 대시보드 → **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` (배포 시 운영 URL로 변경)
- **Redirect URLs**: `http://localhost:3000/auth/callback` 추가

### 5. 데이터베이스 스키마

스키마는 `supabase/migrations/` 디렉터리의 SQL 파일로 관리됩니다. **번호 순서대로** 적용하세요.

| 파일 | 내용 |
|---|---|
| `0001_init_todos.sql` | `public.todos` 테이블 + RLS 정책 + `set_updated_at` 트리거 |
| `0002_add_todos_position.sql` | DnD 정렬용 `position double precision` 컬럼 + 백필 + 인덱스 |

**적용 방법** (둘 중 하나):

- **Supabase Dashboard → SQL Editor**: 각 파일 내용을 차례로 붙여넣고 Run.
- **Supabase CLI**: `supabase db push` (CLI가 마이그레이션 파일을 자동 적용).

새 환경에서는 두 파일을 모두, 기존 환경에서는 새 파일만 적용하세요. 코드는 항상 가장 최신 마이그레이션이 적용된 상태를 가정합니다 — 코드 배포 전에 마이그레이션이 먼저 적용되어야 `column "position" does not exist` 같은 런타임 에러가 발생하지 않습니다.

## 시작하기

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) 접속 → `/login`으로 자동 리다이렉트됨.

### 기타 명령

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 (Turbopack) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 프로덕션 서버 |
| `pnpm lint` | ESLint |

## 프로젝트 구조

```
src/
├── proxy.ts                    # Next.js 16 Proxy(舊 Middleware) — 토큰 리프레시 전용
├── lib/supabase/
│   ├── client.ts               # 브라우저 클라이언트
│   └── server.ts               # 서버용 클라이언트 (cookies() 사용)
├── types/
│   └── todo.ts                 # Todo, TodoFilter 타입
└── app/
    ├── layout.tsx              # 루트 레이아웃 (폰트, metadata)
    ├── page.tsx                # 보호된 todo 페이지 (Server Component, 인증 게이트)
    ├── active/
    │   └── page.tsx            # 보호된 active 대시보드 페이지
    ├── login/
    │   └── page.tsx            # 로그인 화면
    ├── auth/
    │   ├── callback/route.ts   # 매직링크 / OAuth 콜백 핸들러
    │   └── signout/route.ts    # 로그아웃 핸들러 (POST)
    ├── _actions/
    │   └── todos.ts            # 'use server' — addTodo / toggleTodo / renameTodo / removeTodo
    └── _components/
        ├── TodoListClient.tsx  # Client — useOptimistic + filter
        ├── ActiveDashboardClient.tsx
        ├── TodoInput.tsx
        ├── TodoItem.tsx        # 인라인 편집 포함
        ├── FilterTabs.tsx
        ├── dashboard/
        │   └── Charts.tsx      # 자체 SVG 차트
        └── login/
            ├── EmailMagicLinkForm.tsx
            └── GoogleSignInButton.tsx
public/
└── images/
    ├── business-hero.png       # 이전 히어로 이미지
    └── supabase-hero.png       # Supabase식 다크 생산성 히어로 이미지

supabase/
└── migrations/                 # 시간순 SQL 마이그레이션 (배포 전 반드시 먼저 적용)
    ├── 0001_init_todos.sql
    └── 0002_add_todos_position.sql
```

## 아키텍처 핵심 결정

- **인증 게이트 위치**: `proxy.ts`가 아닌 **Server Component(`page.tsx`)** 내부에서 `getUser()` 검사 후 `redirect`. Next.js 16 공식 가이드는 Proxy를 풀 세션 관리 용도로 쓰지 말라고 명시하고 있습니다. `proxy.ts`는 액세스 토큰의 자동 갱신(쿠키 write) 부수효과만 담당합니다.
- **데이터 격리 다층 방어**: ① RLS(`(select auth.uid()) = user_id`) ② Server Action 내 `getUserOrThrow()` 재검증.
- **클라이언트 상태**: `useOptimistic`만 사용. 별도 상태 라이브러리(Zustand/Jotai/React Query) 불필요.
- **뮤테이션**: 모든 변경은 Server Action을 통과 → 끝에 `revalidatePath('/')`로 캐시 갱신.
- **디자인 시스템 적용**: `DESIGN.md`의 Supabase식 토큰을 앱 용도에 맞춰 차용합니다. `#171717` 기반 다크 모드, 에메랄드 액센트, `Nunito Sans`/`Source Code Pro` 폰트 조합, pill CTA와 탭, 경계선 중심의 차분한 표면을 기본값으로 둡니다.

## 라이선스

Private.
