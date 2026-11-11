"use client";

import { Button } from "../Button";
import { contactSubjects, validateContact, type ContactValues } from "@/lib/validation";
import { Honeypot, SelectField, TextArea, TextField } from "./Field";
import { SuccessCard } from "./SuccessCard";
import { useEnquiryForm } from "./useEnquiryForm";

const initial: ContactValues = {
  name: "",
  email: "",
  phone: "",
  subject: contactSubjects[0],
  message: "",
  website: "",
};

const order: (keyof ContactValues & string)[] = ["name", "email", "phone", "subject", "message"];

export function ContactForm() {
  const { values, bind, setValue, onSubmit, status, serverError, reset } = useEnquiryForm<ContactValues>({
    kind: "contact",
    initial,
    validate: validateContact,
    order,
  });

  if (status === "sent") {
    return (
      <SuccessCard title="Message sent" onReset={reset} resetLabel="Send another message">
        <p>
          Thank you, {values.name.trim()}. We&apos;ve received your message and will reply to{" "}
          <strong className="text-fg">{values.email}</strong>.
        </p>
      </SuccessCard>
    );
  }

  const f = (k: keyof ContactValues & string) => {
    const { value, error, onChange, onBlur } = bind(k);
    return { value, error, onChange, onBlur };
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot value={values.website} onChange={(v) => setValue("website", v, false)} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Your name" name="name" required autoComplete="name" placeholder="Full name" {...f("name")} />
        <TextField label="Email address" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" {...f("email")} />
        <TextField label="Phone number" name="phone" type="tel" optional autoComplete="tel" inputMode="tel" placeholder="+234 800 000 0000" {...f("phone")} />
        <SelectField label="Subject" name="subject" required options={contactSubjects} {...f("subject")} />
        <TextArea className="sm:col-span-2" label="Message" name="message" required rows={6} placeholder="How can we help?" {...f("message")} />
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="rounded-2xl border border-red-400/40 bg-red-400/10 px-5 py-4 text-sm text-red-300">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
