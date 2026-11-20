import { ChevronDown } from "../icons";
import {
  messageStatusMeta,
  messageStatusOrder,
  statusMeta,
  statusOrder,
  type InvitationStatus,
  type MessageStatus,
} from "@/data/admin";

export const statusStyle: Record<InvitationStatus, { pill: string; dot: string }> = {
  new: { pill: "bg-gold/25 text-gold-ink", dot: "bg-gold" },
  in_review: { pill: "bg-sky-500/15 text-sky-700 dark:text-sky-300", dot: "bg-sky-500" },
  accepted: { pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  scheduled: { pill: "bg-violet-500/15 text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
  declined: { pill: "bg-rose-500/15 text-rose-700 dark:text-rose-300", dot: "bg-rose-500" },
};

export function StatusBadge({ status }: { status: InvitationStatus }) {
  const s = statusStyle[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${s.pill}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {statusMeta[status].label}
    </span>
  );
}

/** A native <select> styled like the badge, so it stays accessible and works on touch. */
export function StatusSelect({
  value,
  onChange,
  label = "Status",
}: {
  value: InvitationStatus;
  onChange: (next: InvitationStatus) => void;
  label?: string;
}) {
  const s = statusStyle[value];
  return (
    <span className="relative inline-flex">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as InvitationStatus)}
        className={`cursor-pointer appearance-none rounded-full py-1.5 pr-8 pl-3.5 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${s.pill}`}
      >
        {statusOrder.map((o) => (
          <option key={o} value={o} className="bg-panel text-fg">
            {statusMeta[o].label}
          </option>
        ))}
      </select>
      <ChevronDown width={14} height={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
    </span>
  );
}

export const messageStatusStyle: Record<MessageStatus, { pill: string; dot: string }> = {
  new: { pill: "bg-gold/25 text-gold-ink", dot: "bg-gold" },
  replied: { pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  archived: { pill: "bg-fg/10 text-muted", dot: "bg-fg/40" },
};

export function MessageStatusBadge({ status }: { status: MessageStatus }) {
  const s = messageStatusStyle[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${s.pill}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {messageStatusMeta[status].label}
    </span>
  );
}

export function MessageStatusSelect({
  value,
  onChange,
  label = "Status",
}: {
  value: MessageStatus;
  onChange: (next: MessageStatus) => void;
  label?: string;
}) {
  const s = messageStatusStyle[value];
  return (
    <span className="relative inline-flex">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as MessageStatus)}
        className={`cursor-pointer appearance-none rounded-full py-1.5 pr-8 pl-3.5 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${s.pill}`}
      >
        {messageStatusOrder.map((o) => (
          <option key={o} value={o} className="bg-panel text-fg">
            {messageStatusMeta[o].label}
          </option>
        ))}
      </select>
      <ChevronDown width={14} height={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
    </span>
  );
}
