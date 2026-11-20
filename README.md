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
| `/partnership` | Give online (Flutterwave) and bank-transfer details |
| `/invite` | Event invitation form: ministry background and size, event dates, topic, burden, audience size and types (multi-select), sessions, session times, optional flyer upload |
| `/contact` | General contact form |
| `/admin` | **Frontend-only preview** of the invitations dashboard (sample data; see below) |

## Editing content (no component changes needed)

Everything editable lives in `src/data/`:

- `site.ts`: name, tagline, **contact email / phone / location** (empty values are hidden), the `socialLinks` list (shown in the footer and on the Contact page), stats, ministry areas, timeline
- `itinerary.ts`: events and their flyers (**sample entries**; replace them). Each event can have a `flyer` block: set `image` to real artwork in `public/flyers/` (e.g. `/flyers/conference.jpg`), or leave it out and a designed flyer is generated from the event text and a `photo`
- `teachings.ts`: the teaching library: YouTube playlists from the @ogididan channel, grouped into tabs by `category` (tab order in `teachingCategories`). Add an entry with an `href` (and the `youtubeThumb` video ID for the thumbnail); entries without an `href` show "Coming soon"
- `partnership.ts`: the online-giving link and the **bank accounts** shown on the Partnership page (add one object per account; each gets a copy button)
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

## Admin (preview)

`/admin` is a frontend-only dashboard for everything the website's forms produce. Invitations and contact-page messages
live in **one list with a `type` column** (`invitation` | `message`), exactly like the future database table.

- **Invitations tab:** searchable list with status (New → In review → Accepted → Scheduled / Declined), notes, and an
  **Add to itinerary** action that pre-fills an event from the invitation and gives you the entry to paste into
  `src/data/itinerary.ts`.
- **Messages tab:** from the contact form. Status New / Replied / Archived, search, subject filter, notes, a one-click
  "Reply by email" (opens your mail app with the original quoted) and "Mark replied". "Prayer & counsel" messages are
  flagged **Sensitive**.
- It runs on **sample data** (`src/data/admin.ts`) and saves edits only in the browser (`src/lib/admin-store.ts`).
- There is **no login yet**, so it is available only in development. A production build returns a 404 for `/admin`
  unless `ADMIN_PREVIEW=1` is set. Do not enable that on a public site with real data.
- It is excluded from the sitemap and `robots.txt`, and marked `noindex`.
- Next step: store real submissions in a database (one `submissions` table with a `type` column), add authentication,
  and replace `admin-store.ts` with API calls.
