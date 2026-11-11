"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Errors } from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";
type FieldValue = string | string[] | File | null;

/** Text → field, string[] → repeated field, File → file part. */
function toFormData(kind: string, values: Record<string, FieldValue>) {
  const body = new FormData();
  body.append("kind", kind);
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "string") body.append(key, value);
    else if (Array.isArray(value)) value.forEach((v) => body.append(key, v));
    else if (value) body.append(key, value, value.name);
  }
  return body;
}

/**
 * Small controlled-form helper shared by the invitation and contact forms:
 * per-field validation, focus-first-error on submit, multipart POST (so files can ride along).
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

  const setError = (key: keyof T, message?: string) =>
    setErrors((prev) => {
      if (prev[key] === message) return prev;
      const next = { ...prev };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });

  /** Props for a plain text / textarea / select field. */
  const bind = (key: keyof T & string) => ({
    value: values[key] as string,
    error: errors[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setError(key);
    },
    onBlur: () => setError(key, validate(values)[key]),
  });

  /** Set any kind of value (list, file…) and validate that field straight away. */
  function setValue<K extends keyof T>(key: K, value: T[K], validateNow = true) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (validateNow) setError(key, validate(next)[key]);
    else if (errors[key]) setError(key);
  }

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
        body: toFormData(kind, values as Record<string, FieldValue>),
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

  return { values, errors, bind, setValue, onSubmit, status, serverError, reset };
}
