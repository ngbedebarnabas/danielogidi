"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { Check, ChevronDown, Close, FileText, Upload } from "../icons";
import { aria, control, Wrap, type Shared } from "./Field";

/* ------------------------------------------------------------------ */
/* Multi-select dropdown                                               */
/* ------------------------------------------------------------------ */

export function MultiSelectField({
  name,
  label,
  error,
  hint,
  required,
  optional,
  className,
  options,
  value,
  onChange,
  placeholder = "Select one or more",
}: Shared & {
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close when clicking elsewhere.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const toggle = (option: string) => {
    // Keep the list's own order so the email/summary always reads the same way.
    onChange(options.filter((o) => (o === option ? !value.includes(o) : value.includes(o))));
  };

  const focusOption = (i: number) => {
    const count = options.length;
    optionRefs.current[((i % count) + count) % count]?.focus();
  };

  function onTriggerKey(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusOption(e.key === "ArrowDown" ? 0 : options.length - 1));
    }
  }

  function onListKey(e: KeyboardEvent) {
    const i = optionRefs.current.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusOption(i + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusOption(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusOption(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusOption(options.length - 1);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <Wrap {...{ name, label, error, hint, required, optional, className }}>
      <div
        ref={rootRef}
        className="relative"
        onBlur={(e) => {
          if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          {...aria(name, error, hint)}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onTriggerKey}
          className={`${control} flex min-h-[3.4rem] items-center justify-between gap-3 text-left ${
            error ? "border-red-400/70" : "border-line"
          }`}
        >
          {value.length === 0 ? (
            <span className="text-fg/35">{placeholder}</span>
          ) : (
            <span className="flex flex-wrap gap-1.5">
              {value.map((v) => (
                <span key={v} className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-fg">
                  {v}
                </span>
              ))}
            </span>
          )}
          <ChevronDown className={`shrink-0 text-fg/50 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div
            data-lenis-prevent
            className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
          >
            <ul role="listbox" aria-multiselectable="true" aria-label={label} onKeyDown={onListKey} className="max-h-72 overflow-y-auto p-2">
              {options.map((option, i) => {
                const selected = value.includes(option);
                return (
                  <li key={option} role="presentation">
                    <button
                      ref={(el) => {
                        optionRefs.current[i] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => toggle(option)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-fg/5 focus:bg-fg/5 focus:outline-none"
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          selected ? "border-gold bg-gold text-ink" : "border-fg/30"
                        }`}
                      >
                        {selected && <Check width={13} height={13} strokeWidth={3} />}
                      </span>
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs">
              <span className="text-muted">{value.length} selected</span>
              <span className="flex gap-4 font-bold">
                {value.length > 0 && (
                  <button type="button" onClick={() => onChange([])} className="text-muted hover:text-fg">
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="text-gold-ink hover:underline"
                >
                  Done
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ------------------------------------------------------------------ */
/* File upload                                                         */
/* ------------------------------------------------------------------ */

const size = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function FileField({
  name,
  label,
  error,
  hint,
  required,
  optional,
  className,
  accept,
  value,
  onChange,
}: Shared & { accept: string; value: File | null; onChange: (file: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const preview = useMemo(
    () => (value && value.type.startsWith("image/") ? URL.createObjectURL(value) : null),
    [value],
  );
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const clear = () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange(null);
  };

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onChange(file);
  }

  return (
    <Wrap {...{ name, label, error, hint, required, optional, className }}>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          {...aria(name, error, hint)}
          className="peer sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <label
          htmlFor={`field-${name}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed bg-bg px-5 py-4 transition-colors peer-focus-visible:border-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30 hover:border-gold ${
            error ? "border-red-400/70" : dragging ? "border-gold bg-gold/10" : "border-fg/25"
          }`}
        >
          {value ? (
            <>
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not optimisable
                <img src={preview} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
              ) : (
                <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-ink">
                  <FileText />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{value.name}</span>
                <span className="block text-xs text-muted">{size(value.size)} · click to replace</span>
              </span>
            </>
          ) : (
            <>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink">
                <Upload />
              </span>
              <span className="text-sm">
                <span className="font-semibold">Choose a file</span>
                <span className="text-muted"> or drag it here</span>
                <span className="mt-0.5 block text-xs text-muted">JPG, PNG, WebP or PDF · up to 4 MB</span>
              </span>
            </>
          )}
        </label>
        {value && (
          <button
            type="button"
            onClick={clear}
            aria-label="Remove file"
            className="absolute top-1/2 right-4 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-fg/10 transition-colors hover:bg-red-500 hover:text-white"
          >
            <Close width={16} height={16} />
          </button>
        )}
      </div>
    </Wrap>
  );
}
