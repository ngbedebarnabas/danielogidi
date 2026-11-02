import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "../icons";

type Shared = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
};

const control =
  "w-full rounded-2xl border bg-bg px-5 py-4 text-[0.95rem] text-fg placeholder:text-fg/35 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function Wrap({
  name, label, error, hint, required, optional, className = "", children,
}: Shared & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`field-${name}`} className="mb-2 flex items-baseline justify-between text-sm font-semibold">
        <span>
          {label}
          {required && <span className="ml-1 text-gold-ink" aria-hidden>*</span>}
        </span>
        {optional && <span className="text-xs font-medium text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`hint-${name}`} className="mt-2 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p id={`error-${name}`} role="alert" className="mt-2 text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const aria = (name: string, error?: string, hint?: string) => ({
  id: `field-${name}`,
  name,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `error-${name}` : hint ? `hint-${name}` : undefined,
});

export function TextField({
  name, label, error, hint, required, optional, className, ...input
}: Shared & Omit<ComponentProps<"input">, keyof Shared>) {
  return (
    <Wrap {...{ name, label, error, hint, required, optional, className }}>
      <input
        {...aria(name, error, hint)}
        required={required}
        className={`${control} ${error ? "border-red-400/70" : "border-line"}`}
        {...input}
      />
    </Wrap>
  );
}

export function TextArea({
  name, label, error, hint, required, optional, className, ...input
}: Shared & Omit<ComponentProps<"textarea">, keyof Shared>) {
  return (
    <Wrap {...{ name, label, error, hint, required, optional, className }}>
      <textarea
        {...aria(name, error, hint)}
        required={required}
        rows={5}
        className={`${control} resize-y ${error ? "border-red-400/70" : "border-line"}`}
        {...input}
      />
    </Wrap>
  );
}

export function SelectField({
  name, label, error, hint, required, optional, className, options, ...input
}: Shared & Omit<ComponentProps<"select">, keyof Shared> & { options: readonly string[] }) {
  return (
    <Wrap {...{ name, label, error, hint, required, optional, className }}>
      <div className="relative">
        <select
          {...aria(name, error, hint)}
          required={required}
          className={`${control} appearance-none pr-12 ${error ? "border-red-400/70" : "border-line"}`}
          {...input}
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-panel">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-fg/50" />
      </div>
    </Wrap>
  );
}

/** Hidden-from-humans honeypot field. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
