// Shared by the forms (client) and the API route (server).

export const audienceOptions = [
  "General Overseers",
  "Senior Pastors",
  "Associate Pastors",
  "Church Workers",
  "Corporate Professionals",
  "Believers",
  "Politicians",
  "Captains of Industries",
  "Government Officials",
] as const;

/** Flyer upload limits. 4 MB keeps requests under typical serverless body limits. */
export const FLYER_MAX_BYTES = 4 * 1024 * 1024;
export const FLYER_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"] as const;
export const FLYER_ACCEPT = ".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf";

export type InviteValues = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  social: string;
  background: string;
  ministrySize: string;
  dateFrom: string;
  dateTo: string;
  topic: string;
  burden: string;
  audienceSize: string;
  audienceTypes: string[];
  sessions: string;
  sessionDetails: string;
  flyer: File | null;
  comments: string;
  /** Honeypot: real visitors never fill this in. */
  website: string;
};

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const contactSubjects = [
  "General enquiry",
  "Media & press",
  "Ministry partnership",
  "Remnant Christian Network Theological Seminary (Adullam)",
  "Prayer & counsel",
  "Something else",
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
// @handle, a full URL, or a bare domain/path like instagram.com/name
const SOCIAL = /^(@?[A-Za-z0-9._-]{2,60}|https?:\/\/\S+|(www\.)?[\w-]+(\.[\w-]+)+(\/\S*)?)$/;

function phoneError(v: string, required: boolean) {
  const t = v.trim();
  if (!t) return required ? "Enter a phone number we can reach you on." : undefined;
  if (!/^[+\d\s().-]+$/.test(t)) return "Use digits only, with an optional + country code.";
  const digits = t.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "That phone number looks the wrong length.";
  return undefined;
}

function emailError(v: string) {
  const t = v.trim();
  if (!t) return "Enter your email address.";
  if (!EMAIL.test(t)) return "That email address doesn't look right.";
  return undefined;
}

/** The flyer is optional; when present it must be a supported type and small enough. */
export function flyerError(file: { type: string; size: number } | null) {
  if (!file) return undefined;
  if (file.size === 0) return "That file is empty.";
  if (!(FLYER_TYPES as readonly string[]).includes(file.type)) return "Upload a JPG, PNG, WebP or PDF file.";
  if (file.size > FLYER_MAX_BYTES) {
    return `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is ${FLYER_MAX_BYTES / 1024 / 1024} MB.`;
  }
  return undefined;
}

type TextKey = Exclude<keyof InviteValues, "audienceTypes" | "flyer">;

/** `today` is "YYYY-MM-DD"; pass it to reject dates in the past. */
export function validateInvite(v: InviteValues, today?: string): Errors<InviteValues> {
  const e: Errors<InviteValues> = {};
  const t = (s: string) => s.trim();

  if (t(v.fullName).length < 2) e.fullName = "Enter your full name.";
  if (t(v.organization).length < 2) e.organization = "Enter the full name of your ministry or organization.";
  const em = emailError(v.email);
  if (em) e.email = em;
  const pe = phoneError(v.phone, true);
  if (pe) e.phone = pe;
  if (t(v.location).length < 3) e.location = "Enter the physical location of the ministry or organization.";
  if (t(v.social) && !SOCIAL.test(t(v.social))) e.social = "Use a handle like @name or a link to the profile.";

  if (t(v.background).length < 20) e.background = "Give a short background of the ministry or organization (a couple of sentences).";
  if (!t(v.ministrySize)) e.ministrySize = "Tell us the current or average size, e.g. “about 400 members”.";

  if (!ISO_DATE.test(v.dateFrom)) e.dateFrom = "Choose the first day of the event.";
  else if (today && v.dateFrom < today) e.dateFrom = "The start date can't be in the past.";

  if (!ISO_DATE.test(v.dateTo)) e.dateTo = "Choose the last day of the event.";
  else if (ISO_DATE.test(v.dateFrom) && v.dateTo < v.dateFrom) e.dateTo = "The end date must be on or after the start date.";

  if (t(v.topic).length < 3) e.topic = "Tell us the event topic or what you'd like him to speak on.";
  if (t(v.burden).length < 10) e.burden = "Describe the burden or emphasis for the conference.";
  if (!t(v.audienceSize)) e.audienceSize = "Give the estimated or projected audience size, e.g. “about 1,500”.";

  const allowed = new Set<string>(audienceOptions);
  if (v.audienceTypes.length === 0) e.audienceTypes = "Select at least one type of audience.";
  else if (v.audienceTypes.some((a) => !allowed.has(a))) e.audienceTypes = "Choose from the options in the list.";

  if (!/^\d+$/.test(t(v.sessions)) || Number(t(v.sessions)) < 1 || Number(t(v.sessions)) > 50) {
    e.sessions = "Enter the number of sessions (a whole number from 1 to 50).";
  }
  if (t(v.sessionDetails).length < 3) e.sessionDetails = "Give the time and duration per session, e.g. “6:00 pm, 90 minutes”.";

  const fe = flyerError(v.flyer);
  if (fe) e.flyer = fe;

  const limits: [TextKey, number][] = [
    ["fullName", 120],
    ["organization", 200],
    ["email", 200],
    ["phone", 30],
    ["location", 300],
    ["social", 200],
    ["background", 2000],
    ["ministrySize", 120],
    ["topic", 300],
    ["burden", 2000],
    ["audienceSize", 120],
    ["sessions", 4],
    ["sessionDetails", 300],
    ["comments", 3000],
  ];
  for (const [k, max] of limits) {
    if (!e[k] && v[k].length > max) e[k] = `Please keep this under ${max} characters.`;
  }
  return e;
}

export function validateContact(v: ContactValues): Errors<ContactValues> {
  const e: Errors<ContactValues> = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  const em = emailError(v.email);
  if (em) e.email = em;
  const pe = phoneError(v.phone, false);
  if (pe) e.phone = pe;
  if (!contactSubjects.includes(v.subject as (typeof contactSubjects)[number])) e.subject = "Choose a subject.";
  if (v.message.trim().length < 10) e.message = "Write a short message (at least 10 characters).";
  else if (v.message.length > 4000) e.message = "Please keep your message under 4000 characters.";
  return e;
}

export function isoToday() {
  return new Date().toISOString().slice(0, 10);
}
