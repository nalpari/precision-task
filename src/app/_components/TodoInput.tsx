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
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="새로운 할 일을 입력하세요"
        maxLength={500}
        className="h-12 min-w-0 border-0 border-b border-[var(--color-hairline-strong)] bg-transparent px-0 font-text text-xl text-[var(--color-on-dark)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-on-dark)]"
      />
      <button
        type="submit"
        className="min-h-11 rounded-full border border-[var(--color-on-dark)] bg-transparent px-8 font-precision text-xs uppercase tracking-[0.22em] text-[var(--color-on-dark)] transition-colors hover:bg-[var(--color-on-dark)] hover:text-[var(--color-canvas)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-link)]"
      >
        Add
      </button>
    </form>
  );
}
