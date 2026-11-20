"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

/** Public navbar + footer around every page except the admin area, which has its own shell. */
export function SiteChrome({ footer, children }: { footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
