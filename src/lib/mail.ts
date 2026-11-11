type Attachment = { filename: string; content: Buffer; type: string };

type Mail = {
  subject: string;
  text: string;
  replyTo: string;
  attachments?: Attachment[];
};

export type MailResult = { ok: true; delivered: boolean } | { ok: false };

/**
 * Sends the enquiry to the ministry inbox through Resend's REST API.
 * Set RESEND_API_KEY, MAIL_FROM and MAIL_TO (see .env.example).
 *
 * Without those keys, development just logs the message so the form can be
 * tried locally; production reports failure instead of silently dropping it.
 */
export async function sendMail({ subject, text, replyTo, attachments = [] }: Mail): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!key || !from || !to) {
    if (process.env.NODE_ENV !== "production") {
      const files = attachments.map((a) => `${a.filename} (${a.type}, ${Math.round(a.content.length / 1024)} KB)`);
      console.log(
        `\n[mail:dev] Not configured, logging instead.\nSubject: ${subject}\nReply-To: ${replyTo}\nAttachments: ${files.join(", ") || "none"}\n\n${text}\n`,
      );
      return { ok: true, delivered: false };
    }
    console.error("[mail] RESEND_API_KEY / MAIL_FROM / MAIL_TO are not set.");
    return { ok: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      text,
      ...(attachments.length
        ? { attachments: attachments.map((a) => ({ filename: a.filename, content: a.content.toString("base64") })) }
        : {}),
    }),
  });

  if (!res.ok) {
    console.error("[mail] Resend error", res.status, await res.text());
    return { ok: false };
  }
  return { ok: true, delivered: true };
}
