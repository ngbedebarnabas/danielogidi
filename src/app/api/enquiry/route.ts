import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import {
  isoToday,
  validateContact,
  validateInvite,
  type ContactValues,
  type InviteValues,
} from "@/lib/validation";

const clean = (s: unknown) => (typeof s === "string" ? s.replace(/\r/g, "").trim() : "");
const oneLine = (s: string) => s.replace(/\s+/g, " ").slice(0, 120);

function pick<T extends string>(form: FormData, keys: readonly T[]) {
  return Object.fromEntries(keys.map((k) => [k, clean(form.get(k))])) as Record<T, string>;
}

/** Real file type from the first bytes: the browser-reported MIME type can be spoofed. */
function sniff(bytes: Buffer): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (bytes.subarray(0, 4).toString("latin1") === "RIFF" && bytes.subarray(8, 12).toString("latin1") === "WEBP") return "image/webp";
  if (bytes.subarray(0, 5).toString("latin1") === "%PDF-") return "application/pdf";
  return null;
}

const safeName = (name: string) =>
  name.replace(/[^\w.\- ]+/g, "_").replace(/\.{2,}/g, ".").trim().slice(0, 100) || "flyer";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(form.get("website"))) return NextResponse.json({ ok: true });

  const kind = clean(form.get("kind"));

  if (kind === "invite") {
    const text = pick(form, [
      "fullName", "organization", "email", "phone", "location", "social", "background", "ministrySize",
      "dateFrom", "dateTo", "topic", "burden", "audienceSize", "sessions", "sessionDetails", "comments", "website",
    ] as const);
    const upload = form.get("flyer");
    const file = upload instanceof File && upload.size > 0 ? upload : null;

    const v: InviteValues = {
      ...text,
      audienceTypes: form.getAll("audienceTypes").map(clean).filter(Boolean),
      flyer: file,
    };
    const errors = validateInvite(v, isoToday());

    // Check the file's real contents, not just its declared type.
    let bytes: Buffer | null = null;
    let fileType: string | null = null;
    if (file && !errors.flyer) {
      bytes = Buffer.from(await file.arrayBuffer());
      fileType = sniff(bytes);
      if (!fileType) errors.flyer = "That doesn't look like a valid JPG, PNG, WebP or PDF file.";
    }
    if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

    const sent = await sendMail({
      subject: `Event invitation: ${oneLine(v.organization)} (${v.dateFrom} to ${v.dateTo})`,
      replyTo: v.email,
      text: [
        "NEW EVENT INVITATION",
        "",
        "ABOUT THE INVITER",
        `Full name: ${v.fullName}`,
        `Ministry / Organization: ${v.organization}`,
        `Email: ${v.email}`,
        `Phone: ${v.phone}`,
        `Location: ${v.location}`,
        `Social media: ${v.social || "(not provided)"}`,
        "",
        "Background of the ministry / organization:",
        v.background,
        "",
        `Current / average size: ${v.ministrySize}`,
        "",
        "THE EVENT",
        `Event dates: ${v.dateFrom} to ${v.dateTo}`,
        `Topic: ${v.topic}`,
        "",
        "Burden / emphasis for the conference:",
        v.burden,
        "",
        `Estimated / projected audience size: ${v.audienceSize}`,
        `Type of audience: ${v.audienceTypes.join(", ")}`,
        `Number of sessions to minister: ${v.sessions}`,
        `Time & duration per session: ${v.sessionDetails}`,
        `Flyer: ${file ? `attached (${safeName(file.name)})` : "(not provided)"}`,
        "",
        "Other comments:",
        v.comments || "(none)",
      ].join("\n"),
      attachments: bytes && fileType && file ? [{ filename: safeName(file.name), content: bytes, type: fileType }] : [],
    });
    return respond(sent);
  }

  if (kind === "contact") {
    const v: ContactValues = pick(form, ["name", "email", "phone", "subject", "message", "website"] as const);
    const errors = validateContact(v);
    if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

    const sent = await sendMail({
      subject: `Website message: ${v.subject} (${oneLine(v.name)})`,
      replyTo: v.email,
      text: [
        "NEW WEBSITE MESSAGE",
        "",
        `Name: ${v.name}`,
        `Email: ${v.email}`,
        `Phone: ${v.phone || "(not provided)"}`,
        `Subject: ${v.subject}`,
        "",
        v.message,
      ].join("\n"),
    });
    return respond(sent);
  }

  return NextResponse.json({ ok: false, message: "Unknown request." }, { status: 400 });
}

function respond(sent: Awaited<ReturnType<typeof sendMail>>) {
  if (!sent.ok) {
    return NextResponse.json(
      { ok: false, message: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
