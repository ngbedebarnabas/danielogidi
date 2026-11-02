"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Errors } from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Small controlled-form helper shared by the invitation and contact forms:
 * per-field validation on blur, focus-first-error on submit, JSON POST.
 */
export function useEnquiryForm<T extends { website: string }>({
  kind,
  initial,
  validate,
  order,
}: {
  kind: "invite" | "contact";
  initial: T;
  validate: (v: T) => Errors<T>;
  /** Field order, used to focus the first invalid field */
  order: (keyof T & string)[];
}) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const bind = (key: keyof T & string) => ({
    value: values[key] as string,
    error: errors[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    onBlur: () => {
      const message = validate(values)[key];
      setErrors((prev) => {
        if (prev[key] === message) return prev;
        const next = { ...prev };
        if (message) next[key] = message;
        else delete next[key];
        return next;
      });
    },
  });

  const setField = (key: keyof T & string, value: string) => setValues((v) => ({ ...v, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    const first = order.find((k) => found[k]);
    if (first) {
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Errors<T>;
      };
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.message ?? "Something went wrong. Please check the form and try again.");
      setStatus("error");
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  function reset() {
    setValues(initial);
    setErrors({});
    setStatus("idle");
    setServerError("");
  }

  return { values, bind, setField, onSubmit, status, serverError, reset };
}
