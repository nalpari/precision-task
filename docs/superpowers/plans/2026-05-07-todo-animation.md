# Todo Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈 hero, 홈 좌측 카운트, active 상단 차트에 절제된 진입/reveal 애니메이션을 추가한다.

**Architecture:** 새 런타임 의존성 없이 `globals.css`에 공통 모션 토큰과 keyframes를 추가하고, 기존 컴포넌트에는 className과 CSS variable delay만 얹는다. 데이터 계산, Server Action, optimistic reducer, DnD 동작은 변경하지 않는다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, 자체 SVG 차트, CSS keyframes/transitions.

---

## File Structure

- Modify: `src/app/globals.css`
  - 공통 motion token, keyframes, reusable animation classes, reduced-motion override를 담당한다.
- Modify: `src/app/_components/TodoListClient.tsx`
  - 홈 hero와 좌측 `SpecCell`에 진입 class와 순차 delay를 연결한다.
- Modify: `src/app/_components/ActiveDashboardClient.tsx`
  - active 상단 heading과 chart grid에 진입 class를 연결한다.
- Modify: `src/app/_components/dashboard/Charts.tsx`
  - `CompletionRing`, `WeeklyActivity`, `AgeBuckets`, `DashboardCard`에 chart reveal/hover class를 연결한다.
- Optional Modify: `README.md`
  - 화면 동작 문서가 이미 있거나 이번 변경을 기록할 가치가 있을 때만 짧게 업데이트한다.
- Generated/Update: `graphify-out/*`
  - 코드 변경 완료 후 `graphify update .`로 최신화한다.

## Task 1: CSS Motion Primitives

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add motion tokens and keyframes**

Add this block after the existing `:root` block:

```css
:root {
  --motion-fast: 180ms;
  --motion-medium: 420ms;
  --motion-slow: 720ms;
  --motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes line-reveal {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes chart-grow-y {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
```

- [ ] **Step 2: Add reusable motion classes**

Add this block near the existing component-level classes:

```css
.motion-rise {
  animation: rise-in var(--motion-medium) var(--motion-ease-out) both;
  animation-delay: var(--motion-delay, 0ms);
}

.motion-line-reveal {
  transform-origin: left center;
  animation: line-reveal var(--motion-medium) var(--motion-ease-out) both;
  animation-delay: var(--motion-delay, 0ms);
}

.motion-chart-y {
  transform-origin: bottom center;
  animation: chart-grow-y var(--motion-slow) var(--motion-ease-out) both;
  animation-delay: var(--motion-delay, 0ms);
}

.motion-hover-line {
  transition:
    border-color var(--motion-fast) ease,
    background-color var(--motion-fast) ease,
    opacity var(--motion-fast) ease;
}

@media (hover: hover) {
  .motion-hover-line:hover {
    border-color: var(--color-hairline-strong);
    background-color: rgba(255, 255, 255, 0.025);
  }
}
```

- [ ] **Step 3: Add chart-specific classes**

Add:

```css
.chart-card {
  transition: border-color var(--motion-fast) ease;
}

@media (hover: hover) {
  .chart-card:hover {
    border-color: var(--color-hairline-strong);
  }
}

.chart-ring-value {
  transition: stroke-dasharray var(--motion-slow) var(--motion-ease-out);
}

.chart-age-bar {
  transform-origin: left center;
  animation: line-reveal var(--motion-slow) var(--motion-ease-out) both;
  animation-delay: var(--motion-delay, 0ms);
}
```

- [ ] **Step 4: Add reduced-motion override**

Add at the end of `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
```

- [ ] **Step 5: Run lint for CSS-related syntax coverage**

Run: `pnpm lint`

Expected: command exits with code 0 and no ESLint errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "style: Add 절제된 모션 토큰"
```

## Task 2: Home Hero and Counter Reveal

**Files:**
- Modify: `src/app/_components/TodoListClient.tsx`

- [ ] **Step 1: Add hero motion classes**

Change the hero text/input markup to include `motion-rise` and delays:

```tsx
<p
  className="motion-rise font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
  style={{ "--motion-delay": "40ms" } as React.CSSProperties}
>
  Private task ledger
</p>
<h1
  className="motion-rise mt-5 max-w-3xl font-display text-5xl uppercase leading-[1.08] tracking-[0.08em] text-[var(--color-on-dark)] sm:text-6xl md:text-[64px]"
  style={{ "--motion-delay": "120ms" } as React.CSSProperties}
>
  Precision Tasks
</h1>
<p
  className="motion-rise mt-6 max-w-xl font-text text-lg leading-7 text-[var(--color-body)]"
  style={{ "--motion-delay": "200ms" } as React.CSSProperties}
>
  오늘의 할 일을 조용하게 정렬하고, 진행 상태를 빠르게 갱신하세요.
</p>

<div
  className="motion-rise mt-12 max-w-2xl"
  style={{ "--motion-delay": "280ms" } as React.CSSProperties}
>
  <TodoInput onAdd={handleAdd} />
