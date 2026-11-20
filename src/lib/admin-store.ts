"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { sampleSubmissions, type Invitation, type Message, type Submission } from "@/data/admin";

/**
 * Frontend-only persistence for the admin preview. Invitations and contact messages
 * live in ONE list, each with a `type`, exactly like the future database table.
 * They are kept in localStorage so changes survive a reload. When the real backend
 * exists, replace this file with API calls; the components don't care.
 */
const KEY = "adullam-admin-submissions-v2";
const EVENT = "admin-submissions-change";
const SEED = JSON.stringify(sampleSubmissions);

let memory: string | null = null; // fallback when localStorage is unavailable

function read(): string {
  if (memory) return memory;
  try {
    return localStorage.getItem(KEY) ?? SEED;
  } catch {
    return SEED;
  }
}

function write(next: string | null) {
  memory = next;
  try {
    if (next === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
  } catch {
    // private mode etc.: keep it in memory for this session
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function useSubmissions() {
  // A string snapshot keeps useSyncExternalStore stable between unchanged reads.
  const raw = useSyncExternalStore(subscribe, read, () => SEED);
  const submissions = useMemo(() => JSON.parse(raw) as Submission[], [raw]);

  const invitations = useMemo(() => submissions.filter((s): s is Invitation => s.type === "invitation"), [submissions]);
  const messages = useMemo(() => submissions.filter((s): s is Message => s.type === "message"), [submissions]);

  const update = useCallback(<T extends Submission>(id: string, patch: (s: T) => Partial<T>) => {
    const current = JSON.parse(read()) as Submission[];
    write(JSON.stringify(current.map((s) => (s.id === id ? ({ ...s, ...patch(s as T) } as Submission) : s))));
  }, []);

  const reset = useCallback(() => write(null), []);

  return { invitations, messages, update, reset };
}
