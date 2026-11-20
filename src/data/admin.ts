import { contactSubjects } from "@/lib/validation";
import type { EventItem } from "./itinerary";

export type InvitationStatus = "new" | "in_review" | "accepted" | "scheduled" | "declined";

export const statusMeta: Record<InvitationStatus, { label: string; hint: string }> = {
  new: { label: "New", hint: "Not yet looked at" },
  in_review: { label: "In review", hint: "Being considered / waiting on details" },
  accepted: { label: "Accepted", hint: "Agreed, not yet on the itinerary" },
  scheduled: { label: "Scheduled", hint: "Added to the itinerary" },
  declined: { label: "Declined", hint: "Politely declined" },
};

export const statusOrder: InvitationStatus[] = ["new", "in_review", "accepted", "scheduled", "declined"];

export type Note = { id: string; text: string; at: string };

/** Mirrors the invitation form (src/lib/validation.ts) plus what the database will add. */
export type Invitation = {
  /** Which kind of submission this is, the "type" column of the future submissions table. */
  type: "invitation";
  id: string;
  /** ISO datetime */
  receivedAt: string;
  status: InvitationStatus;

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
  /** Uploaded flyer, when there is one */
  flyer?: { name: string; url: string };
  comments: string;

  notes: Note[];
  /** Set once the invitation has been added to the itinerary */
  itinerary?: EventItem;
};

/**
 * ⚠️ SAMPLE DATA, fictional people and ministries used to preview the admin.
 * The admin is frontend-only for now; once submissions are stored in a database
 * this file goes away and the list loads real records instead.
 */
