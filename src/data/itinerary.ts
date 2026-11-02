export type EventItem = {
  id: string;
  title: string;
  kind: "Conference" | "Leadership Training" | "Mission Outreach" | "Seminary" | "Retreat";
  /** ISO dates, YYYY-MM-DD */
  start: string;
  end: string;
  city: string;
  country: string;
  venue?: string;
  host?: string;
  description: string;
};

/**
 * ⚠️ SAMPLE ENTRIES — replace these with Apostle Daniel's real itinerary.
 * Add, edit or delete objects below; the Itinerary page and the home page
 * update automatically. Events whose end date has passed move to "Past" on
 * their own.
 */
export const events: EventItem[] = [
  {
    id: "apostolic-leadership-conference",
    title: "Apostolic Leadership Conference",
    kind: "Conference",
    start: "2026-12-04",
    end: "2026-12-06",
    city: "Makurdi",
    country: "Nigeria",
    venue: "Venue to be announced",
    host: "Remnant Christian Network",
    description:
      "Three days of doctrinal teaching and leadership impartation for ministers and church leaders.",
  },
  {
    id: "ministers-training-intensive",
    title: "Ministers' Training Intensive",
    kind: "Seminary",
    start: "2027-02-19",
    end: "2027-02-20",
    city: "To be announced",
    country: "",
    host: "Adullam Seminary",
    description:
      "A focused training weekend on doctrine, leadership competence and practical ministry capacity.",
  },
  {
    id: "mission-outreach-church-strengthening",
    title: "Mission Outreach & Church Strengthening",
    kind: "Mission Outreach",
    start: "2027-03-12",
    end: "2027-03-14",
    city: "To be announced",
    country: "",
    host: "Remnant Christian Network",
    description:
      "Outreach, discipleship and the strengthening of local church systems in partnership with host ministries.",
  },
  {
    id: "leadership-development-retreat",
    title: "Leadership Development Retreat",
    kind: "Retreat",
    start: "2027-05-07",
    end: "2027-05-09",
    city: "To be announced",
    country: "",
    description:
      "A retreat for pastors and ministry leaders focused on discipleship, doctrine and healthy church structure.",
  },
];
