import Link from "next/link";
import { Burst } from "@/components/Sparkle";

export default function NotFound() {
  return (
    <section className="gold-glow grid min-h-[80vh] place-items-center px-6 pt-32 pb-20 text-center">
      <div>
        <Burst className="mx-auto size-16 animate-spin-slow text-gold" />
        <p className="mt-8 text-xs font-bold tracking-[0.22em] text-gold-ink uppercase">Error 404</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-fg/70">
          The page you are looking for has moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex rounded-full bg-gold px-7 py-4 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
