import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EmailMagicLinkForm from "../_components/login/EmailMagicLinkForm";
import GoogleSignInButton from "../_components/login/GoogleSignInButton";

type SearchParams = Promise<{ error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");

  const { error } = await searchParams;

  return (
    <main className="hero-photo-band flex min-h-screen flex-col bg-[var(--color-canvas)] text-[var(--color-on-dark)]">
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-end gap-12 px-4 pb-16 pt-28 sm:px-8 md:grid-cols-[1fr_420px] md:pb-24 md:pt-36">
        <section className="max-w-2xl">
          <p className="font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Secure access
          </p>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[1.08] tracking-[0.08em] text-[var(--color-on-dark)] sm:text-6xl md:text-[64px]">
            Enter The Ledger
          </h1>
          <p className="mt-6 max-w-md font-text text-lg leading-7 text-[var(--color-body)]">
            매직링크 또는 Google OAuth로 개인 작업 공간에 접근합니다.
          </p>
        </section>

        <section className="border border-[var(--color-hairline)] bg-[var(--color-surface-card)] p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase tracking-[0.08em]">
            Sign In
          </h2>

          {error && (
            <p className="mt-5 border-y border-[var(--color-warning)] py-3 font-text text-base text-[var(--color-warning)]">
              {decodeURIComponent(error)}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-6">
            <EmailMagicLinkForm />
            <Divider />
            <GoogleSignInButton />
          </div>
        </section>
      </div>
    </main>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 font-precision text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
      <span className="h-px flex-1 bg-[var(--color-hairline)]" />
      또는
      <span className="h-px flex-1 bg-[var(--color-hairline)]" />
    </div>
  );
}
