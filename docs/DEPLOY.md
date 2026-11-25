# Deploying the board proposal

The site is a **confidential board proposal** (decision D7). It ships with
`<meta name="robots" content="noindex, nofollow">`, but that only asks search engines not
to index it. Anyone with the link can still open it. **Put password protection in front of
every deployment.**

## Build

```bash
pnpm install
pnpm check          # typecheck, orphan check, data integrity, production build
pnpm test           # unit tests (finance model, data totals, charts)
pnpm e2e            # Playwright smoke, accessibility and prototype tests
pnpm board-pack     # dist/Nyota-FM-Board-Pack.pdf (A4, ≤ 30 pages)
```

The output in `dist/` is static: any static host works.

## Configuration (build-time)

Copy `.env.example` to `.env.local` and fill in what you have. Empty values fall back to the
defaults in `src/config.ts` or to an honest "pending" state in the UI.

| Variable | Purpose |
|---|---|
| `VITE_STREAM_URL_LOW` / `VITE_STREAM_URL_HIGH` | Live stream mounts. Empty = "Stream link pending", play disabled |
| `VITE_SALES_EMAIL`, `VITE_SALES_WHATSAPP` | Override the sales contacts in `src/config.ts` |
| `VITE_INQUIRY_ENDPOINT` | Optional form service; success is shown only when it confirms receipt |
| `VITE_SITE_URL` | Public URL, no trailing slash. Makes `og:image` absolute and adds a canonical link so WhatsApp previews work |

## Password protection (pick one)

- **Vercel:** Project → Settings → Deployment Protection → enable *Password Protection*
  (or Vercel Authentication for named viewers). Apply it to Production as well as previews.
- **Netlify:** Site configuration → Access & security → *Password protection* (site-wide password).
- **Cloudflare Pages:** put the project behind *Cloudflare Access* with an email allow-list
  for board members.
- **Any Nginx/Apache host:** HTTP Basic Auth on the whole site (`auth_basic` /
  `.htpasswd`), served over HTTPS only.

Share the password separately from the link (for example, by phone), and rotate it after the
board meeting.

## Link previews

WhatsApp and email previews use `public/og/cover-1200x630.jpg` (60 KB). Set `VITE_SITE_URL`
so the image URL is absolute; most crawlers ignore relative `og:image` paths. Note that a
password-protected site cannot show previews to people who are not signed in; this is the
expected trade-off for a confidential document.
