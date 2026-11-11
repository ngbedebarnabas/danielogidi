export type TeachingCategory =
  | "Apostolic Leadership"
  | "Doctrine"
  | "Leadership Development"
  | "Discipleship"
  | "Missions";

export type TeachingItem = {
  id: string;
  title: string;
  category: TeachingCategory;
  format: "Video" | "Audio" | "Article";
  summary: string;
  /** Duration or reading time, e.g. "48 min" */
  length?: string;
  /** Link to the message (YouTube, podcast, PDF, article…). Leave empty to show "Coming soon". */
  href?: string;
  image: string;
  alt: string;
};

export const teachingThemes = [
  {
    title: "Apostolic Leadership",
    body: "What it means to lead under an apostolic mandate: order, oversight and the coordination of ministry across regions.",
  },
  {
    title: "Doctrinal Foundations",
    body: "Teaching marked by doctrinal accuracy, so that faith stands on understanding as well as zeal.",
  },
  {
    title: "Leadership Formation",
    body: "Building ministers with depth, competence and the practical capacity to serve healthy churches.",
  },
  {
    title: "Discipleship",
    body: "Grassroots discipleship, from the rural mission field and the campus to the local church.",
  },
  {
    title: "Missions & Church Strengthening",
    body: "Taking the message across cultures and strengthening the systems that sustain the church.",
  },
] as const;

/**
 * ⚠️ SAMPLE ENTRIES — replace with real messages.
 * Add an `href` (YouTube, podcast, PDF…) to turn a card from "Coming soon"
 * into a live "Watch / Listen / Read" button.
 */
export const teachings: TeachingItem[] = [
  {
    id: "foundations-apostolic-leadership",
    title: "Foundations of Apostolic Leadership",
    category: "Apostolic Leadership",
    format: "Video",
    summary: "The calling, order and responsibility that shape apostolic oversight in the local and global church.",
    image: "/images/desk-3.jpg",
    alt: "Apostle Daniel Ogidi seated at his desk",
  },
  {
    id: "doctrinal-depth",
    title: "Doctrinal Depth for Today's Minister",
    category: "Doctrine",
    format: "Video",
    summary: "Why doctrinal accuracy matters, and how to build a ministry that stands on sound teaching.",
    image: "/images/ministering-3.jpg",
    alt: "Apostle Daniel Ogidi teaching",
  },
  {
    id: "raising-leaders",
    title: "Raising and Equipping Leaders",
    category: "Leadership Development",
    format: "Audio",
    summary: "A practical framework for identifying, training and releasing leaders for ministry.",
    image: "/images/graduation-1.jpg",
    alt: "Remnant Christian Network Theological Seminary (Adullam) graduates",
  },
  {
    id: "grassroots-discipleship",
    title: "Grassroots Discipleship",
    category: "Discipleship",
    format: "Article",
    summary: "Lessons from the rural mission field and campus ministry on making disciples that last.",
    image: "/images/podium-prayer.jpg",
    alt: "Apostle Daniel Ogidi in prayer at the podium",
  },
  {
    id: "mission-and-church-systems",
    title: "Missions and Strong Church Systems",
    category: "Missions",
    format: "Video",
    summary: "How mission work and healthy church structure reinforce each other across cultures.",
    image: "/images/altar-crowd.jpg",
    alt: "Apostle Daniel Ogidi ministering to a congregation at the altar",
  },
  {
    id: "prayer-and-intercession",
    title: "The Place of Prayer and Intercession",
    category: "Discipleship",
    format: "Audio",
    summary: "How sustained prayer and intercession gave birth to a ministry, and what it still demands.",
    image: "/images/kneeling.jpg",
    alt: "Apostle Daniel Ogidi kneeling in prayer",
  },
];
