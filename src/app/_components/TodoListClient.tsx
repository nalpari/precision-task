"use client";

import { startTransition, useMemo, useOptimistic, useState } from "react";
import type { Todo, TodoFilter } from "@/types/todo";
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

  const visible = useMemo(() => {
    if (filter === "active") return optimistic.filter((todo) => !todo.completed);
    if (filter === "completed") return optimistic.filter((todo) => todo.completed);
    return optimistic;
  }, [optimistic, filter]);

  function handleAdd(title: string) {
    const tempId = `optimistic-${crypto.randomUUID()}`;
    const now = new Date().toISOString();
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
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">My Todo</h1>
        {userEmail && (
          <form action="/auth/signout" method="post">
            <span className="mr-3 text-xs text-zinc-500">{userEmail}</span>
            <button
              type="submit"
              className="text-sm text-zinc-600 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              로그아웃
            </button>
          </form>
        )}
      </header>

      <TodoInput onAdd={handleAdd} />

      <FilterTabs value={filter} onChange={setFilter} counts={counts} />

      {visible.length === 0 ? (
        <p className="rounded-md border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          {filter === "all"
            ? "할 일이 없습니다. 위에서 추가해보세요."
            : filter === "active"
              ? "진행중인 할 일이 없어요."
              : "완료된 할 일이 없어요."}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onRename={handleRename}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
