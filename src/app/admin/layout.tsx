import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowUpRight } from "@/components/icons";
import { Star4 } from "@/components/Sparkle";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // The admin has no login yet, so it exists only in development unless explicitly enabled.
  if (process.env.NODE_ENV === "production" && process.env.ADMIN_PREVIEW !== "1") notFound();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl">
        <div className="container-x flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" aria-label="Apostle Daniel Ogidi, home" className="sm:hidden">
              <Star4 className="size-7 text-gold" />
            </Link>
            <div className="hidden sm:block">
              <Logo />
            </div>
            <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] font-extrabold tracking-[0.18em] text-ink uppercase">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1.5 text-sm font-semibold text-fg/70 transition-colors hover:text-fg sm:inline-flex"
            >
              View site <ArrowUpRight width={15} height={15} />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="main" className="pt-10">
        {children}
      </main>
    </div>
  );
}
