"use client";

import { useState } from "react";
import { Button } from "../Button";
import { NoteIcon, Trash } from "../icons";
import type { Note } from "@/data/admin";
import { formatDay } from "@/lib/dates";

/** Dated internal notes with an add box. Shared by the invitation and message drawers. */
export function NotesPanel({
  notes,
  onAdd,
  onDelete,
  inputId = "new-note",
}: {
  notes: Note[];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
  inputId?: string;
}) {
  const [text, setText] = useState("");

  function add() {
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  }

  return (
    <>
      {notes.length > 0 ? (
        <ul className="mb-5 space-y-3">
          {notes.map((n) => (
            <li key={n.id} className="rounded-2xl border border-line bg-panel/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed whitespace-pre-line">{n.text}</p>
                <button
                  type="button"
                  onClick={() => onDelete(n.id)}
                  aria-label="Delete note"
                  className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-rose-500/15 hover:text-rose-600"
                >
                  <Trash width={15} height={15} />
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">{formatDay(n.at)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-5 text-sm text-muted">No notes yet. Record calls, decisions and follow-ups here.</p>
      )}
      <label htmlFor={inputId} className="sr-only">
        Add a note
      </label>
      <textarea
        id={inputId}
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) add();
        }}
        placeholder="Add a note…  (Ctrl/⌘ + Enter to save)"
        className="w-full resize-y rounded-2xl border border-line bg-panel px-4 py-3 text-sm placeholder:text-fg/35 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
      />
      <div className="mt-3">
        <Button arrow={false} variant="outline" onClick={add} disabled={!text.trim()}>
          <span className="inline-flex items-center gap-2">
            <NoteIcon width={15} height={15} /> Add note
          </span>
        </Button>
      </div>
    </>
  );
}
