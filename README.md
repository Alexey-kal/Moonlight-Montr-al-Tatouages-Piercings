# Moonlight Montréal — Tatouages & Piercings

Single-page site for Moonlight Montréal, deployable on **Vercel** and **GitHub** (total repo ~16 MB, all files under 25 MB).

## Deploy on Vercel

1. Push this folder to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Vercel serves the site as a static project (no build step — optimized `assets/` are committed)

## Local preview

```bash
npm install
npm run optimize   # re-compress from local originals into assets/
npx serve .
```

If you replace photos or videos locally, keep the original files in this folder and run `npm run optimize` again before pushing.

## Assets

| File | Use |
|------|-----|
| `assets/videos/hero.mp4` | Hero background |
| `assets/videos/lina-work.mp4` | Lina tattoo video |
| `assets/videos/sasha-beard.mp4` | Sasha gallery video |
| `assets/images/*` | Artist & gallery photos |

Original large source files are gitignored. Re-run `npm run optimize` if you replace sources locally.
