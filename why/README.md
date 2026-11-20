# Why Siyai

Scroll-story manifesto and waitlist page for Siyai: cinematic films of your life, to keep or to gift.

A plain static site: `index.html`, `assets/` (videos, images, fonts), no build step.

## Deploy on Vercel

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project → Import** this repository.
3. Framework preset: **Other**. Leave build command and output directory empty. Click **Deploy**.
4. Optional: **Settings → Domains** to add `why.siyai.in` (or your domain) and follow the DNS instructions.

Every push to `main` redeploys automatically.

## Connect the waitlist (Google Sheets)

Until this is done the form runs in preview mode and does not save emails.

1. Create a Google Sheet, then **Extensions → Apps Script**.
2. Paste the contents of `waitlist/google-apps-script.gs`, save.
3. **Deploy → New deployment → Web app**. Execute as **Me**, access **Anyone**. Authorise, copy the web-app URL.
4. In `index.html`, set `const WAITLIST_URL = "https://script.google.com/macros/s/…/exec";`
5. Commit and push. Signups now appear in the **Waitlist** tab (duplicates are skipped).

## Share preview

`og.jpg` is the link preview image. Some apps (WhatsApp, LinkedIn) need a full URL: once you know the live domain, change
`<meta property="og:image" content="/og.jpg">` to `content="https://your-domain/og.jpg"`.

## Editing

- Copy lives directly in `index.html` (search for the line you want to change).
- Subtitles for the voices section: the `SUBS` array in the script.
- Sounds are generated in the browser with the Web Audio API; there are no audio files.
