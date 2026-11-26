# DSC Drugs — website

A premium, responsive B2B website for DSC Drugs, a pharmaceutical trading company.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

```bash
npm install
npm run dev      # http://localhost:3100
npm run build    # production build
npm start        # serve the production build on :3100
npm run typecheck
```

---

## Where content lives

| What | File |
| --- | --- |
| Company name, contact details, WhatsApp number, navigation | [`lib/site.ts`](lib/site.ts) |
| Product categories and catalogue records | [`lib/products.ts`](lib/products.ts) |
| Market hubs and route lines for the globe | [`lib/markets.ts`](lib/markets.ts) |
| Management profiles | [`lib/leadership.ts`](lib/leadership.ts) |
| Enquiry validation and delivery | [`lib/enquiry.ts`](lib/enquiry.ts) |
| Design tokens, type scale, motion | [`app/globals.css`](app/globals.css) |

Nothing in the site invents company facts. Anything unverified renders as a clearly
labelled placeholder ("Placeholder record", "Profile pending", "Awaiting verification"),
and the copy says so out loud.

### Before launch

1. **Contact details** — replace the draft values in `lib/site.ts` (`contact`, `social`)
   and delete the `verified: false` flags.
2. **WhatsApp** — set `whatsapp.number` to the full international number without `+`,
   spaces or dashes (e.g. `"919876543210"`). Until it is set, the floating button offers
   email instead and explains why.
3. **Catalogue** — replace the eight `Portfolio Entry NN` records with real products and
   set `placeholder: false` on each verified record. Fields left `null` render as
   "To be confirmed" rather than invented data.
4. **Markets** — replace the six illustrative hubs with verified locations, adjust
   `routes`, then drop `illustrative: true`.
5. **Management** — add names, designations and biographies to `lib/leadership.ts`.
6. **Domain** — set `NEXT_PUBLIC_SITE_URL` in the deployment environment; it feeds
   canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`.

---

## Enquiry delivery

`POST /api/enquiry` validates, rate-limits (5 per 15 minutes per IP) and honeypot-checks
every submission. Choose **one** delivery method in production:

```bash
# Option A — transactional email through Resend
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=enquiries@dscdrugs.com
ENQUIRY_FROM_EMAIL="DSC Drugs Website <website@dscdrugs.com>"   # optional

# Option B — forward JSON to your own endpoint, CRM or automation
ENQUIRY_WEBHOOK_URL=https://...
```

Without either variable the route still validates the form and logs the enquiry
server-side in development, and tells the visitor plainly that nothing was sent — it
never pretends an email went out. If delivery fails, the visitor is asked to email
directly and the error is logged.

---

## Structure

The site is **one continuous page**. Every main section lives on `/` and the
navigation scrolls to it instead of loading another document:

```
/            hero → #about → #products (#catalogue, #enquiry-list)
             → #global-presence → #management → #quality → #contact (#enquiry-form)
```

```
app/
  page.tsx                 The whole site, section by section (see anchors above)
  about/, products/, global-presence/, management/, quality/, contact/
                           Redirect to the matching section, so old links still work
  products/[slug]/         Individual product record, linked from the catalogue
  privacy/, terms/         Legal drafts
  api/enquiry/             Enquiry endpoint
  sitemap.ts, robots.ts    SEO routes
  opengraph-image.tsx      Generated social card
components/                Layout, globe canvas, catalogue, artwork, form, enquiry dock
lib/                       Editable data and enquiry logic
```

To add a section, render it in `app/page.tsx` with an `id`, then point the
matching item in `primaryNav` (`lib/site.ts`) at `/#that-id`.

## Notes

- The 3D globe is a canvas renderer (no WebGL dependency) built from a generated
  low-resolution land mask in `lib/geo/land-dots.json`. Regenerate it with
  `npm run geo`. It is draggable, keyboard/tap friendly and static under
  `prefers-reduced-motion`.
- The enquiry list is shared through a React context and persisted to `localStorage`,
  so a buyer can assemble several products and send one combined enquiry.
- Scroll reveals degrade gracefully: content is fully visible without JavaScript or
  when reduced motion is requested.
