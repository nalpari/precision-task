"use client";

import { useRef, useState } from "react";

export default function TodoInput({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="새로운 할 일을 입력하세요"
        maxLength={500}
        className="h-11 min-w-0 rounded-[6px] border border-[var(--color-hairline)] bg-[var(--color-deep)] px-3 font-text text-base text-[var(--color-on-dark)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand-border)]"
      />
      <button
        type="submit"
        className="min-h-11 rounded-full border border-[var(--color-on-dark)] bg-[var(--color-deep)] px-8 font-display text-sm font-medium text-[var(--color-on-dark)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-link)]"
      >
        Add
      </button>
    </form>
  );
}
