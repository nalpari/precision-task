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
      className="grid grid-cols-3 border-y border-[var(--color-hairline)]"
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
                ? "border-b border-[var(--color-on-dark)] px-3 py-4 font-precision text-[11px] uppercase tracking-[0.2em] text-[var(--color-on-dark)]"
                : "border-b border-transparent px-3 py-4 font-precision text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-on-dark)]"
            }
          >
            {tab.label}
            <span className="ml-2 text-[10px] text-[var(--color-muted-soft)]">
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
