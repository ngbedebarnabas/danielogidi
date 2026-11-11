"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Close, Menu } from "./icons";

const left = site.nav.slice(0, 2);
const right = site.nav.slice(2);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Slide away on scroll down, return on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 180);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const link = (l: (typeof site.nav)[number]) => (
    <Link
      key={l.href}
      href={l.href}
      aria-current={isActive(l.href) ? "page" : undefined}
      className={`relative px-1 py-2 text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
        isActive(l.href) ? "text-gold-ink" : "text-fg/80 hover:text-fg"
      }`}
    >
      {l.label}
      {isActive(l.href) && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gold"
        />
      )}
    </Link>
  );

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-gold px-4 py-2 text-sm font-bold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
      >
        <nav
          aria-label="Primary"
          data-theme="dark"
          className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-fg/10 bg-ink/85 py-3 pr-3 pl-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-8"
        >
          <div className="hidden items-center justify-evenly lg:flex">{left.map(link)}</div>

          <Logo className="lg:justify-self-center" />

          <div className="hidden items-center justify-evenly gap-2 lg:flex">
            {right.map(link)}
            <Link
              href="/invite"
              className="ml-1 rounded-full bg-gold px-4 py-2.5 text-[0.75rem] whitespace-nowrap font-bold tracking-[0.12em] text-ink uppercase transition-colors hover:bg-gold-soft"
            >
              Send Invite
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="size-11" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-fg/10 text-fg transition-colors hover:bg-gold hover:text-ink"
          >
            {open ? <Close /> : <Menu />}
          </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-theme="dark"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="gold-glow fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ink/97 px-8 pt-28 pb-12 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="flex flex-col gap-1"
            >
              {[{ href: "/", label: "Home" }, ...site.nav].map((l) => (
                <motion.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${
                      pathname === l.href ? "text-gold-ink" : "text-fg"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                className="pt-6"
              >
                <Link
                  href="/invite"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full bg-gold px-7 py-4 text-sm font-bold tracking-widest text-ink uppercase"
                >
                  Send Invite
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
