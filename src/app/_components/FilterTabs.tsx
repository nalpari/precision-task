"use client";

import type { TodoFilter } from "@/types/todo";

const TABS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행중" },
  { value: "completed", label: "완료" },
];

export default function FilterTabs({
  value,
  onChange,
  counts,
}: {
  value: TodoFilter;
  onChange: (next: TodoFilter) => void;
  counts: Record<TodoFilter, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="필터"
      className="flex items-center gap-1 rounded-md border border-zinc-200 p-1 text-sm dark:border-zinc-800"
    >
      {TABS.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={
              active
                ? "rounded px-3 py-1 font-medium bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                : "rounded px-3 py-1 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-70">
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
