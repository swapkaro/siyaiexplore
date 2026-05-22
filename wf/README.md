# wf1-wf2 · SiyAI Homepage explorations

Two type-system explorations of the SiyAI pre-login homepage. Same architecture, different display fonts.

- **`siyaiwf1.html`** — Fraunces display + Geist UI (the original brand-bible direction)
- **`siyaiwf2.html`** — Inter throughout (alternative direction)
- **`photos.html`** — admin page to drag-and-drop replace any photo on the homepage

## Running locally

Open `siyaiwf1.html` or `siyaiwf2.html` directly in a modern browser. Both versions share the same JSX/CSS/JS source files. No build step required — Babel transpiles in-browser.

## Photos

Stock placeholders (Picsum) load by default. To use real photos:

1. Open `photos.html` in your browser.
2. Drag/drop JPGs onto any slot. They save to your browser's localStorage and appear instantly on both homepages.
3. To bake photos into the repo permanently, click **Download all as ZIP** in `photos.html`, extract the resulting `photos/` folder at the repo root, and commit it. The site then loads from `photos/{key}.jpg` for everyone.

## Files

```
siyaiwf1.html         · Fraunces variant
siyaiwf2.html         · Inter variant
photos.html           · drag-drop photo admin
tokens.css            · design tokens (Fraunces)
tokens-inter.css      · design tokens (Inter)
*.jsx                 · React + Babel components
photos.js             · photo registry + localStorage layer
```

## Status

v3 — gifting storefront. Mobile + desktop unified. Phase 1 (gifting) commerce-led; Phase 2 (Legacy Vault) compressed to a footer notify pill.
