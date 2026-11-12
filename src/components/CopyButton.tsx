"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

/** Copies `value` to the clipboard and briefly confirms. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Older browsers / non-secure contexts: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-fg/20 px-3 py-1.5 text-xs font-bold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
    >
      {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
