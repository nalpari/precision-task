"use client";

import type { CSSProperties } from "react";

export function CompletionRing({
  active,
  completed,
}: {
  active: number;
  completed: number;
}) {
  const total = active + completed;
  const pct = total === 0 ? 0 : completed / total;
  const r = 56;
  const c = 2 * Math.PI * r;
  const dash = c * pct;

  return (
    <DashboardCard label="Completion">
      <div className="flex items-center gap-6">
        <svg
          width="132"
          height="132"
          viewBox="-66 -66 132 132"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle
            r={r}
            cx="0"
            cy="0"
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="1.5"
          />
          <circle
            r={r}
            cx="0"
            cy="0"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1.5"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={c / 4}
            transform="rotate(-90)"
            strokeLinecap="butt"
            className="chart-ring-value"
          />
        </svg>
        <div className="min-w-0">
          <div className="font-display text-4xl font-normal leading-none text-[var(--color-on-dark)]">
            {Math.round(pct * 100)}%
          </div>
          <div className="mt-2 font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
            {active} active · {completed} done
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

export function WeeklyActivity({
  counts,
  labels,
}: {
  counts: number[];
  labels: string[];
}) {
  const max = Math.max(1, ...counts);
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <DashboardCard label="Last 7 Days · Created">
      <div className="flex items-end gap-3">
        {counts.map((n, i) => {
          const h = Math.round((n / max) * 100);
          const isLast = i === counts.length - 1;
          return (
            <div
              key={i}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-[100px] w-full items-end">
                <div
                  className="motion-chart-y w-full"
                  style={{
                    "--motion-delay": `${120 + i * 45}ms`,
                    height: `${h}%`,
                    minHeight: n > 0 ? "2px" : "0",
                    background: isLast
                      ? "var(--color-brand)"
                      : "var(--color-body)",
                    opacity: isLast ? 1 : 0.4,
                  } as CSSProperties}
                  aria-label={`${labels[i]}: ${n}`}
                />
              </div>
              <div className="font-precision text-[9px] uppercase tracking-[1.2px] text-[var(--color-muted)]">
                {labels[i]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
        {total} total · peak {max}
      </div>
    </DashboardCard>
  );
}

export function AgeBuckets({
  buckets,
}: {
  buckets: { today: number; yesterday: number; older: number };
}) {
  const max = Math.max(1, buckets.today, buckets.yesterday, buckets.older);
  const rows: { key: string; label: string; value: number }[] = [
    { key: "today", label: "오늘", value: buckets.today },
    { key: "yesterday", label: "어제", value: buckets.yesterday },
    { key: "older", label: "그 이전", value: buckets.older },
  ];

  return (
    <DashboardCard label="In-Progress · By Age">
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => {
          const w = Math.round((row.value / max) * 100);
          return (
            <div key={row.key} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
                <span>{row.label}</span>
                <span className="text-[var(--color-on-dark)]">{row.value}</span>
              </div>
              <div className="h-[3px] w-full bg-[var(--color-hairline)]">
                <div
                  className="chart-age-bar h-full bg-[var(--color-brand)]"
                  style={{
                    "--motion-delay": `${160 + i * 70}ms`,
                    width: `${w}%`,
                  } as CSSProperties}
                />
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}

function DashboardCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="chart-card flex flex-col rounded-[8px] border border-[var(--color-hairline)] bg-[var(--color-deep)] p-5">
      <p className="font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]">
        {label}
      </p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
