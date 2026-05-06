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
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-xl font-semibold tracking-tight">로그인</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          매직링크 또는 Google로 계속할 수 있어요.
        </p>

        {error && (
          <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
            {decodeURIComponent(error)}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <EmailMagicLinkForm />
          <Divider />
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-500">
      <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      또는
      <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
