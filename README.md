# PhilipG — Wizard of the Islands

A custom learning RPG built for Philip (1st grade) and Owen (4th grade). Prodigy-style turn-based magic battles with grade-appropriate Math, Reading, Spelling, and Grammar questions.

## What's inside

- **4 themed islands** plus a final boss arena:
  - Math Mountain — addition, subtraction, multiplication, fractions
  - Reading Reef — vocabulary, comprehension, context clues
  - Spelling Swamp — sight words, homophones, suffixes
  - Grammar Grove — parts of speech, tenses, punctuation
  - Dark Citadel — Final boss: Dark Philip (unlocks after all islands cleared)
- **Two player profiles**, each with their own saved progress (localStorage)
- **Grade-aware questions** — Philip gets 1st-grade questions, Owen gets 4th-grade
- **7 unlockable spells** earned by clearing islands
- **Synthesized sound effects** (Web Audio API — no audio files to load)
- **PWA-installable** — add to Chromebook/tablet home screen
- **Pure HTML/CSS/JS** — no build step, no framework, no dependencies

## Project structure

```
philip-g/
├── index.html           # Entry point
├── manifest.json        # PWA manifest
├── css/
│   └── styles.css
├── js/
│   ├── storage.js       # localStorage save system (versioned)
│   ├── audio.js         # Web Audio synthesized SFX
│   ├── characters.js    # All SVG character & background sprites
│   ├── questions.js     # Question bank (edit freely)
│   ├── spells.js        # Spell definitions
│   ├── islands.js       # Island & enemy definitions
│   ├── battle.js        # Turn-based battle engine
│   └── game.js          # Main controller, screens, navigation
├── assets/
│   └── favicon.svg
├── Photos/              # ⛔ gitignored — never commit kids' real photos
├── .gitignore
└── README.md
```

## Run locally

Open `index.html` directly in a browser, or serve it with any static server:

```bash
# Python (built into Chromebooks)
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Editing questions

`js/questions.js` is plain JSON-shaped data — open it in any text editor. Each question is:

```js
{
  text: "What is 2 + 3?",
  choices: ["4", "5", "6", "7"],
  answer: 1   // index into choices (0-based)
}
```

Add or remove questions freely; the game picks randomly from the pool each battle.

## Deploying to philipg.creativecorerail.com via GitHub + Cloudflare Pages

### 1. Push to GitHub (Kpedeaux/philipg)

Open PowerShell or Command Prompt and run:

```bash
cd C:\Users\pedea\CoreRail\Philip-g
git init
git add .
git commit -m "Initial PhilipG game"
git branch -M main
git remote add origin https://github.com/Kpedeaux/philipg.git
git push -u origin main
```

If git asks for credentials, use your GitHub username + a **Personal Access Token** (Settings → Developer settings → Personal access tokens → Generate new → check the `repo` scope).

> ⚠️ The `Photos/` folder is gitignored. Do NOT publish your kids' real photos to a public repo.

### 2. Create a Cloudflare Pages project

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Select the `philipg` repo
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`
   - **Root directory:** `/`
4. Click **Save and Deploy**. Cloudflare gives you a `philipg-<hash>.pages.dev` URL.

### 3. Map your custom domain

1. In your Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `philipg.creativecorerail.com`
3. Cloudflare will either:
   - Auto-create the CNAME if `creativecorerail.com` is on Cloudflare, OR
   - Show you the CNAME target to add at your DNS provider:
     - **Type:** `CNAME`
     - **Name:** `philipg`
     - **Target:** `philipg-<hash>.pages.dev`
     - **Proxy:** ✅ Proxied (orange cloud) — gives you free SSL + CDN
4. Wait 1–5 min for DNS propagation. Done.

### 4. Future updates

Just push to `main` — Cloudflare auto-redeploys in ~20 seconds.

```bash
git add . && git commit -m "Add more questions" && git push
```

## Browser support

Works on every modern browser: Chrome (Chromebook), Safari (iPad), Firefox, Edge. Designed for touch + mouse. Requires JS enabled.

## Privacy

No analytics. No tracking. No network requests beyond loading the page assets. All save data lives in the browser's localStorage on each device.

## Resetting progress

The player select screen has a **Reset Progress** button. Or open DevTools → Application → Local Storage and remove `philipg.save.v1.*` keys.

## License

Built for personal family use. Do whatever you want with it.