</div>
```

- [ ] **Step 2: Add counter reveal delays**

Update `SpecCell` calls:

```tsx
<SpecCell value={counts.all} label="Total" delay="0ms" />
<SpecCell value={counts.active} label="Active" delay="80ms" />
<SpecCell value={counts.completed} label="Complete" delay="160ms" />
<SpecCell value={`${completionRate}%`} label="Completion" delay="240ms" />
```

- [ ] **Step 3: Update SpecCell signature and class**

Replace `SpecCell` with:

```tsx
function SpecCell({
  value,
  label,
  delay,
}: {
  value: number | string;
  label: string;
  delay: string;
}) {
  return (
    <div
      className="motion-rise motion-hover-line border-b border-[var(--color-hairline)] py-6"
      style={{ "--motion-delay": delay } as React.CSSProperties}
    >
      <div className="font-display text-3xl uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
        {value}
      </div>
      <div className="mt-2 font-precision text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run lint**

Run: `pnpm lint`

Expected: command exits with code 0. If TypeScript complains about CSS custom property typing, keep the `as React.CSSProperties` casts shown above.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/TodoListClient.tsx
git commit -m "style: Add 홈 화면 진입 애니메이션"
```

## Task 3: Active Header and Chart Reveal

**Files:**
- Modify: `src/app/_components/ActiveDashboardClient.tsx`
- Modify: `src/app/_components/dashboard/Charts.tsx`

- [ ] **Step 1: Add active page heading motion**

In `ActiveDashboardClient.tsx`, update the active header:

```tsx
<p
  className="motion-rise font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
  style={{ "--motion-delay": "40ms" } as React.CSSProperties}
>
  Active register
</p>
<h1
  className="motion-rise mt-3 max-w-3xl font-display text-4xl uppercase leading-[1.08] tracking-[0.08em] text-[var(--color-on-dark)] sm:text-5xl"
  style={{ "--motion-delay": "120ms" } as React.CSSProperties}
>
  In Progress
</h1>

<div
  className="motion-rise mt-12 grid gap-10 md:grid-cols-3"
  style={{ "--motion-delay": "200ms" } as React.CSSProperties}
>
  <CompletionRing active={counts.active} completed={counts.completed} />
  <WeeklyActivity counts={weekly.counts} labels={weekly.labels} />
  <AgeBuckets buckets={ageBuckets} />
</div>
```

- [ ] **Step 2: Add ring value class**

In `Charts.tsx`, add the chart ring class to the second circle:

```tsx
<circle
  r={r}
  cx="0"
  cy="0"
  fill="none"
  stroke="var(--color-on-dark)"
  strokeWidth="1.5"
  strokeDasharray={`${dash} ${c - dash}`}
  strokeDashoffset={c / 4}
  transform="rotate(-90)"
  strokeLinecap="butt"
  className="chart-ring-value"
/>
```

- [ ] **Step 3: Add weekly bar reveal**

Update the weekly bar `div`:

```tsx
<div
  className="motion-chart-y w-full"
  style={{
    "--motion-delay": `${120 + i * 45}ms`,
    height: `${h}%`,
    minHeight: n > 0 ? "2px" : "0",
    background: isLast ? "var(--color-on-dark)" : "var(--color-body)",
    opacity: isLast ? 1 : 0.4,
  } as React.CSSProperties}
  aria-label={`${labels[i]}: ${n}`}
/>
```

- [ ] **Step 4: Add age bucket reveal**

Update the age bucket inner bar:

```tsx
<div
  className="chart-age-bar h-full bg-[var(--color-on-dark)]"
  style={{
    "--motion-delay": `${160 + rows.findIndex((r) => r.key === row.key) * 70}ms`,
    width: `${w}%`,
  } as React.CSSProperties}
/>
```

- [ ] **Step 5: Add chart card hover class**

Update `DashboardCard` wrapper:

```tsx
<div className="chart-card flex flex-col border-t border-[var(--color-hairline)] pt-6">
  <p className="font-precision text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
    {label}
  </p>
  <div className="mt-6">{children}</div>
</div>
```

- [ ] **Step 6: Run lint**

Run: `pnpm lint`

Expected: command exits with code 0.

- [ ] **Step 7: Commit**

```bash
git add src/app/_components/ActiveDashboardClient.tsx src/app/_components/dashboard/Charts.tsx
git commit -m "style: Add active 차트 reveal 애니메이션"
```

## Task 4: Verification, Docs, and Graph

**Files:**
- Optional Modify: `README.md`
- Update: `graphify-out/*`

- [ ] **Step 1: Run full verification**

Run:

```bash
pnpm lint
pnpm build
```

Expected: both commands exit with code 0.

- [ ] **Step 2: Start dev server**

Run:

```bash
pnpm dev
```

Expected: Next dev server starts and prints a localhost URL.

- [ ] **Step 3: Browser check**

Open `/` and `/active` in the browser and verify:

```text
/ shows hero text/input reveal and left counter reveal.
/active shows heading reveal and chart ring/bar reveal.
No visible layout shift occurs.
Todo list CRUD and DnD controls remain usable.
```

- [ ] **Step 4: Update docs only if needed**

If README already documents UI behavior, add one concise line:

```markdown
- Home and active dashboard surfaces use reduced-motion-aware CSS reveal animations for hero copy, counters, and charts.
```

If README does not document UI behavior, skip this step and do not create a new section only for this change.

- [ ] **Step 5: Update graphify graph**

Run:

```bash
graphify update .
```

Expected: graphify updates `graphify-out/` without requiring a full LLM pipeline.

- [ ] **Step 6: Commit verification artifacts**

If README or graphify files changed:

```bash
git add README.md graphify-out
git commit -m "docs: Update 애니메이션 그래프 문서"
```

If only graphify files changed:

```bash
git add graphify-out
git commit -m "chore: Update graphify 애니메이션 그래프"
```

If neither changed, do not create an empty commit.
