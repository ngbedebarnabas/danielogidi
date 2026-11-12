export const site = {
  name: "Apostle Daniel Ogidi",
  role: "International Director, Remnant Christian Network",
  tagline: "Equipping leaders. Strengthening the church.",
  description:
    "Apostle Daniel Ogidi is International Director of Remnant Christian Network and pioneer President of Remnant Christian Network Theological Seminary (Adullam), with over 37 years of apostolic leadership, doctrinal teaching, leadership development and global missions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Fill these in when you have them. Empty values are hidden from the site.
  contact: {
    email: "",
    phone: "",
    location: "",
  },
  socials: {
    facebook: "",
    youtube: "",
    instagram: "",
    x: "",
  },

  nav: [
    { href: "/about", label: "About" },
    { href: "/itinerary", label: "Itinerary" },
    { href: "/teachings", label: "Teachings" },
    { href: "/partnership", label: "Partnership" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const stats = [
  { value: 37, suffix: "+", label: "Years in active ministry", count: true },
  { value: "2007", label: "Pioneer member, Remnant Christian Network" },
  { value: "2013", label: "Ordained into apostolic office" },
  { value: "2015", label: "Remnant Christian Network Theological Seminary (Adullam) established" },
] as const;

export const pillars = [
  {
    title: "Apostolic Leadership",
    body: "Oversight of international operations, ministry expansion and leadership coordination across multiple regions.",
    image: "/images/desk-3.jpg",
    alt: "Apostle Daniel Ogidi seated at a desk in front of a library of books",
  },
  {
    title: "Doctrinal Teaching",
    body: "A steady emphasis on doctrinal accuracy, giving ministers and believers depth of understanding they can build a life and a church on.",
    image: "/images/ministering-3.jpg",
    alt: "Apostle Daniel Ogidi teaching with a microphone",
  },
  {
    title: "Leadership Development",
    body: "Raising equipped leaders through structured training, discipleship and the practical capacity to run healthy churches.",
    image: "/images/graduation-1.jpg",
    alt: "Remnant Christian Network Theological Seminary (Adullam) graduates and faculty in academic regalia",
  },
  {
    title: "Global Missions",
    body: "Conferences, leadership trainings and mission outreaches across nations, in diverse cultural and ecclesiastical settings.",
    image: "/images/altar-crowd.jpg",
    alt: "Apostle Daniel Ogidi praying with a congregation at the altar",
  },
  {
    title: "Equipping for the Marketplace",
    body: "Preparing believers to carry their faith, calling and character into business, work and enterprise.",
    image: "/images/desk-1.jpg",
    alt: "Apostle Daniel Ogidi seated at his desk in a business suit, hands clasped",
  },
  {
    title: "Political Readiness",
    body: "Raising believers and leaders who are ready to engage public life and civic responsibility with conviction and integrity.",
    image: "/images/ministering-4.jpg",
    alt: "Apostle Daniel Ogidi standing at a lectern with a microphone",
  },
] as const;

export const values = [
  "Doctrine",
  "Discipleship",
  "Leadership",
  "Missions",
  "Prayer",
  "Apostolic Order",
] as const;

export const timeline = [
  {
    years: "1997 – 2000",
    title: "Rural mission church",
    body: "Pastoral service in a rural mission church, where grassroots discipleship first took root.",
  },
  {
    years: "2004 – 2009",
    title: "Campus ministry",
    body: "Sustained involvement in campus ministry, investing in evangelism and the formation of young leaders.",
  },
  {
    years: "2007",
    title: "Remnant Christian Network begins",
    body: "A pioneering member at the inception of the ministry in Makurdi, Benue State, following a sustained period of prayer and intercession.",
  },
  {
    years: "2010",
    title: "Ministry Administrator",
    body: "Took on administrative oversight as the ministry grew.",
  },
  {
    years: "2013",
    title: "Ordained into apostolic office",
    body: "Formally ordained into the apostolic office.",
  },
  {
    years: "2015",
    title: "Remnant Christian Network Theological Seminary (Adullam) established",
    body: "Led the founding of the Remnant Christian Network Theological Seminary (Adullam) under Apostle Arome Osayi, and became its pioneer President.",
  },
  {
    years: "2021",
    title: "International Director",
    body: "Appointed International Director, overseeing international operations, ministry expansion and leadership coordination across regions.",
  },
] as const;