const invitationSeed: Omit<Invitation, "type">[] = [
  {
    id: "inv-1008",
    receivedAt: "2026-11-16T09:12:00Z",
    status: "new",
    fullName: "Pastor Samuel Adeyemi",
    organization: "Grace Chapel International",
    email: "pastor.samuel@example.org",
    phone: "+234 803 555 0142",
    location: "14 Unity Road, Makurdi, Benue State, Nigeria",
    social: "@gracechapelng",
    background:
      "Founded in 2005 with a focus on discipleship and community outreach. We run a Sunday school, a youth ministry and a small bible school for church workers.",
    ministrySize: "About 400 members across 2 branches",
    dateFrom: "2027-03-19",
    dateTo: "2027-03-21",
    topic: "Annual leadership conference: raising doctrinally sound leaders",
    burden:
      "Our leaders are zealous but need doctrinal depth. We want a weekend that builds foundations in teaching, church order and servant leadership.",
    audienceSize: "About 1,200 people",
    audienceTypes: ["Senior Pastors", "Associate Pastors", "Church Workers"],
    sessions: "3",
    sessionDetails: "Fri 6:00 pm (90 min), Sat 9:00 am (2 hrs), Sun 10:00 am (60 min)",
    flyer: { name: "leadership-conference-flyer.jpg", url: "/images/ministering-5.jpg" },
    comments: "We will cover travel and accommodation for two people.",
    notes: [],
  },
  {
    id: "inv-1007",
    receivedAt: "2026-11-14T15:40:00Z",
    status: "new",
    fullName: "Dr. Funmi Okafor",
    organization: "Kingdom Professionals Network",
    email: "funmi@example.com",
    phone: "+234 806 555 0199",
    location: "Plot 22, Garki, Abuja, Nigeria",
    social: "https://instagram.com/kingdomprofessionals",
    background:
      "A fellowship of Christian professionals and business owners meeting monthly in Abuja to pray, network and grow in faith at work.",
    ministrySize: "Around 250 regular attendees",
    dateFrom: "2027-02-06",
    dateTo: "2027-02-06",
    topic: "Faith and excellence in the marketplace",
    burden: "To help professionals live out their calling in business, government service and enterprise.",
    audienceSize: "About 500",
    audienceTypes: ["Corporate Professionals", "Captains of Industries", "Government Officials"],
    sessions: "1",
    sessionDetails: "Saturday 10:00 am, 75 minutes",
    comments: "",
    notes: [],
  },
  {
    id: "inv-1006",
    receivedAt: "2026-11-10T11:05:00Z",
    status: "in_review",
    fullName: "Bishop Emmanuel Tor",
    organization: "Living Streams Fellowship",
    email: "bishop.tor@example.net",
    phone: "+234 809 555 0120",
    location: "Gboko Road, Makurdi, Nigeria",
    social: "",
    background: "A network of 12 churches in the North Central region, planted over 18 years.",
    ministrySize: "12 churches, roughly 3,000 members",
    dateFrom: "2027-05-14",
    dateTo: "2027-05-16",
    topic: "General Overseers' summit on church governance",
    burden:
      "We want to strengthen church systems and succession planning among the overseers in our network and neighbouring fellowships.",
    audienceSize: "About 150 overseers",
    audienceTypes: ["General Overseers", "Senior Pastors"],
    sessions: "4",
    sessionDetails: "Two sessions per day, 2 hours each, 9:00 am and 4:00 pm",
    flyer: { name: "overseers-summit.pdf", url: "/images/altar-crowd.jpg" },
    comments: "Dates are flexible by a week either side.",
    notes: [
      { id: "n1", at: "2026-11-11T08:30:00Z", text: "Called the office. Asked them to confirm whether 14-16 May can move to the following weekend." },
    ],
  },
  {
    id: "inv-1005",
    receivedAt: "2026-11-03T17:22:00Z",
    status: "accepted",
    fullName: "Rev. Grace Ityavyar",
    organization: "Christ Embassy Youth Outreach",
    email: "grace.i@example.org",
    phone: "+234 802 555 0177",
    location: "Federal University campus, Lafia, Nasarawa State",
    social: "@cyoutreach",
    background: "A campus-based youth ministry reaching university students with discipleship and mentoring.",
    ministrySize: "About 600 students",
    dateFrom: "2027-04-02",
    dateTo: "2027-04-04",
    topic: "Campus discipleship retreat",
    burden: "Rooting young believers in doctrine and prayer before they graduate into the workplace.",
    audienceSize: "About 700",
    audienceTypes: ["Believers", "Church Workers"],
    sessions: "3",
    sessionDetails: "Evening sessions, 7:00 pm, 90 minutes each",
    comments: "Apostle Daniel's campus ministry background is the reason we are inviting him.",
    notes: [
      { id: "n2", at: "2026-11-05T10:00:00Z", text: "Office confirmed availability. Waiting on venue details before adding to the itinerary." },
    ],
  },
  {
    id: "inv-1004",
    receivedAt: "2026-10-27T08:50:00Z",
    status: "scheduled",
    fullName: "Pastor David Terkimbi",
    organization: "Remnant Hope Assembly",
    email: "david.t@example.com",
    phone: "+234 810 555 0166",
    location: "Wurukum, Makurdi, Benue State",
    social: "",
    background: "A growing congregation in Makurdi with an active prayer and intercession ministry.",
    ministrySize: "About 300 members",
    dateFrom: "2026-12-04",
    dateTo: "2026-12-06",
    topic: "Apostolic leadership conference",
    burden: "Doctrinal teaching and leadership impartation for ministers and church leaders.",
    audienceSize: "About 900",
    audienceTypes: ["Senior Pastors", "Associate Pastors", "Believers"],
    sessions: "3",
    sessionDetails: "Fri 6:00 pm, Sat 9:00 am, Sun 10:00 am (90 min each)",
    comments: "",
    notes: [{ id: "n3", at: "2026-10-30T14:15:00Z", text: "Confirmed with host. Added to the itinerary." }],
    itinerary: {
      id: "remnant-hope-leadership-conference",
      title: "Apostolic Leadership Conference",
      kind: "Conference",
      start: "2026-12-04",
      end: "2026-12-06",
      city: "Makurdi",
      country: "Nigeria",
      venue: "Remnant Hope Assembly, Wurukum",
      host: "Remnant Hope Assembly",
      description: "Doctrinal teaching and leadership impartation for ministers and church leaders.",
      flyer: { type: "Flyer", photo: "/images/ministering-5.jpg" },
    },
  },
  {
    id: "inv-1003",
    receivedAt: "2026-10-19T13:30:00Z",
    status: "declined",
    fullName: "Mr. Chidi Nwosu",
    organization: "Summit Leadership Forum",
    email: "chidi@example.com",
    phone: "+234 805 555 0103",
    location: "Victoria Island, Lagos, Nigeria",
    social: "",
    background: "A corporate leadership forum organising quarterly talks for executives.",
    ministrySize: "Not a ministry, about 200 members",
    dateFrom: "2026-11-27",
    dateTo: "2026-11-27",
    topic: "Leadership in a changing economy",
    burden: "A secular-style leadership talk for executives with a faith angle.",
    audienceSize: "About 200",
    audienceTypes: ["Corporate Professionals", "Captains of Industries"],
    sessions: "1",
    sessionDetails: "Friday 8:00 am, 45 minutes",
    comments: "",
    notes: [{ id: "n4", at: "2026-10-22T09:00:00Z", text: "Clashes with another engagement. Replied with an apology and invited them to try next year." }],
  },
  {
    id: "inv-1002",
    receivedAt: "2026-10-12T10:10:00Z",
    status: "in_review",
    fullName: "Apostle Joy Aondona",
    organization: "Harvest Ministries Worldwide",
    email: "joy@example.org",
    phone: "+44 7700 900123",
    location: "Birmingham, United Kingdom",
    social: "@harvestmw",
    background: "A diaspora church planted in 2011 serving the Nigerian community in the West Midlands.",
    ministrySize: "About 350 members",
    dateFrom: "2027-06-25",
    dateTo: "2027-06-27",
    topic: "Church strengthening and leadership development",
    burden: "Equipping second-generation leaders and strengthening church systems across cultures.",
    audienceSize: "About 400",
    audienceTypes: ["Senior Pastors", "Associate Pastors", "Church Workers", "Believers"],
    sessions: "4",
    sessionDetails: "Fri evening, Sat morning and afternoon, Sun morning (about 90 min each)",
    comments: "We can sponsor flights from Nigeria. Visa support available.",
    notes: [],
  },
  {
    id: "inv-1001",
    receivedAt: "2026-10-05T07:45:00Z",
    status: "accepted",
    fullName: "Hon. Peter Akaayar",
    organization: "Faith & Governance Initiative",
    email: "peter@example.net",
    phone: "+234 807 555 0188",
    location: "Government House Road, Makurdi, Nigeria",
    social: "",
    background: "A non-partisan initiative helping believers in public service engage responsibly and prayerfully.",
    ministrySize: "About 120 participants",
    dateFrom: "2027-01-23",
    dateTo: "2027-01-23",
    topic: "Political readiness for believers",
    burden: "Preparing believers and young leaders to take up civic responsibility with conviction and integrity.",
    audienceSize: "About 300",
    audienceTypes: ["Politicians", "Government Officials", "Believers"],
    sessions: "2",
    sessionDetails: "Saturday 10:00 am and 2:00 pm, 60 minutes each",
    comments: "",
    notes: [],
  },
];

