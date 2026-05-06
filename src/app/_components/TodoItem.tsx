"use client";

import { useEffect, useRef, useState } from "react";
import type { Todo } from "@/types/todo";

export default function TodoItem({
  todo,
  onToggle,
  onRename,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onRename: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commit() {
    const trimmed = draft.trim();
    if (trimmed === todo.title) {
      setEditing(false);
      return;
    }
    if (!trimmed) {
      onRemove(todo.id);
    } else {
      onRename(todo.id, trimmed);
    }
    setEditing(false);
  }

  function cancel() {
    setDraft(todo.title);
    setEditing(false);
  }

  return (
    <li className="group flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => onToggle(todo.id, event.target.checked)}
        className="h-4 w-4 cursor-pointer accent-zinc-900 dark:accent-zinc-100"
        aria-label={todo.completed ? "완료 해제" : "완료 표시"}
      />

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit();
            else if (event.key === "Escape") cancel();
          }}
          maxLength={500}
          className="h-8 flex-1 rounded border border-zinc-300 px-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={
            todo.completed
              ? "flex-1 text-sm text-zinc-400 line-through dark:text-zinc-600"
              : "flex-1 text-sm text-zinc-900 dark:text-zinc-100"
          }
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        aria-label="삭제"
        className="text-sm text-zinc-400 opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100 dark:text-zinc-500 dark:hover:text-red-400"
      >
        ✕
      </button>
    </li>
  );
}
