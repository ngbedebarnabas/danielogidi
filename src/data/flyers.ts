export type FlyerItem = {
  id: string;
  type: "Flyer" | "Invitation";
  title: string;
  /** Short line under the title, e.g. the theme of the event */
  subtitle?: string;
  /** Display date, e.g. "4 – 6 December 2026" */
  date: string;
  location: string;
  host?: string;
  /**
   * Path to the real flyer artwork, e.g. "/flyers/apostolic-conference.jpg"
   * (drop the file into /public/flyers). When omitted, a designed flyer is
   * generated automatically from the fields here and `photo`.
   */
  image?: string;
  /** Background photo used by the generated flyer */
  photo: string;
  /** Focal point for the photo, CSS object-position */
  focus?: string;
};

/**
 * ⚠️ SAMPLE ENTRIES — replace with real flyers and invitations.
 */
export const flyers: FlyerItem[] = [
  {
    id: "apostolic-leadership-conference",
    type: "Flyer",
    title: "Apostolic Leadership Conference",
    subtitle: "Doctrine · Leadership · Mission",
    date: "4 – 6 December 2026",
    location: "Makurdi, Nigeria",
    host: "Remnant Christian Network",
    photo: "/images/ministering-5.jpg",
    focus: "35% 40%",
  },
  {
    id: "ministers-training-intensive-invite",
    type: "Invitation",
    title: "Ministers' Training Intensive",
    subtitle: "Hosted by Adullam Seminary",
    date: "19 – 20 February 2027",
    location: "Venue to be announced",
    host: "Adullam Seminary",
    photo: "/images/about-seminary.jpg",
    focus: "50% 25%",
  },
  {
    id: "mission-outreach",
    type: "Flyer",
    title: "Mission Outreach & Church Strengthening",
    subtitle: "Discipleship · Outreach",
    date: "12 – 14 March 2027",
    location: "To be announced",
    host: "Remnant Christian Network",
    photo: "/images/altar-crowd.jpg",
    focus: "80% 40%",
  },
  {
    id: "leadership-retreat-invite",
    type: "Invitation",
    title: "Leadership Development Retreat",
    subtitle: "For pastors and ministry leaders",
    date: "7 – 9 May 2027",
    location: "To be announced",
    photo: "/images/about-portrait.jpg",
    focus: "50% 25%",
  },
];
