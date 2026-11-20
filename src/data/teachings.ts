/** Tab order on the Teachings page. Only categories that have items appear. */
export const teachingCategories = [
  "Ministry Training",
  "Marketplace & Public Life",
  "Doctrine & Bible Study",
  "Messages & Q&A",
  "Audio Sermons",
  "Missions",
  "Shorts & Reels",
] as const;

export type TeachingCategory = (typeof teachingCategories)[number];

export type TeachingItem = {
  id: string;
  title: string;
  category: TeachingCategory;
  format: "Video" | "Audio" | "Article" | "Playlist";
  summary: string;
  /** Duration, reading time or size, e.g. "48 min" or "29 videos" */
  length?: string;
  /** Link to the teaching (YouTube playlist, podcast, PDF, article…). Leave empty to show "Coming soon". */
  href?: string;
  /** YouTube video ID whose thumbnail represents the playlist/video. Falls back to `image`. */
  youtubeThumb?: string;
  /** Local photo used when there is no YouTube thumbnail */
  image: string;
  alt: string;
};

/** Canonical playlist link (drops the tracking `si=` parameter). */
const playlist = (id: string) => `https://www.youtube.com/playlist?list=${id}`;

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
 * The teaching library: YouTube playlists from the @ogididan channel, grouped into
 * the tabs above by what they contain. Add an entry (or change `category`) and the
 * page updates. Video counts are as of November 2026.
 */
export const teachings: TeachingItem[] = [
  {
    id: "rcn-school-of-ministry",
    title: "RCN School of Ministry",
    category: "Ministry Training",
    format: "Playlist",
    summary: "Training sessions from the Remnant Christian Network School of Ministry, equipping ministers and church workers.",
    length: "29 videos",
    href: playlist("PLcK1W19xjB3Y"),
    youtubeThumb: "3ydkKSYEU2g",
    image: "/images/graduation-1.jpg",
    alt: "RCN School of Ministry playlist",
  },
  {
    id: "apostles-in-the-marketplace",
    title: "Apostles In the Marketplace",
    category: "Marketplace & Public Life",
    format: "Playlist",
    summary: "Teaching on the apostle in the public place: carrying your calling and character into work, business and public life.",
    length: "24 videos",
    href: playlist("PLPfH8gUKalaTQzRokp3NJsT7x3S1crbXx"),
    youtubeThumb: "3Lyb62CbNgU",
    image: "/images/desk-1.jpg",
    alt: "Apostles In the Marketplace playlist",
  },
  {
    id: "apostolic-college-2026",
    title: "Apostolic College 2026",
    category: "Ministry Training",
    format: "Playlist",
    summary: "Sessions from the 2026 Apostolic College.",
    length: "23 videos",
    href: playlist("PLPfH8gUKalaRDY0MxiwR0p_xHOGIrwJvy"),
    youtubeThumb: "i_XSNqLDclw",
    image: "/images/about-seminary.jpg",
    alt: "Apostolic College 2026 playlist",
  },
  {
    id: "apostolic-college-2025",
    title: "Apostolic College 2025",
    category: "Ministry Training",
    format: "Playlist",
    summary: "Sessions from the 2025 Apostolic College.",
    length: "14 videos",
    href: playlist("PLPfH8gUKalaTT02Co_X-keicQF92LR5Qp"),
    youtubeThumb: "upjrZzK6vQg",
    image: "/images/graduation-2.jpg",
    alt: "Apostolic College 2025 playlist",
  },
  {
    id: "gospel-implication-application",
    title: "The Gospel: Its Implication and Application & The Ongoing Works of Christ",
    category: "Doctrine & Bible Study",
    format: "Playlist",
    summary: "Teaching on the gospel, its implication and application, and the ongoing works of Christ (March 2026 contact).",
    length: "13 videos",
    href: playlist("PLPfH8gUKalaRt_qgZhrQYGa2XTETldhsK"),
    youtubeThumb: "_3kUKPpw_VM",
    image: "/images/ministering-3.jpg",
    alt: "The Gospel playlist",
  },
  {
    id: "deliverance-evangelism-bible-study",
    title: "Deliverance, Evangelism and Bible Study",
    category: "Doctrine & Bible Study",
    format: "Playlist",
    summary: "Teaching on deliverance, evangelism and the study of the Bible.",
    length: "13 videos",
    href: playlist("PLPfH8gUKalaRuP0t48QQ1T-LfY7ApDhgd"),
    youtubeThumb: "I1bfzRCRHbg",
    image: "/images/podium-prayer.jpg",
    alt: "Deliverance, Evangelism and Bible Study playlist",
  },
  {
    id: "qa-with-apostle-daniel-ogidi",
    title: "Q & A with Apostle Daniel Ogidi",
    category: "Messages & Q&A",
    format: "Playlist",
    summary: "Apostle Daniel responds to questions on faith, ministry and Christian living.",
    length: "13 videos",
    href: playlist("PLPfH8gUKalaRd4EsGeA8Q25SHkddP5-Mj"),
    youtubeThumb: "VQpSATPtTIY",
    image: "/images/ministering-1.jpg",
    alt: "Q & A with Apostle Daniel Ogidi playlist",
  },
  {
    id: "apostle-daniel-ogidis-ministrations",
    title: "Apostle Daniel Ogidi's Ministrations",
    category: "Messages & Q&A",
    format: "Playlist",
    summary: "A growing library of Apostle Daniel's messages and ministrations.",
    length: "154 videos",
    href: playlist("PLPfH8gUKalaTqrsQl5BlyP02P8qauxKHh"),
    youtubeThumb: "PHgeWi85ZMc",
    image: "/images/ministering-5.jpg",
    alt: "Apostle Daniel Ogidi's Ministrations playlist",
  },
  {
    id: "audio-sermons",
    title: "Audio Sermons",
    category: "Audio Sermons",
    format: "Audio",
    summary: "Audio sermons by Apostle Daniel Ogidi, to listen to on Telegram wherever you are.",
    length: "Telegram",
    href: "https://t.me/reverenddanogidi",
    image: "/images/ministering-4.jpg",
    alt: "Apostle Daniel Ogidi at a lectern with a microphone",
  },
  {
    id: "apostle-dan-at-rcn-kenya",
    title: "Apostle Dan at RCN Kenya",
    category: "Missions",
    format: "Playlist",
    summary: "Apostle Dan ministering at Remnant Christian Network Kenya.",
    length: "7 videos",
    href: playlist("PLVlPesUqdqLw"),
    youtubeThumb: "5SWjCuPSCxg",
    image: "/images/altar-crowd.jpg",
    alt: "Apostle Dan at RCN Kenya playlist",
  },
  {
    id: "shorts-reels",
    title: "Shorts Reels",
    category: "Shorts & Reels",
    format: "Playlist",
    summary: "Short clips and reels from the ministry, made for quick watching and sharing.",
    length: "70 videos",
    href: playlist("PLPfH8gUKalaTSXgMdFztzcpbHprfQV86i"),
    youtubeThumb: "tAN4ArhQlv0",
    image: "/images/hero-stage-2.jpg",
    alt: "Shorts Reels playlist",
  },
];
