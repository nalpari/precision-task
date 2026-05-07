"use client";

import {
  startTransition,
  type CSSProperties,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import type { Todo, TodoFilter } from "@/types/todo";
import {
  addTodo,
  removeTodo,
  renameTodo,
  reorderTodo,
  toggleTodo,
} from "../_actions/todos";
import AppHeader from "./AppHeader";
import CalendarWidget from "./CalendarWidget";
import FilterTabs from "./FilterTabs";
import TodoInput from "./TodoInput";
import TodoListView from "./TodoListView";
import { reduce } from "./todoReducer";

export default function TodoListClient({
  initial,
  userEmail,
}: {
  initial: Todo[];
  userEmail: string | null;
}) {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
    let base = optimistic;
    if (filter === "active") base = base.filter((todo) => !todo.completed);
    else if (filter === "completed")
      base = base.filter((todo) => todo.completed);

    if (selectedDate) {
      return base.filter((todo) => {
        const d = new Date(todo.created_at);
        return dayKey(d) === selectedDate;
      });
    }

    const uniqueKeys = [
      ...new Set(
        base
          .map((todo) => dayKey(new Date(todo.created_at)))
          .sort((a, b) => (a > b ? -1 : 1)),
      ),
    ].slice(0, 5);

    return base.filter((todo) =>
      uniqueKeys.includes(dayKey(new Date(todo.created_at))),
    );
  }, [optimistic, filter, selectedDate]);

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

  const emptyMessage =
    filter === "all"
      ? "아직 등록된 할 일이 없습니다."
      : filter === "active"
        ? "진행중인 할 일이 없습니다."
        : "완료된 할 일이 없습니다.";

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-on-dark)]">
      <AppHeader userEmail={userEmail} />
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-12 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] md:items-center md:gap-12 md:pb-20 md:pt-20">
          <div className="min-w-0">
            <p
              className="motion-rise font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]"
              style={{ "--motion-delay": "40ms" } as CSSProperties}
            >
              Private task console
            </p>
            <h1
              className="motion-rise mt-5 max-w-3xl font-display text-5xl font-normal leading-none text-[var(--color-on-dark)] sm:text-6xl md:text-[72px]"
              style={{ "--motion-delay": "120ms" } as CSSProperties}
            >
              Ship today&apos;s work from one quiet queue.
            </h1>
            <p
              className="motion-rise mt-6 max-w-xl font-text text-base leading-6 text-[var(--color-body)]"
              style={{ "--motion-delay": "200ms" } as CSSProperties}
            >
              오늘의 할 일을 등록하고, 상태를 빠르게 갱신하고, 흐름을 잃지 않게
              정렬하세요.
            </p>

            <div
              className="motion-rise mt-8 max-w-2xl rounded-[8px] border border-[var(--color-brand-border)] bg-[var(--color-surface-soft)] p-4 sm:p-5"
              style={{ "--motion-delay": "280ms" } as CSSProperties}
            >
              <TodoInput onAdd={handleAdd} />
            </div>
          </div>

          <div
            className="motion-rise hero-photo-panel min-h-[260px] rounded-[8px] border border-[var(--color-hairline)] md:min-h-[420px]"
            style={{ "--motion-delay": "180ms" } as CSSProperties}
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-8 md:py-20 lg:grid-cols-[300px_1fr]">
        <aside>
          <div className="grid grid-cols-2 overflow-hidden rounded-[8px] border border-[var(--color-hairline)] bg-[var(--color-deep)] lg:grid-cols-1">
            <SpecCell
              value={counts.all}
              label="Total"
              delay="0ms"
              dividerClass="border-b border-r lg:border-r-0"
            />
            <SpecCell
              value={counts.active}
              label="Active"
              delay="80ms"
              dividerClass="border-b"
            />
            <SpecCell
              value={counts.completed}
              label="Complete"
              delay="160ms"
              dividerClass="border-r lg:border-b lg:border-r-0"
            />
            <SpecCell
              value={`${completionRate}%`}
              label="Completion"
              delay="240ms"
              dividerClass=""
            />
          </div>
          <CalendarWidget
            todos={optimistic}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </aside>

        <div className="min-w-0">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
                Current register
              </p>
              <h2 className="mt-3 font-display text-4xl font-normal leading-tight text-[var(--color-on-dark)]">
                Work Queue
              </h2>
            </div>
            <div className="w-full md:w-[420px]">
              <FilterTabs value={filter} onChange={setFilter} counts={counts} />
            </div>
          </div>

          <TodoListView
            todos={visible}
            emptyMessage={emptyMessage}
            onToggle={handleToggle}
            onRename={handleRename}
            onRemove={handleRemove}
            onReorder={handleReorder}
          />
        </div>
      </section>
    </main>
  );
}

function SpecCell({
  value,
  label,
  delay,
  dividerClass,
}: {
  value: number | string;
  label: string;
  delay: string;
  dividerClass: string;
}) {
  return (
    <div
      className={`motion-rise motion-hover-line border-[var(--color-hairline)] p-5 ${dividerClass}`}
      style={{ "--motion-delay": delay } as CSSProperties}
    >
      <div className="font-display text-3xl font-normal leading-none text-[var(--color-on-dark)]">
        {value}
      </div>
      <div className="mt-2 font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
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
