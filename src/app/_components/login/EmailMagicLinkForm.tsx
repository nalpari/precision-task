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
      <p className="rounded-[6px] border border-[var(--color-brand-border)] bg-[rgba(62,207,142,0.08)] p-3 font-text text-base text-[var(--color-success)]">
        매직링크를 <span className="text-[var(--color-on-dark)]">{email}</span>로 보냈어요.
        메일함을 확인하세요.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label
        htmlFor="email"
        className="font-precision text-xs uppercase tracking-[1.2px] text-[var(--color-muted)]"
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
        className="h-11 rounded-[6px] border border-[var(--color-hairline)] bg-[var(--color-deep)] px-3 font-text text-base text-[var(--color-on-dark)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand-border)]"
      />
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="min-h-11 rounded-full border border-[var(--color-on-dark)] bg-[var(--color-deep)] px-8 font-display text-sm font-medium text-[var(--color-on-dark)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-50"
      >
        {status.kind === "sending" ? "Sending" : "Send Magic Link"}
      </button>
      {status.kind === "error" && (
        <p className="font-text text-base text-[var(--color-error)]">
          {status.message}
        </p>
      )}
    </form>
  );
}
