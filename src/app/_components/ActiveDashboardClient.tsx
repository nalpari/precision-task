"use client";

import {
  startTransition,
  useMemo,
  useOptimistic,
  useSyncExternalStore,
} from "react";
import type { Todo } from "@/types/todo";
import {
  removeTodo,
  renameTodo,
  reorderTodo,
  toggleTodo,
} from "../_actions/todos";
import AppHeader from "./AppHeader";
import { AgeBuckets, CompletionRing, WeeklyActivity } from "./dashboard/Charts";
import TodoListView from "./TodoListView";
import { reduce } from "./todoReducer";

const subscribeNoop = () => () => {};

export default function ActiveDashboardClient({
  initial,
  userEmail,
}: {
  initial: Todo[];
  userEmail: string | null;
}) {
  const [optimistic, applyOptimistic] = useOptimistic(initial, reduce);

  const counts = useMemo(
    () => ({
      active: optimistic.filter((t) => !t.completed).length,
      completed: optimistic.filter((t) => t.completed).length,
    }),
    [optimistic],
  );

  const activeTodos = useMemo(
    () => optimistic.filter((t) => !t.completed),
    [optimistic],
  );

  // 차트의 일자 그룹화는 사용자 로컬 TZ에 의존하므로 hydration mismatch 회피용
  // isClient 가드. SSR 첫 페인트는 빈 차트, 마운트 후 실제 데이터.
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const weekly = useMemo(() => {
    if (!isClient) {
      return {
        counts: new Array(7).fill(0),
        labels: new Array(7).fill(""),
      };
    }
    return computeWeekly(optimistic);
  }, [optimistic, isClient]);

  const ageBuckets = useMemo(() => {
    if (!isClient) return { today: 0, yesterday: 0, older: 0 };
    return computeAgeBuckets(activeTodos);
  }, [activeTodos, isClient]);

  function handleToggle(id: string, completed: boolean) {
    startTransition(() => {
      applyOptimistic({ kind: "toggle", id, completed });
      void toggleTodo(id, completed);
    });
  }

  function handleRename(id: string, title: string) {
    startTransition(() => {
      applyOptimistic({ kind: "rename", id, title });
      void renameTodo(id, title);
    });
  }

  function handleRemove(id: string) {
    startTransition(() => {
      applyOptimistic({ kind: "remove", id });
      void removeTodo(id);
    });
  }

  function handleReorder(
    id: string,
    prevId: string | null,
    nextId: string | null,
  ) {
    const tzOffsetMinutes = -new Date().getTimezoneOffset();
    startTransition(() => {
      applyOptimistic({ kind: "reorder", id, prevId, nextId });
      void reorderTodo(id, prevId, nextId, tzOffsetMinutes);
    });
  }

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-on-dark)]">
      <AppHeader userEmail={userEmail} />

      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-8 md:pt-16">
          <p className="font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Active register
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl uppercase leading-[1.08] tracking-[0.08em] text-[var(--color-on-dark)] sm:text-5xl">
            In Progress
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <CompletionRing
              active={counts.active}
              completed={counts.completed}
            />
            <WeeklyActivity
              counts={weekly.counts}
              labels={weekly.labels}
            />
            <AgeBuckets buckets={ageBuckets} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 md:py-20">
        <div className="mb-10">
          <p className="font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Current register
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
            진행중
          </h2>
        </div>

        <TodoListView
          todos={activeTodos}
          emptyMessage="진행중인 할 일이 없습니다."
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
          onReorder={handleReorder}
        />
      </section>
    </main>
  );
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function computeWeekly(todos: Todo[]): { counts: number[]; labels: string[] } {
  const now = new Date();
  const days: { key: string; label: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({
      key: dayKey(d),
      label: i === 0 ? "TODAY" : `${d.getMonth() + 1}/${d.getDate()}`,
    });
  }
  const counts = new Array(7).fill(0);
  const idx = new Map(days.map((d, i) => [d.key, i]));
  for (const t of todos) {
    const k = dayKey(new Date(t.created_at));
    const i = idx.get(k);
    if (i !== undefined) counts[i]++;
  }
  return { counts, labels: days.map((d) => d.label) };
}

function computeAgeBuckets(activeTodos: Todo[]): {
  today: number;
  yesterday: number;
  older: number;
} {
  const now = new Date();
  const today = dayKey(now);
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  const yesterday = dayKey(y);

  const out = { today: 0, yesterday: 0, older: 0 };
  for (const t of activeTodos) {
    const k = dayKey(new Date(t.created_at));
    if (k === today) out.today++;
    else if (k === yesterday) out.yesterday++;
    else out.older++;
  }
  return out;
}
