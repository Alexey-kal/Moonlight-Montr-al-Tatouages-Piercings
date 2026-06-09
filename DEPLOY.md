# Push Moonlight Montréal to GitHub + Vercel

## Files to commit (everything needed — ~16 MB total)

```
index.html
vercel.json
.gitignore
README.md
DEPLOY.md
package.json
package-lock.json
scripts/optimize-assets.mjs
assets/images/lina-owner.jpg
assets/images/rani-flower-back.jpg
assets/images/rani-flower-neck.jpg
assets/images/sasha-at-work.jpg
assets/images/sasha-portraits.jpg
assets/images/sasha-virgin-mary.jpg
assets/videos/hero.mp4
assets/videos/lina-work.mp4
assets/videos/sasha-beard.mp4
```

**Do NOT commit** (gitignored): original videos, the 26 MB 4K file, `node_modules/`, unused `unnamed*` files.

---

## Step 1 — Create GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it e.g. `moonlight-montreal`
3. Create repository (empty, no README)

---

## Step 2 — Push from your PC

Open PowerShell in this folder:

```powershell
cd "c:\Users\14387\OneDrive\Documents\viral-lead\viral lead website\Moonlight Montréal Tatouages & Piercings"

git init
git add index.html vercel.json .gitignore README.md DEPLOY.md package.json package-lock.json scripts/
git add assets/images/ assets/videos/
git commit -m "Moonlight Montréal — site premium tatouages & piercings"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moonlight-montreal.git
git push -u origin main
```

Replace `YOUR_USERNAME` and repo name with yours.

---

## Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Other** (static site)
4. Root directory: `.` (default)
5. Build command: leave **empty**
6. Output directory: `.` (default)
7. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

---

## Optional — Re-optimize media locally

If you replace photos/videos, keep originals in this folder and run:

```bash
npm install
npm run optimize
```

Then commit only updated files under `assets/`.
