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
      className="grid grid-cols-3 gap-1 rounded-full border border-[var(--color-hairline)] bg-[var(--color-deep)] p-1"
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
                ? "rounded-full border border-[var(--color-brand-border)] bg-[rgba(62,207,142,0.08)] px-3 py-2.5 font-display text-sm font-medium text-[var(--color-on-dark)]"
                : "rounded-full border border-transparent px-3 py-2.5 font-display text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-on-dark)]"
            }
          >
            {tab.label}
            <span className="ml-2 text-xs text-[var(--color-muted)]">
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
