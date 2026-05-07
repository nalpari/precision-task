"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function GoogleSignInButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      setPending(false);
    }
    // On success the browser is redirected to Google, so no further state update.
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="flex min-h-11 items-center justify-center gap-3 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-deep)] px-8 font-display text-sm font-medium text-[var(--color-on-dark)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-50"
      >
        <GoogleMark />
        <span className="whitespace-nowrap">
          {pending ? "Redirecting" : "Google"}
        </span>
      </button>
      {error && (
        <p className="font-text text-base text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

function GoogleMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px] font-medium"
    >
      G
    </span>
  );
}
