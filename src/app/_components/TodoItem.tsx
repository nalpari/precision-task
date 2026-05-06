"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: todo.id, disabled: editing });

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

  function beginEdit() {
    setDraft(todo.title);
    setEditing(true);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="group grid grid-cols-[auto_auto_1fr] gap-4 border-b border-[var(--color-hairline)] py-5 md:grid-cols-[auto_auto_1fr_auto]"
    >
      <button
        type="button"
        aria-label="순서 변경"
        {...attributes}
        {...listeners}
        className="-ml-1 mt-0.5 cursor-grab touch-none px-1 font-precision text-base leading-none text-[var(--color-muted-soft)] hover:text-[var(--color-on-dark)] active:cursor-grabbing"
      >
        ⋮⋮
      </button>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => onToggle(todo.id, event.target.checked)}
        className="mt-1 h-4 w-4 cursor-pointer accent-[var(--color-on-dark)]"
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
          className="h-9 min-w-0 border-0 border-b border-[var(--color-hairline-strong)] bg-transparent px-0 font-text text-xl text-[var(--color-on-dark)] outline-none focus:border-[var(--color-on-dark)]"
        />
      ) : (
        <span
          onDoubleClick={beginEdit}
          className={
            todo.completed
              ? "min-w-0 font-text text-xl leading-snug text-[var(--color-muted-soft)] line-through"
              : "min-w-0 font-text text-xl leading-snug text-[var(--color-body-strong)]"
          }
        >
          {todo.title}
        </span>
      )}

      <div className="col-start-3 flex flex-wrap items-center gap-3 md:col-start-auto">
        {editing ? (
          <>
            <button
              type="button"
              onClick={commit}
              className="font-precision text-[10px] uppercase tracking-[0.2em] text-[var(--color-on-dark)] underline-offset-4 hover:underline"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancel}
              className="font-precision text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-on-dark)] hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={beginEdit}
            className="font-precision text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-on-dark)] hover:underline"
          >
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(todo.id)}
          className="font-precision text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-soft)] underline-offset-4 hover:text-[var(--color-on-dark)] hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
