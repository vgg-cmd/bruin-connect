# Bruin Connect

**UCLA Alumni Network Finder** — An interactive chatbot-style survey that matches new graduates with personalized alumni networks, programs, and resources from [alumni.ucla.edu](https://alumni.ucla.edu).

Built to align with the [UCLA Alum Brand Guidelines (December 2024)](https://alumni.ucla.edu).

---

## What it does

Bruin Connect walks new graduates through a short conversational flow, collecting:

1. **Name** and **graduation year**
2. **Degree type**
3. **Identity affiliations** (16 options — Black Alumni Association, Lambda, First Gen, Transfer, VetNet, etc.)
4. **Location** (24 regional networks)
5. **Interests** (career, mentorship, sports, arts, travel, etc.)
6. **Career stage**

Then it generates a personalized results page with direct links to the relevant UCLA Alumni pages. Users can **download their results as a PDF** for reference.

---

## Tech stack

- **React 18** — single-file component, no external UI libraries
- **Vite** — fast dev server and build tool
- **Zero dependencies** beyond React — no Tailwind, no component libraries

---

## Quick start

```bash
# 1. Clone the repo
git clone https://github.com/your-org/bruin-connect.git
cd bruin-connect

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder. This is a static site — deploy anywhere.

---

## Deploy options

### Vercel (recommended — free)
1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repo
3. Framework preset: **Vite**
4. Click deploy — done

### Netlify
1. Push repo to GitHub
2. Go to [netlify.com](https://netlify.com), import the repo
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Install the deploy plugin:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json` scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Add `base` to `vite.config.js`:
   ```js
   base: '/bruin-connect/',
   ```
4. Run:
   ```bash
   npm run build && npm run deploy
   ```

### Self-hosted / embed
Run `npm run build`, then serve the `dist/` folder from any static file server (Nginx, Apache, S3, etc.). To embed in an existing page, use an iframe:
```html
<iframe src="https://your-domain.com/bruin-connect/" width="640" height="100%" style="border:none;"></iframe>
```

---

## Project structure

```
bruin-connect/
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── .gitignore
├── public/
│   └── favicon.svg       # UCLA Blue bear favicon
└── src/
    ├── main.jsx          # React mount point
    └── App.jsx           # Full chatbot component (all logic here)
```

Everything lives in `src/App.jsx` — the recommendation engine, UI components, brand constants, and PDF download function are all in one file for simplicity.

---

## Customization

### Adding or editing networks

All data lives at the top of `src/App.jsx`. To add a new identity network, for example:

```jsx
// In the IDENTITY_OPTIONS array:
{ id: "your_id", label: "Your Network Name" },

// In the getRecommendations() function, IN object:
your_id: {
  name: "Your Network Name",
  url: "https://alumni.ucla.edu/events-calendar/category/your-network",
  desc: "Description of this network.",
  tag: "identity network",
  icon: "🔗"
},
```

### Brand colors

All colors are defined in the `COLORS` object at the top of `App.jsx`, pulled directly from the UCLA Alum Brand Guide (p.28–29):

```jsx
const COLORS = {
  uclaBlue: "#2774AE",
  uclaGold: "#FFD100",
  darkestBlue: "#003B5C",
  // ...
};
```

### Typography

The app uses **Inter** (Google Fonts) as the brand-approved web alternative to Antique Legacy. To swap fonts, update the `@import` in the `<style>` block and the `fontFamily` declarations.

---

## Brand compliance

This project follows the UCLA Alum Brand Guidelines (December 2024):

- **Colors**: UCLA Blue (#2774AE) primary, UCLA Gold (#FFD100) accent, full secondary palette
- **Typography**: Inter (approved Google Fonts alternative), left-aligned text
- **Tone**: Confident and informed, open and supportive, culturally relevant
- **Logo**: CSS recreation of the boxed UCLA | alum mark
- **Contrast**: WCAG 2.1 AA compliant — black on white/gold, white on blue/dark

---

## License

Internal use — UCLA Alumni Association.
