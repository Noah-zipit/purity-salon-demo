# Purity Massage Salon — booking demo

A client pitch demo for Purity Massage Salon (F-11 Markaz, Islamabad): a
warm, spa-styled one-page site that lets a customer pick a service, choose a
day and time, and book straight into the salon's WhatsApp — no backend, no
accounts.

## What it does

- **Service menu** — three signature rituals (Full-Body, Aroma, Facial & Skin)
  with real photography, plus the extended treatment list.
- **Booking flow** — pick a service, then a day (next 7 days, "Today" first)
  and a time slot; the confirmation opens a pre-filled WhatsApp chat with the
  salon (`wa.me/923360177734`) carrying the full booking details.
- **Silk hero background** — an animated WebGL silk shader, warm gold on a
  dark base, zero image assets for the hero.
- **SEO + social** — meta description, Open Graph and Twitter card tags;
  cover image points at a real asset in `public/`.

## Run it

```sh
npm install
npm run dev     # dev server
npm run build   # production build to dist/
npm run lint    # oxlint
```

## Notes

- Booking is WhatsApp-first: everything the salon needs arrives as a chat
  message. No database, no payment flow — this is the pitch demo.
- `private: true`, not published to npm.
