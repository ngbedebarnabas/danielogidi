"use client";

import { Button } from "../Button";
import {
  audienceOptions,
  FLYER_ACCEPT,
  isoToday,
  validateInvite,
  type InviteValues,
} from "@/lib/validation";
import { Honeypot, TextArea, TextField } from "./Field";
import { FileField, MultiSelectField } from "./Pickers";
import { SuccessCard } from "./SuccessCard";
import { useEnquiryForm } from "./useEnquiryForm";

const initial: InviteValues = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  location: "",
  social: "",
  background: "",
  ministrySize: "",
  dateFrom: "",
  dateTo: "",
  topic: "",
  burden: "",
  audienceSize: "",
  audienceTypes: [],
  sessions: "",
  sessionDetails: "",
  flyer: null,
  comments: "",
  website: "",
};

// Order of the fields on screen; the first one with an error gets focus on submit.
const order: (keyof InviteValues & string)[] = [
  "fullName", "organization", "email", "phone", "location", "social", "background", "ministrySize",
  "dateFrom", "dateTo", "topic", "burden", "audienceSize", "sessions", "audienceTypes", "sessionDetails",
  "flyer", "comments",
];

const full = "md:col-span-2 lg:col-span-1 xl:col-span-2";
const grid = "grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2";

export function InviteForm() {
  const { values, errors, bind, setValue, onSubmit, status, serverError, reset } = useEnquiryForm<InviteValues>({
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
      <Honeypot value={values.website} onChange={(v) => setValue("website", v, false)} />

      <fieldset className="space-y-6">
        <legend className="mb-6 flex items-center gap-3 font-display text-xl font-extrabold">
          <span className="grid size-8 place-items-center rounded-full bg-gold text-sm text-ink">1</span>
          About you &amp; your ministry
        </legend>
        <div className={grid}>
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
            className={full}
            label="Physical location of Ministry / Organization"
            name="location"
            required
            autoComplete="street-address"
            placeholder="Street, city, state / region, country"
            {...f("location")}
          />
          <TextField
            className={full}
            label="Social media handle or link"
            name="social"
            optional
            placeholder="@yourministry or https://facebook.com/yourministry"
            {...f("social")}
          />
          <TextArea
            className={full}
            label="Brief background of the ministry / organization"
            name="background"
            required
            rows={4}
            placeholder="When it started, its vision and focus, and what it is known for…"
            {...f("background")}
          />
          <TextField
            className={full}
            label="Current or average size of the ministry / organization"
            name="ministrySize"
            required
            placeholder="e.g. about 400 members, or 3 branches with ~1,200 in total"
            {...f("ministrySize")}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 flex items-center gap-3 font-display text-xl font-extrabold">
          <span className="grid size-8 place-items-center rounded-full bg-gold text-sm text-ink">2</span>
          About the event
        </legend>
        <div className={grid}>
          <TextField label="Event date: from" name="dateFrom" type="date" required {...f("dateFrom")} />
          <TextField label="Event date: to" name="dateTo" type="date" required min={values.dateFrom || undefined} {...f("dateTo")} />
          <TextField
            className={full}
            label="Topic of the event / topic to speak on"
            name="topic"
            required
            placeholder="e.g. Annual leadership conference: Raising doctrinally sound leaders"
            {...f("topic")}
          />
          <TextArea
            className={full}
            label="Burden / emphasis for the conference"
            name="burden"
            required
            rows={4}
            placeholder="What is on your heart for this gathering, and what do you hope it will accomplish?"
            {...f("burden")}
          />
          <TextField
            label="Estimated / projected size of the audience"
            name="audienceSize"
            required
            inputMode="text"
            placeholder="e.g. about 1,500 people"
            {...f("audienceSize")}
          />
          <TextField
            label="Number of sessions he is to minister"
            name="sessions"
            type="number"
            required
            min={1}
            max={50}
            step={1}
            inputMode="numeric"
            placeholder="e.g. 3"
            {...f("sessions")}
          />
          <MultiSelectField
            className={full}
            label="Type of audience / participants"
            name="audienceTypes"
            required
            hint="Select one or more."
            options={audienceOptions}
            value={values.audienceTypes}
            error={errors.audienceTypes}
            onChange={(next) => setValue("audienceTypes", next)}
          />
          <TextField
            className={full}
            label="Time & duration per session"
            name="sessionDetails"
            required
            placeholder="e.g. Fri 6:00 pm (90 min), Sat 9:00 am (2 hrs), Sun 10:00 am (60 min)"
            {...f("sessionDetails")}
          />
          <FileField
            className={full}
            label="Upload flyer design of the meeting"
            name="flyer"
            optional
            hint="If you already have a flyer or programme for the event, attach it here."
            accept={FLYER_ACCEPT}
            value={values.flyer}
            error={errors.flyer}
            onChange={(file) => setValue("flyer", file)}
          />
          <TextArea
            className={full}
            label="Any other comment"
            name="comments"
            optional
            placeholder="Travel and accommodation arrangements, ministry sessions required, anything else we should know…"
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
          Fields marked <span className="text-gold-ink">*</span> are required. Your details are used only to respond to
          this invitation.
        </p>
        <Button type="submit" className="shrink-0 whitespace-nowrap" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Invite"}
        </Button>
      </div>
    </form>
  );
}
