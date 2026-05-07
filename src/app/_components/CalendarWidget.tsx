"use client";

import { useMemo, useState } from "react";
import type { Todo } from "@/types/todo";

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type Props = {
  todos: Todo[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

export default function CalendarWidget({
  todos,
  selectedDate,
  onSelectDate,
}: Props) {
  const [base, setBase] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const todoDateStats = useMemo(() => {
    const map = new Map<string, { total: number; completed: number }>();
    for (const t of todos) {
      const key = dayKey(new Date(t.created_at));
      const entry = map.get(key) ?? { total: 0, completed: 0 };
      entry.total++;
      if (t.completed) entry.completed++;
      map.set(key, entry);
    }
    return map;
  }, [todos]);

  const today = dayKey(new Date());

  const cells = useMemo(() => {
    const year = base.getFullYear();
    const month = base.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const offset = firstDow === 0 ? 6 : firstDow - 1;
    const cells_: (number | null)[] = [
      ...Array(offset).fill(null),
      ...Array.from({ length: lastDay }, (_, i) => i + 1),
    ];
    return cells_;
  }, [base]);

  function prevMonth() {
    setBase((b) => new Date(b.getFullYear(), b.getMonth() - 1, 1));
  }

  function nextMonth() {
    setBase((b) => new Date(b.getFullYear(), b.getMonth() + 1, 1));
  }

  const monthLabel = base.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-4 rounded-[8px] border border-[var(--color-hairline)] bg-[var(--color-deep)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
          Date filter
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="이전 달"
            onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-on-dark)]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M6.5 2L3.5 5L6.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="min-w-[88px] text-center font-display text-xs font-medium text-[var(--color-body)]">
            {monthLabel}
          </span>
          <button
            type="button"
            aria-label="다음 달"
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-on-dark)]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M3.5 2L6.5 5L3.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-[6px] border border-[var(--color-hairline)] bg-[var(--color-hairline)]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div
            key={i}
            className="bg-[var(--color-deep)] py-2 text-center font-precision text-[9px] uppercase tracking-[1.2px] text-[var(--color-muted)]"
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) {
            return (
              <div
                key={`empty-${i}`}
                className="min-h-[36px] bg-[var(--color-deep)]"
              />
            );
          }
          const date = new Date(base.getFullYear(), base.getMonth(), day);
          const key = dayKey(date);
          const isToday = key === today;
          const stats = todoDateStats.get(key);
          const hasTodo = stats !== undefined;
          const allDone = hasTodo && stats.completed === stats.total;
          const isSelected = key === selectedDate;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(isSelected ? null : key)}
              className={[
                "relative flex min-h-[36px] flex-col items-center justify-center bg-[var(--color-deep)] transition-colors",
                isSelected
                  ? "bg-[rgba(62,207,142,0.08)] text-[var(--color-on-dark)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-body)]",
              ].join(" ")}
            >
              <span
                  className={[
                    "font-precision text-[11px]",
                    isToday ? "text-[var(--color-brand)]" : "",
                  ].join(" ")}
                >
                {day}
              </span>
              {hasTodo && (
                <span
                  className={[
                    "mt-0.5 h-1 w-1 rounded-full",
                    allDone
                      ? "bg-[var(--color-link)]"
                      : "bg-[var(--color-body)]",
                  ].join(" ")}
                />
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <button
          type="button"
          onClick={() => onSelectDate(null)}
          className="mt-3 w-full rounded-[6px] px-2 py-1.5 font-display text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-body)]"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
