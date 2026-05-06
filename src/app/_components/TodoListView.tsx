"use client";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useSyncExternalStore } from "react";
import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

const subscribeNoop = () => () => {};

type Props = {
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: string, completed: boolean) => void;
  onRename: (id: string, title: string) => void;
  onRemove: (id: string) => void;
  onReorder: (
    id: string,
    prevId: string | null,
    nextId: string | null,
  ) => void;
};

export default function TodoListView({
  todos,
  emptyMessage,
  onToggle,
  onRename,
  onRemove,
  onReorder,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

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
    for (const todo of todos) {
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
  }, [todos, todayKeys]);

  function handleDragEnd(items: Todo[]) {
    return (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const reordered = arrayMove(items, oldIndex, newIndex);
      const moved = reordered[newIndex];
      const prev = reordered[newIndex - 1] ?? null;
      const next = reordered[newIndex + 1] ?? null;
      onReorder(moved.id, prev?.id ?? null, next?.id ?? null);
    };
  }

  if (todos.length === 0) {
    return (
      <p className="border-y border-[var(--color-hairline)] px-0 py-10 text-center font-text text-lg text-[var(--color-muted)]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {groups.map((group) => (
        <section key={group.key}>
          <h3 className="border-b border-[var(--color-hairline)] pb-3 font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {group.label}
          </h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd(group.items)}
          >
            <SortableContext
              items={group.items.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {group.items.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onRename={onRename}
                    onRemove={onRemove}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </section>
      ))}
    </div>
  );
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
