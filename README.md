# Apostle Daniel Ogidi: personal website

Next.js 16 (App Router) · Tailwind CSS 4 · Framer Motion · Lenis smooth scrolling.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, stats, intro, themes ticker, ministry areas, the seminary, itinerary / teachings previews, photo gallery, invite CTA |
| `/about` | Full bio, role cards, animated timeline, Remnant Christian Network Theological Seminary (Adullam) |
| `/itinerary` | Upcoming / past engagements, each with its flyer or invitation (tap to enlarge) and "Add to Google Calendar". `/flyers` redirects here |
| `/teachings` | Themes + filterable teaching library |
| `/invite` | Event invitation form: ministry background and size, event dates, topic, burden, audience size and types (multi-select), sessions, session times, optional flyer upload |
| `/contact` | General contact form |

## Editing content (no component changes needed)

Everything editable lives in `src/data/`:

- `site.ts`: name, tagline, **contact email / phone / location and social links** (empty values are hidden), stats, ministry areas, timeline
- `itinerary.ts`: events and their flyers (**sample entries**; replace them). Each event can have a `flyer` block: set `image` to real artwork in `public/flyers/` (e.g. `/flyers/conference.jpg`), or leave it out and a designed flyer is generated from the event text and a `photo`
- `teachings.ts`: teaching library (**sample entries**). Add an `href` to turn "Coming soon" into a Watch / Listen / Read button
- `gallery.ts`: gallery photos (files in `public/images/`)

Events move from Upcoming to Past automatically once their end date passes (the page refreshes hourly).

## Forms → email

Both forms POST (multipart) to `/api/enquiry`, which validates on the server and emails the ministry inbox via
[Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`,
`MAIL_FROM` (a sender on a domain verified in Resend) and `MAIL_TO`.

An uploaded flyer (JPG, PNG, WebP or PDF, up to 4 MB, checked by its real contents) is attached to the invitation email.

Without those keys, `npm run dev` just prints each submission to the terminal; a production build returns an
error to the visitor instead of silently dropping messages.

## Images

Optimised copies of the photos in `images/` live in `public/images/`. The original `images/` folder is not
used by the app and can be moved out of the repo.
