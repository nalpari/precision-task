"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Todos" },
  { href: "/active", label: "Active" },
];

export default function AppHeader({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-hairline)] bg-[rgba(23,23,23,0.88)] text-[var(--color-on-dark)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-display text-sm font-medium leading-none text-[var(--color-on-dark)]"
        >
          <span
            aria-hidden="true"
            className="grid h-5 w-5 place-items-center rounded-[6px] border border-[var(--color-brand-border)] bg-[rgba(62,207,142,0.08)]"
          >
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--color-brand)]" />
          </span>
          <span className="truncate">My Todo</span>
        </Link>

        <nav className="order-3 flex w-full items-center gap-1 sm:order-none sm:w-auto">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "rounded-full border border-[var(--color-brand-border)] bg-[rgba(62,207,142,0.08)] px-3 py-2 font-display text-sm font-medium leading-none text-[var(--color-on-dark)]"
                    : "rounded-full border border-transparent px-3 py-2 font-display text-sm font-medium leading-none text-[var(--color-body)] transition-colors hover:text-[var(--color-on-dark)]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {userEmail && (
          <form
            action="/auth/signout"
            method="post"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="hidden max-w-48 truncate font-display text-xs text-[var(--color-muted)] md:inline">
              {userEmail}
            </span>
            <button className="rounded-[6px] border border-transparent px-2 py-1.5 font-display text-sm font-medium text-[var(--color-body)] transition-colors hover:border-[var(--color-hairline)] hover:text-[var(--color-on-dark)]">
              Logout
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
