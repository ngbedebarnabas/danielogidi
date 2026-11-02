"use client";

import { Button } from "../Button";
import { isoToday, validateInvite, type InviteValues } from "@/lib/validation";
import { Honeypot, TextArea, TextField } from "./Field";
import { SuccessCard } from "./SuccessCard";
import { useEnquiryForm } from "./useEnquiryForm";

const initial: InviteValues = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  location: "",
  dateFrom: "",
  dateTo: "",
  social: "",
  topic: "",
  comments: "",
  website: "",
};

const order: (keyof InviteValues & string)[] = [
  "fullName", "organization", "email", "phone", "location", "dateFrom", "dateTo", "social", "topic", "comments",
];

export function InviteForm() {
  const { values, bind, setField, onSubmit, status, serverError, reset } = useEnquiryForm<InviteValues>({
    kind: "invite",
    initial,
    // Today is read when validating (an event handler), never during render.
    validate: (v) => validateInvite(v, isoToday()),
    order,
  });

  if (status === "sent") {
    return (
      <SuccessCard title="Invitation received" onReset={reset} resetLabel="Send another invitation">
        <p>
          Thank you, {values.fullName.trim()}. Your invitation for{" "}
          <strong className="text-fg">{values.organization}</strong> has been sent to Apostle Daniel&apos;s office.
        </p>
        <p>
          Someone will review the details and reply to <strong className="text-fg">{values.email}</strong>.
        </p>
      </SuccessCard>
    );
  }

  const f = (k: keyof InviteValues & string) => {
    const { value, error, onChange, onBlur } = bind(k);
    return { value, error, onChange, onBlur };
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-12">
      <Honeypot value={values.website} onChange={(v) => setField("website", v)} />

      <fieldset className="space-y-6">
        <legend className="mb-6 flex items-center gap-3 font-display text-xl font-extrabold">
          <span className="grid size-8 place-items-center rounded-full bg-gold text-sm text-ink">1</span>
          About you
        </legend>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <TextField label="Full name" name="fullName" required autoComplete="name" placeholder="e.g. Pastor John Adeyemi" {...f("fullName")} />
          <TextField
            label="Full name of Ministry / Organization"
            name="organization"
            required
            autoComplete="organization"
            placeholder="Church or organization name"
            {...f("organization")}
          />
          <TextField label="Email address" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" {...f("email")} />
          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+234 800 000 0000"
            hint="Include your country code, ideally one that works on WhatsApp."
            {...f("phone")}
          />
          <TextField
            className="md:col-span-2 lg:col-span-1 xl:col-span-2"
            label="Physical location of Ministry / Organization"
            name="location"
            required
            autoComplete="street-address"
            placeholder="Street, city, state / region, country"
            {...f("location")}
          />
          <TextField
            className="md:col-span-2 lg:col-span-1 xl:col-span-2"
            label="Social media handle or link"
            name="social"
            optional
            placeholder="@yourministry or https://facebook.com/yourministry"
            {...f("social")}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 flex items-center gap-3 font-display text-xl font-extrabold">
          <span className="grid size-8 place-items-center rounded-full bg-gold text-sm text-ink">2</span>
          About the event
        </legend>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <TextField label="Event date: from" name="dateFrom" type="date" required {...f("dateFrom")} />
          <TextField label="Event date: to" name="dateTo" type="date" required min={values.dateFrom || undefined} {...f("dateTo")} />
          <TextField
            className="md:col-span-2 lg:col-span-1 xl:col-span-2"
            label="Topic of the event / topic to speak on"
            name="topic"
            required
            placeholder="e.g. Annual leadership conference: Raising doctrinally sound leaders"
            {...f("topic")}
          />
          <TextArea
            className="md:col-span-2 lg:col-span-1 xl:col-span-2"
            label="Any other comment"
            name="comments"
            optional
            placeholder="Expected attendance, ministry sessions required, travel and accommodation arrangements, anything else we should know…"
            {...f("comments")}
          />
        </div>
      </fieldset>

      {status === "error" && serverError && (
        <p role="alert" className="rounded-2xl border border-red-400/40 bg-red-400/10 px-5 py-4 text-sm text-red-300">
          {serverError}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          Fields marked <span className="text-gold-ink">*</span> are required. Your details are used only to respond to this
          invitation.
        </p>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send invitation"}
        </Button>
      </div>
    </form>
  );
}
