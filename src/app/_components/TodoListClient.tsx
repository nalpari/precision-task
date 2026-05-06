"use client";

import {
  startTransition,
  useMemo,
  useOptimistic,
  useState,
  useSyncExternalStore,
} from "react";
import type { Todo, TodoFilter } from "@/types/todo";

const subscribeNoop = () => () => {};
import {
  addTodo,
  removeTodo,
  renameTodo,
  toggleTodo,
} from "../_actions/todos";
import FilterTabs from "./FilterTabs";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

type Action =
  | { kind: "add"; todo: Todo }
  | { kind: "toggle"; id: string; completed: boolean }
  | { kind: "rename"; id: string; title: string }
  | { kind: "remove"; id: string };

function reduce(state: Todo[], action: Action): Todo[] {
  switch (action.kind) {
    case "add":
      return [action.todo, ...state];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: action.completed } : todo,
      );
    case "rename":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.title } : todo,
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.id);
  }
}

export default function TodoListClient({
  initial,
  userEmail,
}: {
  initial: Todo[];
  userEmail: string | null;
}) {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [optimistic, applyOptimistic] = useOptimistic(initial, reduce);

  const counts = useMemo(
    () => ({
      all: optimistic.length,
      active: optimistic.filter((todo) => !todo.completed).length,
      completed: optimistic.filter((todo) => todo.completed).length,
    }),
    [optimistic],
  );
  const completionRate =
    counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100);

  const visible = useMemo(() => {
    if (filter === "active") return optimistic.filter((todo) => !todo.completed);
    if (filter === "completed") return optimistic.filter((todo) => todo.completed);
    return optimistic;
  }, [optimistic, filter]);

  // SSR snapshot returns false → first paint shows raw date keys, matching
  // the server render. After hydration, isClient flips to true and the
  // memo below recomputes "오늘"/"어제" labels in the user's local TZ.
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const todayKeys = useMemo(() => {
    if (!isClient) return null;
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return { today: dayKey(now), yesterday: dayKey(yesterday) };
  }, [isClient]);

  const groups = useMemo(() => {
    const buckets = new Map<string, Todo[]>();
    for (const todo of visible) {
      const key = dayKey(new Date(todo.created_at));
      let bucket = buckets.get(key);
      if (!bucket) {
        bucket = [];
        buckets.set(key, bucket);
      }
      bucket.push(todo);
    }
    return Array.from(buckets.entries())
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .map(([key, items]) => ({
        key,
        label:
          todayKeys && key === todayKeys.today
            ? "오늘"
            : todayKeys && key === todayKeys.yesterday
              ? "어제"
              : key,
        items,
      }));
  }, [visible, todayKeys]);

  function handleAdd(title: string) {
    const tempId = `optimistic-${crypto.randomUUID()}`;
    const nowDate = new Date();
    const now = nowDate.toISOString();
    startTransition(() => {
      applyOptimistic({
        kind: "add",
        todo: {
          id: tempId,
          user_id: "",
          title,
          completed: false,
          created_at: now,
          updated_at: now,
          position: nowDate.getTime() / 1000,
        },
      });
      void addTodo(title);
    });
  }

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

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-on-dark)]">
      <section className="hero-photo-band relative min-h-[620px] border-b border-[var(--color-hairline)]">
        {userEmail && (
          <form
            action="/auth/signout"
            method="post"
            className="absolute right-4 top-5 flex items-center gap-4 sm:right-8"
          >
            <span className="hidden max-w-48 truncate font-precision text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)] sm:inline">
              {userEmail}
            </span>
            <button className="font-precision text-xs uppercase tracking-[0.22em] text-[var(--color-body)] transition-colors hover:text-[var(--color-on-dark)]">
              Logout
            </button>
          </form>
        )}

        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 pt-28 sm:px-8 md:pt-36">
          <p className="font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Private task ledger
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl uppercase leading-[1.08] tracking-[0.08em] text-[var(--color-on-dark)] sm:text-6xl md:text-[64px]">
            Precision Tasks
          </h1>
          <p className="mt-6 max-w-xl font-text text-lg leading-7 text-[var(--color-body)]">
            오늘의 할 일을 조용하게 정렬하고, 진행 상태를 빠르게 갱신하세요.
          </p>

          <div className="mt-12 max-w-2xl">
            <TodoInput onAdd={handleAdd} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[280px_1fr]">
        <aside className="border-t border-[var(--color-hairline)]">
          <SpecCell value={counts.all} label="Total" />
          <SpecCell value={counts.active} label="Active" />
          <SpecCell value={counts.completed} label="Complete" />
          <SpecCell value={`${completionRate}%`} label="Completion" />
        </aside>

        <div className="min-w-0">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Current register
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
                Work Queue
              </h2>
            </div>
            <div className="w-full md:w-[420px]">
              <FilterTabs value={filter} onChange={setFilter} counts={counts} />
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="border-y border-[var(--color-hairline)] px-0 py-10 text-center font-text text-lg text-[var(--color-muted)]">
              {filter === "all"
                ? "아직 등록된 할 일이 없습니다."
                : filter === "active"
                  ? "진행중인 할 일이 없습니다."
                  : "완료된 할 일이 없습니다."}
            </p>
          ) : (
            <div className="flex flex-col gap-12">
              {groups.map((group) => (
                <section key={group.key}>
                  <h3 className="border-b border-[var(--color-hairline)] pb-3 font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {group.label}
                  </h3>
                  <ul>
                    {group.items.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onRename={handleRename}
                        onRemove={handleRemove}
                      />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SpecCell({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="border-b border-[var(--color-hairline)] py-6">
      <div className="font-display text-3xl uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
        {value}
      </div>
      <div className="mt-2 font-precision text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
