"use client";

import { startTransition, useMemo, useOptimistic, useState } from "react";
import type { Todo, TodoFilter } from "@/types/todo";
import {
  addTodo,
  removeTodo,
  renameTodo,
  reorderTodo,
  toggleTodo,
} from "../_actions/todos";
import AppHeader from "./AppHeader";
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
    startTransition(() => {
      applyOptimistic({ kind: "reorder", id, prevId, nextId });
      void reorderTodo(id, prevId, nextId);
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
      <section className="hero-photo-band relative min-h-[560px] border-b border-[var(--color-hairline)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 pt-20 sm:px-8 md:pt-28">
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
