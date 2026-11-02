// Shared by the forms (client) and the API route (server).

export type InviteValues = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  social: string;
  topic: string;
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
  "Adullam Seminary",
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

  if (!ISO_DATE.test(v.dateFrom)) e.dateFrom = "Choose the first day of the event.";
  else if (today && v.dateFrom < today) e.dateFrom = "The start date can't be in the past.";

  if (!ISO_DATE.test(v.dateTo)) e.dateTo = "Choose the last day of the event.";
  else if (ISO_DATE.test(v.dateFrom) && v.dateTo < v.dateFrom) e.dateTo = "The end date must be on or after the start date.";

  if (t(v.social) && !SOCIAL.test(t(v.social))) e.social = "Use a handle like @name or a link to the profile.";
  if (t(v.topic).length < 3) e.topic = "Tell us the event topic or what you'd like him to speak on.";

  const limits: [keyof InviteValues, number][] = [
    ["fullName", 120],
    ["organization", 200],
    ["email", 200],
    ["phone", 30],
    ["location", 300],
    ["social", 200],
    ["topic", 300],
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
