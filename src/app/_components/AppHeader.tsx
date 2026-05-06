"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Work Queue" },
  { href: "/active", label: "Active" },
];

export default function AppHeader({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-on-dark)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-base uppercase tracking-[0.22em] text-[var(--color-on-dark)]"
        >
          Precision Tasks
        </Link>

        <nav className="flex items-center gap-6">
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
                    ? "font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-on-dark)] underline underline-offset-[6px]"
                    : "font-precision text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] hover:text-[var(--color-on-dark)]"
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
            className="flex items-center gap-4"
          >
            <span className="hidden max-w-48 truncate font-precision text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)] sm:inline">
              {userEmail}
            </span>
            <button className="font-precision text-xs uppercase tracking-[0.22em] text-[var(--color-body)] transition-colors hover:text-[var(--color-on-dark)]">
              Logout
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
