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

function pick<T extends string>(body: Record<string, unknown>, keys: readonly T[]) {
  return Object.fromEntries(keys.map((k) => [k, clean(body[k])])) as Record<T, string>;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  if (body.kind === "invite") {
    const v: InviteValues = pick(body, [
      "fullName", "organization", "email", "phone", "location",
      "dateFrom", "dateTo", "social", "topic", "comments", "website",
    ] as const);
    const errors = validateInvite(v, isoToday());
    if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

    const sent = await sendMail({
      subject: `Event invitation: ${oneLine(v.organization)} (${v.dateFrom} to ${v.dateTo})`,
      replyTo: v.email,
      text: [
        "NEW EVENT INVITATION",
        "",
        `Full name: ${v.fullName}`,
        `Ministry / Organization: ${v.organization}`,
        `Email: ${v.email}`,
        `Phone: ${v.phone}`,
        `Location: ${v.location}`,
        `Event dates: ${v.dateFrom} to ${v.dateTo}`,
        `Social media: ${v.social || "(not provided)"}`,
        `Topic: ${v.topic}`,
        "",
        "Other comments:",
        v.comments || "(none)",
      ].join("\n"),
    });
    return respond(sent);
  }

  if (body.kind === "contact") {
    const v: ContactValues = pick(body, ["name", "email", "phone", "subject", "message", "website"] as const);
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