export const sampleInvitations: Invitation[] = invitationSeed.map((i) => ({ type: "invitation" as const, ...i }));

/* ------------------------------------------------------------------ */
/* Contact-form messages                                               */
/* ------------------------------------------------------------------ */

export type MessageStatus = "new" | "replied" | "archived";

export const messageStatusMeta: Record<MessageStatus, { label: string; hint: string }> = {
  new: { label: "New", hint: "Not yet answered" },
  replied: { label: "Replied", hint: "We have responded" },
  archived: { label: "Archived", hint: "Done, spam or no reply needed" },
};

export const messageStatusOrder: MessageStatus[] = ["new", "replied", "archived"];

/** Mirrors the contact form (src/lib/validation.ts). */
export type Message = {
  type: "message";
  id: string;
  /** ISO datetime */
  receivedAt: string;
  status: MessageStatus;

  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;

  notes: Note[];
};

/** Everything the website's forms produce. In the database this is one table with a `type` column. */
export type Submission = Invitation | Message;

/** Subjects whose messages can contain personal or pastoral details. */
export const sensitiveSubjects: string[] = ["Prayer & counsel"];

const seminary = contactSubjects[3]; // "Remnant Christian Network Theological Seminary (Adullam)"

/**
 * ⚠️ SAMPLE DATA, fictional senders. Replaced by real records once the database exists.
 */
