"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

export default function EmailMagicLinkForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }
    setStatus({ kind: "sent" });
  }

  if (status.kind === "sent") {
    return (
      <p className="border-y border-[var(--color-success)] py-3 font-text text-base text-[var(--color-success)]">
        매직링크를 <span className="text-[var(--color-on-dark)]">{email}</span>로 보냈어요.
        메일함을 확인하세요.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label
        htmlFor="email"
        className="font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="h-12 border-0 border-b border-[var(--color-hairline-strong)] bg-transparent px-0 font-text text-xl text-[var(--color-on-dark)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-on-dark)]"
      />
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="min-h-11 rounded-full border border-[var(--color-on-dark)] bg-transparent px-8 font-precision text-xs uppercase tracking-[0.22em] text-[var(--color-on-dark)] transition-colors hover:bg-[var(--color-on-dark)] hover:text-[var(--color-canvas)] disabled:opacity-50"
      >
        {status.kind === "sending" ? "Sending" : "Send Magic Link"}
      </button>
      {status.kind === "error" && (
        <p className="font-text text-base text-[var(--color-warning)]">
          {status.message}
        </p>
      )}
    </form>
  );
}
