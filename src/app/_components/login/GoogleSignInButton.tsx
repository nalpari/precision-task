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
        className="flex min-h-11 items-center justify-center gap-3 rounded-full border border-[var(--color-on-dark)] bg-transparent px-8 font-precision text-xs uppercase tracking-[0.22em] text-[var(--color-on-dark)] transition-colors hover:bg-[var(--color-on-dark)] hover:text-[var(--color-canvas)] disabled:opacity-50"
      >
        <GoogleMark />
        {pending ? "Redirecting" : "Continue With Google"}
      </button>
      {error && <p className="font-text text-base text-[var(--color-warning)]">{error}</p>}
    </div>
  );
}

function GoogleMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]"
    >
      G
    </span>
  );
}