const messageSeed: Omit<Message, "type">[] = [
  {
    id: "msg-2008",
    receivedAt: "2026-11-17T08:20:00Z",
    status: "new",
    name: "Tolu Bankole",
    email: "tolu@example.com",
    phone: "+234 803 555 0111",
    subject: "Media & press",
    message:
      "Hello, I write for a faith and leadership magazine. We would love to feature Apostle Daniel in our January issue, with a 20-minute interview about apostolic leadership and training the next generation of ministers. Could you share who handles media requests, and his availability in the next three weeks?",
    notes: [],
  },
  {
    id: "msg-2007",
    receivedAt: "2026-11-15T19:05:00Z",
    status: "new",
    name: "Terhemba Iorfa",
    email: "terhemba.i@example.org",
    phone: "",
    subject: seminary,
    message:
      "Good day. I would like to enrol for the next intake. What are the admission requirements, the fees, and are classes available online for someone living outside Benue State?",
    notes: [],
  },
  {
    id: "msg-2006",
    receivedAt: "2026-11-12T12:40:00Z",
    status: "replied",
    name: "Mercy A.",
    email: "mercy.a@example.net",
    phone: "",
    subject: "Prayer & counsel",
    message:
      "I am going through a very difficult season in my marriage and would be grateful for prayer and, if possible, a conversation with one of the pastors. Please treat this privately.",
    notes: [{ id: "m1", at: "2026-11-13T09:30:00Z", text: "Passed to the pastoral team. Pastor called her the same day." }],
  },
  {
    id: "msg-2005",
    receivedAt: "2026-11-09T14:10:00Z",
    status: "replied",
    name: "Rev. Paul Ugbede",
    email: "paul.ugbede@example.com",
    phone: "+234 806 555 0132",
    subject: "Ministry partnership",
    message:
      "Our church would like to partner with the ministry in its mission outreaches. We can mobilise volunteers and a modest monthly gift. Who should we speak to about how partnership works?",
    notes: [{ id: "m2", at: "2026-11-10T11:00:00Z", text: "Replied with the Partnership page link and offered a call on Friday." }],
  },
  {
    id: "msg-2004",
    receivedAt: "2026-11-04T09:55:00Z",
    status: "new",
    name: "Chinedu Okeke",
    email: "chinedu.o@example.com",
    phone: "",
    subject: "General enquiry",
    message: "Hi, how can I get on the mailing list for upcoming conferences, and are the services streamed online?",
    notes: [],
  },
  {
    id: "msg-2003",
    receivedAt: "2026-10-28T16:25:00Z",
    status: "archived",
    name: "Growth Rank Pro",
    email: "offers@example.biz",
    phone: "",
    subject: "Something else",
    message: "We can put your website on the first page of Google in 7 days! Reply for our packages and pricing.",
    notes: [{ id: "m3", at: "2026-10-29T08:00:00Z", text: "Spam. Archived." }],
  },
  {
    id: "msg-2002",
    receivedAt: "2026-10-21T10:15:00Z",
    status: "archived",
    name: "Grace Terna",
    email: "grace.t@example.org",
    phone: "+234 805 555 0166",
    subject: "General enquiry",
    message: "Thank you so much for the teaching at the leadership summit. It was a blessing to our whole team!",
    notes: [],
  },
  {
    id: "msg-2001",
    receivedAt: "2026-10-14T13:45:00Z",
    status: "replied",
    name: "Samuel Ajegbe",
    email: "samuel.a@example.net",
    phone: "",
    subject: "Media & press",
    message: "May we use a few photos from the website in our church newsletter? We will credit the ministry.",
    notes: [],
  },
];

export const sampleMessages: Message[] = messageSeed.map((m) => ({ type: "message" as const, ...m }));

export const sampleSubmissions: Submission[] = [...sampleInvitations, ...sampleMessages];
