# Bruin Connect

UCLA Alumni Network Finder — a single-file web app. No build step required.

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `bruin-connect`)
2. Upload `index.html` to the repo (drag and drop on GitHub works)
3. Go to **Settings → Pages → Source → Deploy from a branch → main → / (root)**
4. Wait ~1 minute, then visit `https://YOUR-USERNAME.github.io/bruin-connect/`

That's it. One file, no build, no dependencies.

## Run locally

Just open `index.html` in a browser. Or use a local server:

```bash
# Python
python3 -m http.server 3000

# Node
npx serve .
```

## How it works

Everything is in `index.html` — React loads from a CDN, Babel transpiles the JSX in-browser. The chatbot walks new grads through identity, location, interests, and career questions, then generates personalized results linking to alumni.ucla.edu.

## Customization

All data (networks, locations, interests, URLs) is in the `<script>` tag inside `index.html`. Search for `IDENTITY_OPTIONS`, `LOCATION_OPTIONS`, etc. to edit.
