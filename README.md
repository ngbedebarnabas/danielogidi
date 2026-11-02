# Apostle Daniel Ogidi: personal website

Next.js 16 (App Router) · Tailwind CSS 4 · Framer Motion · Lenis smooth scrolling.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, stats, intro, themes ticker, ministry areas, Adullam, itinerary / flyers / teachings previews, photo gallery, invite CTA |
| `/about` | Full bio, role cards, animated timeline, Adullam seminary |
| `/itinerary` | Upcoming / past engagements with "Add to Google Calendar" |
| `/flyers` | Flyers & invitations with filter and full-size viewer |
| `/teachings` | Themes + filterable teaching library |
| `/invite` | Event invitation form (all requested fields) |
| `/contact` | General contact form |

## Editing content (no component changes needed)

Everything editable lives in `src/data/`:

- `site.ts`: name, tagline, **contact email / phone / location and social links** (empty values are hidden), stats, ministry areas, timeline
- `itinerary.ts`: events (**sample entries**; replace them)
- `flyers.ts`: flyers & invitations (**sample entries**). Put real artwork in `public/flyers/` and set `image`; without `image`, a designed flyer is generated from the text and a photo
- `teachings.ts`: teaching library (**sample entries**). Add an `href` to turn "Coming soon" into a Watch / Listen / Read button
- `gallery.ts`: gallery photos (files in `public/images/`)

Events move from Upcoming to Past automatically once their end date passes (the page refreshes hourly).

## Forms → email

Both forms POST to `/api/enquiry`, which validates on the server and emails the ministry inbox via
[Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`,
`MAIL_FROM` (a sender on a domain verified in Resend) and `MAIL_TO`.

Without those keys, `npm run dev` just prints each submission to the terminal; a production build returns an
error to the visitor instead of silently dropping messages.

## Images

Optimised copies of the photos in `images/` live in `public/images/`. The original `images/` folder is not
used by the app and can be moved out of the repo.
